"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type Key = "bio" | "resume" | null;

const EASE_OUT = [0.2, 1, 0.2, 1] as const;

const bioHtml =
  "I&apos;m Isaac, a recent graduate of Washington University in St. Louis, Fulbright and Truman Scholar, and Member of ChatGPT Lab at OpenAI. I&apos;ve directed a communications program on Capitol Hill, published work through OpenAI, set up a congressional office, run my own consultancy, and run AI workshops for educators. I&apos;m currently in the market for tech roles starting summer 2026.";

function UnderlineLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="relative inline-block">
      <span>{children}</span>
      <span
        aria-hidden
        className={[
          "pointer-events-none absolute left-0 -bottom-1 h-[2px] w-full",
          "origin-left scale-x-0",
          "bg-white/95",
          "transition-transform duration-[520ms]",
          "[transition-timing-function:cubic-bezier(0.2,1,0.2,1)]",
          "group-hover:scale-x-100",
        ].join(" ")}
      />
    </span>
  );
}

function ArrowNE() {
  return (
    <span
      aria-hidden
      className={[
        "ml-2 inline-block select-none",
        "transition-transform duration-[520ms]",
        "[transition-timing-function:cubic-bezier(0.2,1,0.2,1)]",
        "group-hover:-translate-y-[2px] group-hover:translate-x-[2px]",
      ].join(" ")}
    >
      ↗
    </span>
  );
}

export default function Menu() {
  const [open, setOpen] = useState<Key>(null);

  const reset =
    "appearance-none bg-transparent border-0 outline-none ring-0 focus:outline-none focus:ring-0";
  const header =
    "font-sans font-normal tracking-[-0.02em] text-white text-left";
  const size = "text-xl sm:text-2xl leading-snug";
  const hit = "py-3 sm:py-4 w-full";

  return (
    <div className="w-full h-[100svh] flex items-center justify-center">
      <div className="w-full max-w-xl px-6 sm:px-10">
        <ul className="w-full space-y-3">
          <li className="w-full flex flex-col items-start">
            <button
              type="button"
              className={[reset, hit, header, size, "group"].join(" ")}
              onClick={() => setOpen(open === "bio" ? null : "bio")}
            >
              <UnderlineLabel>Bio</UnderlineLabel>
            </button>

            <AnimatePresence initial={false}>
              {open === "bio" && (
                <motion.div
                  key="bio"
                  className="w-full overflow-hidden"
                  initial={{ height: 0, opacity: 0, y: -8 }}
                  animate={{ height: "auto", opacity: 1, y: 0 }}
                  exit={{ height: 0, opacity: 0, y: -8 }}
                  transition={{ duration: 0.28, ease: EASE_OUT }}
                >
                  <div className="pt-1 pb-4">
                    <div className="max-w-[52ch]">
                      <p
                        className="font-sans tracking-normal text-white/90 text-left text-sm sm:text-base leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: bioHtml }}
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </li>

          <li className="w-full flex flex-col items-start">
            <button
              type="button"
              className={[reset, hit, header, size, "group"].join(" ")}
              onClick={() => setOpen(open === "resume" ? null : "resume")}
            >
              <UnderlineLabel>Resume</UnderlineLabel>
            </button>

            <AnimatePresence initial={false}>
              {open === "resume" && (
                <motion.div
                  key="resume"
                  className="w-full overflow-hidden"
                  initial={{ height: 0, opacity: 0, y: -8 }}
                  animate={{ height: "auto", opacity: 1, y: 0 }}
                  exit={{ height: 0, opacity: 0, y: -8 }}
                  transition={{ duration: 0.28, ease: EASE_OUT }}
                >
                  <div className="pt-2 pb-4">
                    <a
                      href="/resume.pdf"
                      download
                      className={[header, "group inline-flex items-center"].join(" ")}
                    >
                      <UnderlineLabel>download resume (pdf)</UnderlineLabel>
                    </a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </li>

          <li className="w-full flex flex-col items-start">
            <a
              className={[hit, header, size, "group inline-flex items-center"].join(" ")}
              href="https://www.linkedin.com/in/isaacseiler/"
              target="_blank"
              rel="noreferrer"
            >
              <UnderlineLabel>LinkedIn</UnderlineLabel>
              <ArrowNE />
            </a>
          </li>

          <li className="w-full flex flex-col items-start">
            <a
              className={[hit, header, size, "group inline-flex items-center"].join(" ")}
              href="mailto:isaacseiler@gmail.com"
            >
              <UnderlineLabel>Contact</UnderlineLabel>
              <ArrowNE />
            </a>
          </li>

          {/* pill: black/white dynamic shimmer on hover (non-linear, multi-direction) */}
          <li className="w-full pt-4">
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              className={[
                "group relative inline-flex items-center justify-center",
                "rounded-full px-6 py-3",
                "bg-white text-black",
                "font-sans font-semibold tracking-[0.14em]",
                "text-xs sm:text-sm uppercase",
                "overflow-hidden select-none",
              ].join(" ")}
            >
              {/* base shimmer: layered conic + radial for “alive” motion */}
              <span
                aria-hidden
                className="absolute inset-[-40%] opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                style={{
                  backgroundImage: `
                    radial-gradient(circle at 30% 30%, rgba(0,0,0,0.55), transparent 55%),
                    radial-gradient(circle at 70% 60%, rgba(0,0,0,0.35), transparent 60%),
                    conic-gradient(from 0deg, rgba(0,0,0,0.65), rgba(255,255,255,0.15), rgba(0,0,0,0.65), rgba(255,255,255,0.1), rgba(0,0,0,0.65))
                  `,
                  backgroundBlendMode: "multiply",
                  filter: "contrast(1.25)",
                  animation: "bw-drift 3.2s linear infinite",
                }}
              />

              {/* subtle grainy sweep layer */}
              <span
                aria-hidden
                className="absolute inset-[-60%] opacity-0 group-hover:opacity-100 transition-opacity duration-200 mix-blend-overlay"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(135deg, rgba(0,0,0,0.25) 0 6px, rgba(255,255,255,0.10) 6px 12px)",
                  filter: "blur(0.2px)",
                  animation: "bw-scrub 2.7s ease-in-out infinite alternate",
                }}
              />

              <span className="relative z-10 transition-colors duration-200 group-hover:text-white">
                NEW SITE COMING SOON
              </span>

              <style jsx>{`
                @keyframes bw-drift {
                  0% {
                    transform: translate3d(-6%, -4%, 0) rotate(0deg);
                  }
                  25% {
                    transform: translate3d(6%, -2%, 0) rotate(35deg);
                  }
                  50% {
                    transform: translate3d(3%, 6%, 0) rotate(95deg);
                  }
                  75% {
                    transform: translate3d(-5%, 3%, 0) rotate(155deg);
                  }
                  100% {
                    transform: translate3d(-6%, -4%, 0) rotate(220deg);
                  }
                }

                @keyframes bw-scrub {
                  0% {
                    transform: translate3d(-3%, 2%, 0) rotate(3deg);
                    opacity: 0.55;
                  }
                  100% {
                    transform: translate3d(4%, -3%, 0) rotate(-7deg);
                    opacity: 0.9;
                  }
                }
              `}</style>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
