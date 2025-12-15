// components/Menu.tsx — DROP-IN REPLACEMENT
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
          "origin-left scale-x-0 bg-white/95",
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
          {/* bio */}
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

          {/* resume */}
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

          {/* linkedin */}
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

          {/* contact */}
          <li className="w-full flex flex-col items-start">
            <a
              className={[hit, header, size, "group inline-flex items-center"].join(" ")}
              href="mailto:isaacseiler@gmail.com"
            >
              <UnderlineLabel>Contact</UnderlineLabel>
              <ArrowNE />
            </a>
          </li>

          {/* pill: b/w dynamic shimmer (no rotating rectangle) */}
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
              {/* layer 1: soft blobs + diagonal sheen, animated in x/y */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                style={{
                  backgroundImage: `
                    radial-gradient(circle at 20% 30%, rgba(0,0,0,0.35), transparent 60%),
                    radial-gradient(circle at 75% 70%, rgba(0,0,0,0.22), transparent 62%),
                    linear-gradient(115deg, rgba(0,0,0,0.28), rgba(255,255,255,0.18), rgba(0,0,0,0.22))
                  `,
                  backgroundSize: "180% 180%, 190% 190%, 240% 240%",
                  animation: "pill-drift-a 9.7s cubic-bezier(0.2, 1, 0.2, 1) infinite alternate",
                }}
              />

              {/* layer 2: fine texture sweep with different period (breaks loop detectability) */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 mix-blend-multiply"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(135deg, rgba(0,0,0,0.10) 0 7px, rgba(255,255,255,0.06) 7px 14px)",
                  backgroundSize: "220% 220%",
                  animation: "pill-drift-b 13.3s ease-in-out infinite alternate",
                }}
              />

              <span className="relative z-10">NEW SITE COMING SOON</span>

              <style jsx>{`
                @keyframes pill-drift-a {
                  0% {
                    background-position: 10% 20%, 90% 85%, 0% 50%;
                    transform: translate3d(-1%, -1%, 0);
                  }
                  25% {
                    background-position: 85% 10%, 20% 80%, 100% 35%;
                    transform: translate3d(1.2%, -0.6%, 0);
                  }
                  50% {
                    background-position: 30% 95%, 70% 20%, 40% 100%;
                    transform: translate3d(0.4%, 1.1%, 0);
                  }
                  75% {
                    background-position: 5% 45%, 95% 55%, 70% 0%;
                    transform: translate3d(-1.1%, 0.6%, 0);
                  }
                  100% {
                    background-position: 75% 80%, 10% 10%, 0% 60%;
                    transform: translate3d(1%, 1%, 0);
                  }
                }

                @keyframes pill-drift-b {
                  0% {
                    background-position: 0% 0%;
                    transform: translate3d(1%, -1%, 0);
                    opacity: 0.45;
                  }
                  50% {
                    background-position: 80% 30%;
                    transform: translate3d(-1%, 1%, 0);
                    opacity: 0.75;
                  }
                  100% {
                    background-position: 20% 90%;
                    transform: translate3d(0.5%, -0.6%, 0);
                    opacity: 0.6;
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
