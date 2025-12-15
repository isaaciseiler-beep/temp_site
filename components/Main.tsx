"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Brand from "@/components/Brand";
import Menu from "@/components/Menu";

const EASE_OUT = [0.2, 1, 0.2, 1] as const;

export default function Main() {
  const [bootDone, setBootDone] = useState(false);

  return (
    <main className="min-h-[100svh]">
      <Brand onDone={() => setBootDone(true)} />

      <div className="px-6">
        <div className="mx-auto max-w-xl min-h-[100svh] grid place-items-center">
          <AnimatePresence>
            {bootDone && (
              <motion.div
                key="menu"
                initial={{ opacity: 0, y: 18, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: 12, filter: "blur(8px)" }}
                transition={{ duration: 0.55, ease: EASE_OUT }}
                className="w-full"
              >
                <Menu />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <footer className="fixed bottom-0 left-0 right-0 px-6 pb-6 pointer-events-none">
        <div className="mx-auto max-w-xl text-center text-sm md:text-base text-[#B6FF00] uppercase italic font-art tracking-[0.22em]">
          New site coming soon
        </div>
      </footer>
    </main>
  );
}
