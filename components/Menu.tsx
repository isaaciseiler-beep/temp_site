"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type ItemKey = "bio" | "resume";

const EASE = [0.2, 1, 0.2, 1] as const;

const bioText = `I&apos;m Isaac, a recent graduate of Washington University in St. Louis, Fulbright and Truman Scholar, and Member of ChatGPT Lab at OpenAI. I&apos;ve directed a communications program on Capitol Hill, published work through OpenAI, set up a congressional office, run my own consultancy, and run AI workshops for educators. I&apos;m currently in the market for tech roles starting summer 2026.`;

export default function Menu() {
  const [openKey, setOpenKey] = useState<ItemKey | null>(null);

  const items = useMemo(
    () => [
      {
        key: "bio" as const,
        label: "Bio",
        type: "expand" as const,
      },
      {
        key: "resume" as const,
        label: "Resume",
        type: "expand" as const,
      },
      {
        key: "linkedin" as const,
        label: "LinkedIn",
        type: "link" as const,
        href: "https://www.linkedin.com/in/isaacseiler/",
      },
      {
        key: "contact" as const,
        label: "Contact",
        type: "mailto" as const,
        href: "mailto:isaacseiler@gmail.com",
      },
    ],
    []
  );

  const toggle = (k: ItemKey) => setOpenKey((prev) => (prev === k ? null : k));

  const headerBase =
    "w-full text-white text-center font-mono tracking-tight select-none";
  const headerSize =
    "text-2xl sm:text-3xl md:text-4xl leading-tight"; // doubled-ish vs typical
  const buttonReset =
    "appearance-none bg-transparent border-0 outline-none ring-0 focus:outline-none focus:ring-0";
  const row =
    "w-full flex flex-col items-center justify-center";
  const hit =
    "w-full py-4 sm:py-5";

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <div className="w-full max-w-xl px-6">
        <ul className="w-full space-y-3">
          {items.map((it) => {
            if (it.type === "expand") {
              const isOpen = openKey === it.key;
              return (
                <li key={it.key} className={row}>
                  <button
                    type="button"
                    className={[buttonReset, hit, headerBase, headerSize].join(" ")}
                    onClick={() => toggle(it.key)}
                  >
                    {it.label}
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key={`${it.key}-panel`}
                        className="w-full overflow-hidden"
                        initial={{ height: 0, opacity: 0, y: -6 }}
                        animate={{ height: "auto", opacity: 1, y: 0 }}
                        exit={{ height: 0, opacity: 0, y: -6 }}
                        transition={{ duration: 0.28, ease: EASE }}
                      >
                        <div className="pb-5 pt-1">
                          {it.key === "bio" ? (
                            <p
                              className="text-white/90 text-center text-base sm:text-lg leading-relaxed"
                              dangerouslySetInnerHTML={{ __html: bioText }}
                            />
                          ) : (
                            <div className="flex items-center justify-center pt-2">
                              <a
                                href="/resume.pdf"
                                download
                                className="font-mono text-white underline underline-offset-4 decoration-white/60 hover:decoration-white transition"
                              >
                                download resume (pdf)
                              </a>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            }

            if (it.type === "link") {
              return (
                <li key={it.key} className={row}>
                  <a
                    className={[hit, headerBase, headerSize, "no-underline hover:opacity-90 transition"].join(" ")}
                    href={it.href}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {it.label}
                  </a>
                </li>
              );
            }

            // mailto: triggers browser/email client permission flow (no expansion, no email shown)
            return (
              <li key={it.key} className={row}>
                <a
                  className={[hit, headerBase, headerSize, "no-underline hover:opacity-90 transition"].join(" ")}
                  href={it.href}
                >
                  {it.label}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
