// components/Brand.tsx — DROP-IN REPLACEMENT
"use client";

import BrandMark from "./BrandMark";

export default function Brand() {
  return (
    <div className="fixed top-8 left-1/2 -translate-x-1/2 z-50 select-none">
      <div className="text-3xl sm:text-4xl leading-none">
        <BrandMark />
      </div>
    </div>
  );
}
