export function mmToCm(value: number): number {
  return round(value / 10);
}

export function mmToInch(value: number): number {
  return round(value / 25.4);
}

export function cmToMm(value: number): number {
  return Math.round(value * 10);
}

export function inchToMm(value: number): number {
  return Math.round(value * 25.4);
}

function round(value: number, precision = 1): number {
  const multiplier = Math.pow(10, precision);
  return Math.round(value * multiplier) / multiplier;
}
