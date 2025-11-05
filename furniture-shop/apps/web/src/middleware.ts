import { randomBytes } from "crypto";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PROTECTED_PATHS = [/^\/account(\/.*)?$/];
const AUTH_SESSION_COOKIE = "sessionId";
const CSRF_COOKIE = "csrfToken";
const CSRF_HEADER = "x-csrf-token";
const MUTATION_METHODS = ["POST", "PUT", "PATCH", "DELETE"];
const RATE_LIMIT_DURATION_MS = 60 * 1000;
const RATE_LIMIT_MAX = 20;
const ATTEMPT_CACHE = new Map<string, { count: number; resetAt: number }>();

function isProtectedPath(pathname: string) {
  return PROTECTED_PATHS.some((regex) => regex.test(pathname));
}

function checkRateLimit(identifier: string) {
  const now = Date.now();
  const record = ATTEMPT_CACHE.get(identifier);

  if (!record || record.resetAt < now) {
    ATTEMPT_CACHE.set(identifier, { count: 1, resetAt: now + RATE_LIMIT_DURATION_MS });
    return { allowed: true, remaining: RATE_LIMIT_MAX - 1 };
  }

  if (record.count >= RATE_LIMIT_MAX) {
    return { allowed: false, remaining: 0, retryAfter: record.resetAt - now };
  }

  record.count += 1;
  ATTEMPT_CACHE.set(identifier, record);
  return { allowed: true, remaining: RATE_LIMIT_MAX - record.count };
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (request.method === "POST" && pathname.startsWith("/api/auth/")) {
    const identifier = request.ip ?? request.headers.get("x-forwarded-for") ?? request.headers.get("user-agent") ?? "unknown";
    const rate = checkRateLimit(`auth:${identifier}`);
    if (!rate.allowed) {
      return NextResponse.json({ error: "요청이 너무 많습니다. 잠시 후 다시 시도해 주세요." }, { status: 429 });
    }
  }

  if (MUTATION_METHODS.includes(request.method) && pathname.startsWith("/api")) {
    const origin = request.headers.get("origin");
    if (origin && origin !== request.nextUrl.origin) {
      return NextResponse.json({ error: "유효하지 않은 요청입니다." }, { status: 403 });
    }

    const csrfCookie = request.cookies.get(CSRF_COOKIE)?.value;
    const csrfHeader = request.headers.get(CSRF_HEADER);
    if (!csrfCookie || !csrfHeader || csrfCookie !== csrfHeader) {
      return NextResponse.json({ error: "CSRF 토큰이 유효하지 않습니다." }, { status: 403 });
    }
  }

  const sessionCookie = request.cookies.get(AUTH_SESSION_COOKIE)?.value;
  const response = NextResponse.next({ request: { headers: request.headers } });
  const csrfToken = request.cookies.get(CSRF_COOKIE)?.value ?? randomBytes(32).toString("hex");

  response.cookies.set({
    name: CSRF_COOKIE,
    value: csrfToken,
    httpOnly: false,
    sameSite: "lax",
    secure: process.env.NODE_ENV !== "development",
    path: "/"
  });

  response.headers.set("Strict-Transport-Security", "max-age=63072000; includeSubDomains; preload");
  response.headers.set("X-Frame-Options", "SAMEORIGIN");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");

  if (isProtectedPath(pathname) && !sessionCookie) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return response;
}

export const config = {
  matcher: ["/api/auth/:path*", "/account/:path*"],
};
