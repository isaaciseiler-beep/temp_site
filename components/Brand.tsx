"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useAnimationControls, useReducedMotion } from "framer-motion";
import BrandMark from "@/components/BrandMark";

type BootPhase = "boot" | "animating" | "done";

const EASE_OUT = [0.2, 1, 0.2, 1] as const;

// big mark on load, then settles to top-center
const LOGO_SCALE = 1.5;

// top offset in rem (final resting position)
const FINAL_TOP_REM = 1.75;

// move duration (ms)
const MOVE_MS = 360;

export default function Brand({ onDone }: { onDone?: () => void }) {
  const reduceMotion = useReducedMotion();
  const [phase, setPhase] = useState<BootPhase>("boot");
  const booting = phase !== "done";

  const rowRef = useRef<HTMLDivElement>(null);
  const [bootPos, setBootPos] = useState<{ x: number; y: number } | null>(null);
  const [finalPos, setFinalPos] = useState<{ x: number; y: number } | null>(null);

  const fillControls = useAnimationControls();

  // prevent scroll during boot
  useEffect(() => {
    if (!booting) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [booting]);

  // compute center + top-center target based on rendered size
  useLayoutEffect(() => {
    const el = rowRef.current;
    if (!el) return;

    const compute = () => {
      const rect = el.getBoundingClientRect();
      const rem =
        typeof window !== "undefined"
          ? parseFloat(getComputedStyle(document.documentElement).fontSize || "16") || 16
          : 16;

      const center = {
        x: Math.round((window.innerWidth - rect.width) / 2),
        y: Math.round((window.innerHeight - rect.height) / 2),
      };

      const topCenter = {
        x: Math.round((window.innerWidth - rect.width) / 2),
        y: Math.round(rem * FINAL_TOP_REM),
      };

      setBootPos(center);
      setFinalPos(topCenter);
    };

    compute();

    const ro = new ResizeObserver(() => compute());
    ro.observe(el);

    const onResize = () => compute();
    window.addEventListener("resize", onResize);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", onResize);
    };
  }, []);

  // start fill (reads as loading)
  useEffect(() => {
    fillControls.start({
      width: "85%",
      transition: { duration: 0.55, ease: EASE_OUT },
    });
  }, [fillControls]);

  // when ready, finish fill then move to top-center
  useEffect(() => {
    let cancelled = false;

    const MIN_BOOT_MS = 220;
    const startedAt = typeof performance !== "undefined" ? performance.now() : Date.now();
    const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

    const loadReady =
      typeof document !== "undefined" && document.readyState === "complete"
        ? Promise.resolve()
        : new Promise<void>((resolve) =>
            window.addEventListener("load", () => resolve(), { once: true })
          );

    const fontsReady =
      typeof document !== "undefined" && (document as any).fonts?.ready
        ? (document as any).fonts.ready.catch(() => undefined)
        : Promise.resolve();

    (async () => {
      try {
        await Promise.all([loadReady, fontsReady]);

        const elapsed =
          (typeof performance !== "undefined" ? performance.now() : Date.now()) - startedAt;

        if (elapsed < MIN_BOOT_MS) await sleep(MIN_BOOT_MS - elapsed);

        await fillControls.start({
          width: "100%",
          transition: { duration: 0.18, ease: EASE_OUT },
        });

        await new Promise<void>((r) => requestAnimationFrame(() => r()));
      } finally {
        if (!cancelled) setPhase("animating");
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [fillControls]);

  const target =
    phase === "boot"
      ? bootPos ?? { x: 0, y: 0 }
      : finalPos ?? { x: 0, y: 0 };

  const moveTransition =
    phase === "boot" || reduceMotion
      ? { duration: 0 }
      : { duration: MOVE_MS / 1000, ease: EASE_OUT };

  return (
    <div className={["fixed inset-0 select-none", booting ? "z-[999]" : "z-[60]"].join(" ")}>
      {/* solid boot layer: fades out during the move */}
      <AnimatePresence>
        {booting && (
          <motion.div
            key="boot-solid"
            className="fixed inset-0 pointer-events-none"
            style={{ background: "#4053d4" }}
            initial={{ opacity: 1 }}
            animate={{ opacity: phase === "boot" ? 1 : 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18, ease: EASE_OUT }}
          />
        )}
      </AnimatePresence>

      <motion.div
        ref={rowRef}
        className="fixed left-0 top-0 pointer-events-none"
        style={{
          scale: LOGO_SCALE,
          transformOrigin: "top left",
          willChange: "transform",
        }}
        animate={{
          x: target.x,
          y: target.y,
          opacity: bootPos && finalPos ? 1 : 0,
        }}
        transition={moveTransition}
        onAnimationComplete={() => {
          if (phase === "animating") {
            setPhase("done");
            onDone?.();
          }
        }}
      >
        <div className="inline-flex items-center justify-center flex-nowrap whitespace-nowrap">
          {/* left->right fill: dim base + white overlay clipped by animated width */}
          <span className="relative inline-block">
            <span className="opacity-30">
              <BrandMark />
            </span>

            <motion.span
              className="absolute inset-y-0 left-0 overflow-hidden"
              initial={{ width: "0%" }}
              animate={fillControls}
              style={{ willChange: "width" }}
            >
              <BrandMark />
            </motion.span>
          </span>
        </div>
      </motion.div>
    </div>
  );
}
