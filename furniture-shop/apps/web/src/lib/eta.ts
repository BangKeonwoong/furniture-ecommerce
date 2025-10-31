type Zone = "A" | "B" | "C";

const transitDays: Record<Zone, number> = {
  A: 2,
  B: 5,
  C: 9
};

type EstimateOptions = {
  leadTimeDays: number;
  zone: Zone;
  schedulingDays?: number;
};

export function estimateEta({ leadTimeDays, zone, schedulingDays = 2 }: EstimateOptions): number {
  return leadTimeDays + (transitDays[zone] ?? 5) + schedulingDays;
}

export function etaRange(totalDays: number): [number, number] {
  const lower = Math.max(totalDays - 2, totalDays - Math.round(totalDays * 0.2));
  const upper = totalDays + 2;
  return [lower, upper];
}
