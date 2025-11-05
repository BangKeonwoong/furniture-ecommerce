import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

export async function POST() {
  try {
    const cookieStore = cookies();
    const sessionId = cookieStore.get("sessionId")?.value;

    if (sessionId) {
      await prisma.session.delete({ where: { id: sessionId } }).catch(() => null);
      cookieStore.delete("sessionId");
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[Logout] Failed", error);
    return NextResponse.json({ error: "로그아웃 처리 중 오류가 발생했습니다." }, { status: 500 });
  }
}
