// components/Brand.tsx — DROP-IN REPLACEMENT
"use client";

import BrandMark from "./BrandMark";

// resting-state only: no boot overlay, no fill animation, no sidebar controls
// matches the reference feel by using the same scale and top-left transform origin
const LOGO_SCALE = 1.5;

export default function Brand() {
  return (
    <div className="fixed inset-x-0 top-0 z-50 pointer-events-none">
      <div className="flex justify-center pt-8">
        <div
          className="pointer-events-none"
          style={{ transform: `scale(${LOGO_SCALE})`, transformOrigin: "top center" }}
        >
          <BrandMark />
        </div>
      </div>
    </div>
  );
}
