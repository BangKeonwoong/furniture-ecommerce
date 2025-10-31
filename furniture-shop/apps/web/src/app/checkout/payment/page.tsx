"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CheckoutSummary } from "@/components/checkout-summary";
import { useIamport } from "@/hooks/use-iamport";
import type { PgApprovalResult, PgPaymentResult } from "@/lib/payments/types";
import { useCartStore } from "@/lib/store/cart-store";
import { useCheckoutStore } from "@/lib/store/checkout-store";

export default function CheckoutPaymentPage() {
  const items = useCartStore((state) => state.items);
  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const currency = items[0]?.currency ?? "KRW";

  const router = useRouter();
  const { setPaymentSession, paymentSession: storedSession, setPaymentApproval, paymentApproval: storedApproval } =
    useCheckoutStore();
  const [paymentSession, setPaymentSessionState] = useState<PgPaymentResult | null>(storedSession ?? null);
  const [paymentApproval, setPaymentApprovalState] = useState<PgApprovalResult | null>(storedApproval ?? null);
  const [orderId] = useState(() => storedSession?.orderId ?? `temp-${Date.now()}`);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [approving, setApproving] = useState(false);
  const [approvalError, setApprovalError] = useState<string | null>(null);
  const payloadProvider =
    (paymentSession?.payload as { provider?: string } | undefined)?.provider ?? null;
  const iamportClientKey =
    (paymentSession?.payload as { jsClientKey?: string } | undefined)?.jsClientKey ?? null;
  const { requestPayment: requestIamportPayment } = useIamport(iamportClientKey ?? undefined);
  const isMockSession = paymentSession?.status === "mock";
  const canUseIamport = !isMockSession && payloadProvider === "iamport" && Boolean(iamportClientKey);

  useEffect(() => {
    async function preparePayment() {
      if (subtotal <= 0) {
        setPaymentSessionState(null);
        setPaymentSession(null);
        setPaymentApprovalState(null);
        setPaymentApproval(null);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const origin = typeof window === "undefined" ? "" : window.location.origin;
        const response = await fetch("/api/checkout/create-payment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            amount: Math.round(subtotal),
            currency,
            orderId,
            buyer: {
              email: "guest@example.com",
              name: "비회원"
            },
            returnUrl: `${origin}/checkout/success/${orderId}`,
            cancelUrl: `${origin}/checkout/payment`
          })
        });

        const data = await response.json();

        if (!response.ok || data?.error) {
          throw new Error(data?.error ?? "pg_error");
        }

        setPaymentSessionState(data as PgPaymentResult);
        setPaymentSession(data as PgPaymentResult);
        setPaymentApprovalState(null);
        setPaymentApproval(null);
      } catch (err) {
        console.error("Failed to prepare PG payment", err);
        setError("국내 PG 결제 세션을 준비하는 중 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.");
      } finally {
        setLoading(false);
      }
    }

    preparePayment();
  }, [subtotal, currency, orderId, setPaymentSession, setPaymentApproval]);

  const handleMockApprove = async () => {
    if (!paymentSession) return;

    try {
      setApproving(true);
      setApprovalError(null);

      const response = await fetch("/api/checkout/approve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId, paymentRequestId: paymentSession.paymentRequestId })
      });

      const data = await response.json();

      if (!response.ok || data?.error) {
        throw new Error(data?.error ?? "approve_error");
      }

      setPaymentApprovalState(data as PgApprovalResult);
      setPaymentApproval(data as PgApprovalResult);
      router.push(`/checkout/success/${orderId}`);
    } catch (err) {
      console.error("Failed to approve PG payment", err);
      setApprovalError("결제 승인 처리 중 오류가 발생했습니다.");
    } finally {
      setApproving(false);
    }
  };

  const handleIamportPayment = async () => {
    if (!paymentSession || !iamportClientKey) {
      setApprovalError("아임포트 클라이언트 키가 설정되지 않았습니다.");
      return;
    }

    try {
      setApproving(true);
      setApprovalError(null);

      const buyerInfo =
        (paymentSession.payload as { buyer?: { name?: string; email?: string; phone?: string } } | undefined)
          ?.buyer ?? {};

      const response = await requestIamportPayment({
        merchantUid: paymentSession.paymentRequestId,
        amount: paymentSession.amount,
        currency: paymentSession.currency,
        payloadName: `주문 결제 (${paymentSession.orderId ?? paymentSession.paymentRequestId})`,
        buyerName: buyerInfo.name,
        buyerEmail: buyerInfo.email,
        buyerTel: buyerInfo.phone,
        redirectUrl: paymentSession.redirectUrl ?? undefined
      });

      if (!response.success || !response.imp_uid) {
        if (response.imp_uid) {
          await fetch("/api/checkout/cancel", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              orderId,
              paymentRequestId: paymentSession.paymentRequestId,
              pgTransactionId: response.imp_uid,
              reason: response.error_msg ?? "user_cancel"
            })
          });
        }

        setApprovalError(response.error_msg ?? "결제가 취소되었습니다.");
        return;
      }

      const approveResponse = await fetch("/api/checkout/approve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId,
          paymentRequestId: paymentSession.paymentRequestId,
          pgTransactionId: response.imp_uid,
          amount: paymentSession.amount,
          currency: paymentSession.currency
        })
      });

      const approveData = await approveResponse.json();

      if (!approveResponse.ok || approveData?.error) {
        throw new Error(approveData?.error ?? "approve_error");
      }

      setPaymentApprovalState(approveData as PgApprovalResult);
      setPaymentApproval(approveData as PgApprovalResult);
      router.push(`/checkout/success/${orderId}`);
    } catch (err) {
      console.error("Iamport payment failed", err);
      setApprovalError("아임포트 결제 처리 중 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.");
    } finally {
      setApproving(false);
    }
  };

  return (
    <div className="grid gap-6 sm:gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
      <div className="space-y-6 rounded-3xl border border-slate-200 bg-white p-4 sm:p-6">
        <div>
          <p className="text-sm font-semibold text-slate-900">결제 수단</p>
          <div className="mt-4 space-y-3 text-sm text-slate-600">
            <div className="rounded-3xl border border-dashed border-slate-200 p-6 text-center text-xs text-slate-500">
              {loading ? (
                <span className="animate-pulse">국내 PG 결제 위젯을 초기화하는 중입니다...</span>
              ) : paymentSession ? (
                <div className="space-y-2">
                  <p>
                    PG: <span className="font-medium uppercase">{paymentSession.provider}</span>{" "}
                    ({paymentSession.status === "mock" ? "모의 응답" : "결제 준비 완료"})
                  </p>
                  <p>
                    요청 ID: <code className="break-all text-slate-400">{paymentSession.paymentRequestId}</code>
                  </p>
                  {paymentSession.redirectUrl && (
                    <p>
                      리디렉션 URL:{" "}
                      <code className="break-all text-slate-400">{paymentSession.redirectUrl}</code>
                    </p>
                  )}
                  {paymentSession.status === "mock" && (
                    <p className="text-[11px] text-slate-400">
                      샌드박스 키를 연결하면 실제 PG 승인 절차로 교체됩니다.
                    </p>
                  )}
                  {payloadProvider === "iamport" && iamportClientKey && (
                    <p className="text-[11px] text-slate-500">
                      아임포트 위젯 초기화 시 <code className="text-slate-400">{iamportClientKey}</code>를
                      `IMP.request_pay`에 전달해 주세요.
                    </p>
                  )}
                  {paymentApproval?.status === "approved" && (
                    <p className="text-[11px] text-emerald-500">결제가 승인되어 주문 완료 화면으로 이동했습니다.</p>
                  )}
                </div>
              ) : (
                <span>장바구니에 상품을 담으면 결제 세션이 생성됩니다.</span>
              )}
            </div>
            {error && <p className="text-xs text-red-500">{error}</p>}
            {approvalError && <p className="text-xs text-red-500">{approvalError}</p>}
            <label className="flex items-center gap-2 text-xs text-slate-500">
              <input type="checkbox" defaultChecked /> 카드 정보를 저장합니다.
            </label>
          </div>
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-900">청구지 주소</p>
          <p className="mt-2 text-xs text-slate-500">배송지와 동일 버튼, 다른 주소 입력 폼이 이곳에 표시됩니다.</p>
        </div>
        {isMockSession ? (
          <button
            type="button"
            onClick={handleMockApprove}
            disabled={approving || !paymentSession}
            className="inline-flex items-center justify-center rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-400"
          >
            {approving ? "모의 승인 중..." : "모의 승인 후 주문 완료하기"}
          </button>
        ) : canUseIamport ? (
          <button
            type="button"
            onClick={handleIamportPayment}
            disabled={approving || !paymentSession}
            className="inline-flex items-center justify-center rounded-full bg-emerald-600 px-5 py-3 text-sm font-semibold text-white hover:bg-emerald-500 disabled:cursor-not-allowed disabled:bg-emerald-300"
          >
            {approving ? "결제 승인 중..." : "아임포트로 결제하기"}
          </button>
        ) : paymentSession?.redirectUrl ? (
          <a
            href={paymentSession.redirectUrl}
            className="inline-flex items-center justify-center rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800"
          >
            주문 완료하기
          </a>
        ) : (
          <div className="rounded-full border border-slate-200 bg-slate-50 px-5 py-3 text-center text-xs text-slate-500">
            PG 위젯 연동 후 결제 완료 버튼이 노출됩니다. (예: 아임포트 `IMP.request_pay` 사용)
          </div>
        )}
        <p className="text-xs text-slate-500">
          실제 결제 완료 시 PG 승인·웹훅 로직을 통해 주문 상태를 업데이트하도록 확장할 예정입니다.
        </p>
      </div>
      <CheckoutSummary />
    </div>
  );
}
