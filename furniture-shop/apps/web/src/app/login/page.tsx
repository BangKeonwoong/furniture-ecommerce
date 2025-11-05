"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("demo@loomlattice.com");
  const [password, setPassword] = useState("Passw0rd!");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const redirect = searchParams?.get("redirect") ?? "/account";

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-csrf-token": document.cookie
          .split(";")
          .map((cookie) => cookie.trim())
          .find((cookie) => cookie.startsWith("csrfToken="))?.split("=")[1] ?? ""
      },
      body: JSON.stringify({ email, password })
    });

    if (response.ok) {
      router.push(redirect);
      router.refresh();
    } else {
      const data = await response.json();
      setError(data.error ?? "로그인에 실패했습니다.");
    }
    setLoading(false);
  }

  return (
    <div className="mx-auto flex w-full max-w-md flex-col gap-6 px-6 py-16">
      <h1 className="text-3xl font-semibold text-slate-900">로그인</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
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
            autoComplete="current-password"
          />
        </label>
        {error && <p className="text-sm text-red-500">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-400"
        >
          {loading ? "로그인 중..." : "로그인"}
        </button>
      </form>
      <p className="text-xs text-slate-500">
        계정이 없나요? <a href="/signup" className="underline">회원가입</a>
      </p>
    </div>
  );
}
