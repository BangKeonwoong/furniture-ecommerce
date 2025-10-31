import { useCallback, useRef } from "react";

declare global {
  interface Window {
    IMP?: IamportInstance;
  }
}

type IamportInstance = {
  init: (clientKey: string) => void;
  request_pay: (params: Record<string, unknown>, callback: (response: IamportResponse) => void) => void;
};

const IAMPORT_SCRIPT_URL = "https://cdn.iamport.kr/js/iamport.payment-1.2.0.js";

export type IamportRequestParams = {
  payloadName?: string;
  merchantUid: string;
  amount: number;
  currency?: string;
  buyerName?: string;
  buyerEmail?: string;
  buyerTel?: string;
  buyerAddr?: string;
  buyerPostcode?: string;
  redirectUrl?: string;
  payMethod?: string;
};

export type IamportResponse = {
  success: boolean;
  imp_uid?: string;
  merchant_uid?: string;
  error_msg?: string;
  error_code?: string;
  status?: string;
  pg_provider?: string;
};

export function useIamport(clientKey?: string) {
  const loaderRef = useRef<Promise<IamportInstance> | null>(null);

  const loadIamport = useCallback(async () => {
    if (!clientKey) {
      throw new Error("IAMPORT_CLIENT_KEY_MISSING");
    }

    if (typeof window === "undefined") {
      throw new Error("IAMPORT_BROWSER_ONLY");
    }

    if (window.IMP) {
      window.IMP.init(clientKey);
      return window.IMP;
    }

    if (!loaderRef.current) {
      loaderRef.current = new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = IAMPORT_SCRIPT_URL;
        script.async = true;
        script.onload = () => {
          if (window.IMP) {
            window.IMP.init(clientKey);
            resolve(window.IMP);
          } else {
            reject(new Error("IAMPORT_SCRIPT_LOAD_FAILED"));
          }
        };
        script.onerror = () => reject(new Error("IAMPORT_SCRIPT_LOAD_FAILED"));
        document.head.appendChild(script);
      });
    }

    return loaderRef.current;
  }, [clientKey]);

  const requestPayment = useCallback(
    async (params: IamportRequestParams) => {
      const IMP = await loadIamport();

      return new Promise<IamportResponse>((resolve) => {
        IMP.request_pay(
          {
            merchant_uid: params.merchantUid,
            amount: params.amount,
            currency: params.currency ?? "KRW",
            name: params.payloadName ?? "Furniture Shop 결제",
            buyer_name: params.buyerName,
            buyer_email: params.buyerEmail,
            buyer_tel: params.buyerTel,
            buyer_addr: params.buyerAddr,
            buyer_postcode: params.buyerPostcode,
            pay_method: params.payMethod ?? "card",
            m_redirect_url: params.redirectUrl
          },
          (response: IamportResponse) => resolve(response)
        );
      });
    },
    [loadIamport]
  );

  return { requestPayment };
}
