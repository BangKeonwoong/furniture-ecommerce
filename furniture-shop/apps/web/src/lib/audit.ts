export type SecurityEvent =
  | "auth.signup.success"
  | "auth.signup.conflict"
  | "auth.login.success"
  | "auth.login.failure"
  | "auth.logout";

export function logSecurityEvent(event: SecurityEvent, context: Record<string, unknown> = {}) {
  const timestamp = new Date().toISOString();
  console.info(`[Audit] ${timestamp} ${event}`, context);
}
