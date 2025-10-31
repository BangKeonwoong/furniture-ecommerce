"use client";

import Image from "next/image";
import { useState } from "react";

export function ProductGallery({ images }: { images: string[] }) {
  const [current, setCurrent] = useState(0);

  return (
    <div className="space-y-4">
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl bg-slate-100">
        <Image
          src={images[current]}
          alt="Product image"
          fill
          className="object-cover"
          sizes="(min-width: 1024px) 600px, 100vw"
        />
      </div>
      <div className="flex gap-3 overflow-x-auto">
        {images.map((image, index) => (
          <button
            key={image}
            type="button"
            onClick={() => setCurrent(index)}
            className={`relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-2xl border ${
              current === index ? "border-slate-900" : "border-transparent"
            }`}
          >
            <Image src={image} alt="thumbnail" fill className="object-cover" />
            <span className="sr-only">이미지 {index + 1} 보기</span>
          </button>
        ))}
      </div>
    </div>
  );
}
