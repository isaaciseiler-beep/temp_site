// components/Menu.tsx — DROP-IN REPLACEMENT
"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type Key = "bio" | "resume" | null;
const EASE = [0.2, 1, 0.2, 1] as const;

const bioHtml =
  "I&apos;m Isaac, a recent graduate of Washington University in St. Louis, Fulbright and Truman Scholar, and Member of ChatGPT Lab at OpenAI. I&apos;ve directed a communications program on Capitol Hill, published work through OpenAI, set up a congressional office, run my own consultancy, and run AI workshops for educators. I&apos;m currently in the market for tech roles starting summer 2026.";

export default function Menu() {
  const [open, setOpen] = useState<Key>(null);

  const btnReset =
    "w-full bg-transparent border-0 p-0 m-0 appearance-none outline-none ring-0 focus:outline-none focus:ring-0";
  const headerText =
    "font-sans font-normal text-white text-center tracking-[-0.02em]"; // match logo “slightly closer”
  const headerSize = "text-lg sm:text-xl leading-snug";
  const hit = "py-3 sm:py-4";

  return (
    <div className="w-full flex items-center justify-center">
      <div className="w-full max-w-xl px-6">
        <ul className="w-full space-y-3">
          {/* bio (expand) */}
          <li className="w-full flex flex-col items-center">
            <button
              type="button"
              className={[btnReset, hit, headerText, headerSize].join(" ")}
              onClick={() => setOpen(open === "bio" ? null : "bio")}
            >
              Bio
            </button>

            <AnimatePresence initial={false}>
              {open === "bio" && (
                <motion.div
                  key="bio"
                  className="w-full overflow-hidden"
                  initial={{ height: 0, opacity: 0, y: -6 }}
                  animate={{ height: "auto", opacity: 1, y: 0 }}
                  exit={{ height: 0, opacity: 0, y: -6 }}
                  transition={{ duration: 0.26, ease: EASE }}
                >
                  <div className="pt-1 pb-4">
                    <p
                      className="font-sans tracking-normal text-white/90 text-center text-sm sm:text-base leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: bioHtml }}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </li>

          {/* resume (expand) */}
          <li className="w-full flex flex-col items-center">
            <button
              type="button"
              className={[btnReset, hit, headerText, headerSize].join(" ")}
              onClick={() => setOpen(open === "resume" ? null : "resume")}
            >
              Resume
            </button>

            <AnimatePresence initial={false}>
              {open === "resume" && (
                <motion.div
                  key="resume"
                  className="w-full overflow-hidden"
                  initial={{ height: 0, opacity: 0, y: -6 }}
                  animate={{ height: "auto", opacity: 1, y: 0 }}
                  exit={{ height: 0, opacity: 0, y: -6 }}
                  transition={{ duration: 0.26, ease: EASE }}
                >
                  <div className="pt-2 pb-4 flex items-center justify-center">
                    <a
                      href="/resume.pdf"
                      download
                      className="font-sans tracking-normal text-white underline underline-offset-4 decoration-white/60 hover:decoration-white transition"
                    >
                      download resume (pdf)
                    </a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </li>

          {/* linkedin (direct link) */}
          <li className="w-full flex flex-col items-center">
            <a
              className={[hit, headerText, headerSize, "no-underline hover:opacity-90 transition"].join(
                " "
              )}
              href="https://www.linkedin.com/in/isaacseiler/"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn
            </a>
          </li>

          {/* contact (direct mailto) */}
          <li className="w-full flex flex-col items-center">
            <a
              className={[hit, headerText, headerSize, "no-underline hover:opacity-90 transition"].join(
                " "
              )}
              href="mailto:isaacseiler@gmail.com"
            >
              Contact
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
