"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [marketingOptIn, setMarketingOptIn] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const response = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-csrf-token": document.cookie
          .split(";")
          .map((cookie) => cookie.trim())
          .find((cookie) => cookie.startsWith("csrfToken="))?.split("=")[1] ?? ""
      },
      body: JSON.stringify({ email, password, name, marketingOptIn })
    });

    if (response.ok) {
      router.push("/login?redirect=/account");
    } else {
      const data = await response.json();
      setError(data.error ?? "회원가입에 실패했습니다.");
    }

    setLoading(false);
  }

  return (
    <div className="mx-auto flex w-full max-w-md flex-col gap-6 px-6 py-16">
      <h1 className="text-3xl font-semibold text-slate-900">회원가입</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block text-sm text-slate-600">
          이름
          <input
            className="mt-2 w-full rounded-full border border-slate-200 px-4 py-2 text-sm"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="홍길동"
          />
        </label>
        <label className="block text-sm text-slate-600">
          이메일
          <input
            className="mt-2 w-full rounded-full border border-slate-200 px-4 py-2 text-sm"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
            autoComplete="email"
          />
        </label>
        <label className="block text-sm text-slate-600">
          비밀번호
          <input
            className="mt-2 w-full rounded-full border border-slate-200 px-4 py-2 text-sm"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
            autoComplete="new-password"
            minLength={8}
            placeholder="영문, 숫자, 특수문자 조합"
          />
        </label>
        <label className="flex items-center gap-2 text-xs text-slate-500">
          <input
            type="checkbox"
            checked={marketingOptIn}
            onChange={(event) => setMarketingOptIn(event.target.checked)}
          />
          마케팅 정보 수신에 동의합니다.
        </label>
        {error && <p className="text-sm text-red-500">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-400"
        >
          {loading ? "가입 중..." : "가입하기"}
        </button>
      </form>
      <p className="text-xs text-slate-500">
        이미 계정이 있나요? <a href="/login" className="underline">로그인</a>
      </p>
    </div>
  );
}
