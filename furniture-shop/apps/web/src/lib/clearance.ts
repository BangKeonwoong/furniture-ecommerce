export type PackageDimensions = {
  width: number;
  depth: number;
  height: number;
};

export type ClearanceInput = {
  doorWidth: number;
  doorHeight: number;
  box: PackageDimensions;
};

export function passesClearance({ doorWidth, doorHeight, box }: ClearanceInput): boolean {
  const { width, height } = largestFace(box);
  return width <= doorWidth && height <= doorHeight;
}

export function largestFace(box: PackageDimensions): { width: number; height: number } {
  const orientations: Array<{ width: number; height: number }> = [
    { width: Math.max(box.width, box.height), height: Math.min(box.width, box.height) },
    { width: Math.max(box.width, box.depth), height: Math.min(box.width, box.depth) },
    { width: Math.max(box.depth, box.height), height: Math.min(box.depth, box.height) }
  ];
  return orientations.reduce((largest, current) => {
    const area = current.width * current.height;
    const largestArea = largest.width * largest.height;
    return area > largestArea ? current : largest;
  });
}
