// components/Brand.tsx — DROP-IN REPLACEMENT
"use client";

export default function Brand() {
  // 4x vs prior (1.5x). anchored split: "Isaac" left, "Seiler" right.
  return (
    <div className="fixed inset-x-0 top-0 z-50 pointer-events-none">
      <div className="relative w-full px-6 sm:px-10 pt-6 sm:pt-8">
        <div className="pointer-events-none text-[44px] sm:text-[64px] md:text-[76px] leading-none font-sans font-semibold tracking-[-0.04em] text-white">
          <div className="absolute left-6 sm:left-10 top-6 sm:top-8">Isaac</div>
          <div className="absolute right-6 sm:right-10 top-6 sm:top-8">Seiler</div>
        </div>
      </div>
    </div>
  );
}
