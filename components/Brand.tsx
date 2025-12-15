"use client";

export default function Brand() {
  return (
    <div className="fixed inset-x-0 top-0 z-50 pointer-events-none">
      <div className="relative w-full px-6 sm:px-10 pt-6 sm:pt-8">
        {/* 
          scale strategy:
          - base is ~2× previous
          - uses clamp so it shrinks *less aggressively* on small screens
        */}
        <div
          className="
            font-sans font-semibold text-white tracking-[-0.04em] leading-none
            text-[clamp(64px,9vw,120px)]
          "
        >
          <div className="absolute left-6 sm:left-10 top-6 sm:top-8">
            Isaac
          </div>
          <div className="absolute right-6 sm:right-10 top-6 sm:top-8">
            Seiler
          </div>
        </div>
      </div>
    </div>
  );
}
