"use client";

import { useState } from "react";

export default function NewsletterPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-6 py-16">
      <h1 className="text-3xl font-semibold text-slate-900">뉴스레터 구독</h1>
      <p className="text-sm text-slate-600">
        신제품, 프로모션, 공간 스타일링 팁을 격주로 전해드립니다. 구독 신청은 아래 이메일을 통해 접수되며, 추후 자동
        발송 시스템을 도입할 예정입니다.
      </p>
      <form
        className="rounded-3xl border border-slate-200 bg-white p-6 text-sm text-slate-600"
        onSubmit={(event) => {
          event.preventDefault();
          if (!email.trim()) return;
          setSubmitted(true);
        }}
      >
        <label className="text-sm text-slate-600">
          이메일 주소
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
            placeholder="you@example.com"
            className="mt-2 w-full rounded-full border border-slate-200 px-4 py-2 text-sm"
          />
        </label>
        <button
          type="submit"
          className="mt-4 inline-flex items-center justify-center rounded-full bg-slate-900 px-5 py-2 text-sm font-semibold text-white hover:bg-slate-800"
        >
          구독 신청
        </button>
        {submitted && (
          <p className="mt-3 text-xs text-emerald-500">
            감사합니다! 구독 신청이 접수되었습니다. 정식 뉴스레터가 시작되면 가장 먼저 알려 드릴게요.
          </p>
        )}
      </form>
      <p className="text-xs text-slate-400">구독 관련 문의: newsletter@loomlattice.com</p>
    </div>
  );
}
