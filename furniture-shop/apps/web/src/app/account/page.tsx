import { redirect } from "next/navigation";

import { getCurrentUser } from "@/lib/auth";

export default async function AccountPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login?redirect=/account");
  }

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-6 px-6 py-16">
      <h1 className="text-3xl font-semibold text-slate-900">내 계정</h1>
      <div className="rounded-3xl border border-slate-200 bg-white p-6 text-sm text-slate-600">
        <p className="text-slate-500">이메일</p>
        <p className="text-slate-900">{user.email}</p>
        {user.name && (
          <>
            <p className="mt-4 text-slate-500">이름</p>
            <p className="text-slate-900">{user.name}</p>
          </>
        )}
      </div>
      <div className="rounded-3xl border border-slate-200 bg-white p-6 text-sm text-slate-600">
        <p className="text-slate-500">마케팅 정보 수신</p>
        <p className="text-slate-900">{user.marketingOptIn ? "동의" : "미동의"}</p>
      </div>
    </div>
  );
}
