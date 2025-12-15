// components/Main.tsx — DROP-IN REPLACEMENT
"use client";

import Brand from "./Brand";
import Menu from "./Menu";

export default function Main() {
  return (
    <main className="min-h-[100svh]">
      <Brand />

      <div className="px-6">
        <div className="mx-auto max-w-xl min-h-[100svh] grid place-items-center">
          <Menu />
        </div>

        <div className="pb-10 pt-2 text-center">
          <span className="font-art text-[#39ff14] uppercase italic tracking-wide">
            new site coming soon
          </span>
        </div>
      </div>
    </main>
  );
}
