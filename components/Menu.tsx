// components/Menu.tsx — DROP-IN REPLACEMENT
"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type Key = "bio" | "resume" | null;

const EASE_OUT = [0.2, 1, 0.2, 1] as const;

const bioHtml =
  "I&apos;m Isaac, a recent graduate of Washington University in St. Louis, Fulbright and Truman Scholar, and Member of ChatGPT Lab at OpenAI. I&apos;ve directed a communications program on Capitol Hill, published work through OpenAI, set up a congressional office, run my own consultancy, and run AI workshops for educators. I&apos;m currently in the market for tech roles starting summer 2026.";

function UnderlineLabel({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <span className="relative inline-block">
      <span>{children}</span>
      <span
        aria-hidden
        className={[
          "pointer-events-none absolute left-0 -bottom-1 h-[2px] w-full",
          "origin-left scale-x-0",
          "bg-white/95",
          "transition-transform duration-[420ms]",
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
        "transition-transform duration-[420ms]",
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
    "font-sans font-normal tracking-[-0.02em] text-white text-center";
  const size = "text-lg sm:text-xl leading-snug";
  const hit = "py-3 sm:py-4 w-full";

  return (
    <div className="w-full h-[100svh] flex items-center justify-center">
      <div className="w-full max-w-xl px-6">
        <ul className="w-full space-y-3">
          {/* bio (expand) */}
          <li className="w-full flex flex-col items-center">
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
                    <div className="mx-auto max-w-[46ch]">
                      <p
                        className="font-sans tracking-normal text-white/90 text-center text-sm sm:text-base leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: bioHtml }}
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </li>

          {/* resume (expand) */}
          <li className="w-full flex flex-col items-center">
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
                  <div className="pt-2 pb-4 flex items-center justify-center">
                    <a
                      href="/resume.pdf"
                      download
                      className={[header, "group"].join(" ")}
                    >
                      <UnderlineLabel>download resume (pdf)</UnderlineLabel>
                    </a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </li>

          {/* linkedin (direct link, no expand) */}
          <li className="w-full flex flex-col items-center">
            <a
              className={[hit, header, size, "group"].join(" ")}
              href="https://www.linkedin.com/in/isaacseiler/"
              target="_blank"
              rel="noreferrer"
            >
              <UnderlineLabel>LinkedIn</UnderlineLabel>
              <ArrowNE />
            </a>
          </li>

          {/* contact (direct mailto, no expand) */}
          <li className="w-full flex flex-col items-center">
            <a
              className={[hit, header, size, "group"].join(" ")}
              href="mailto:isaacseiler@gmail.com"
            >
              <UnderlineLabel>Contact</UnderlineLabel>
              <ArrowNE />
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

