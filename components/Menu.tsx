"use client";

import { useMemo, useState, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

type ItemKey = "bio" | "resume";

const EASE_OUT = [0.2, 1, 0.2, 1] as const;

function ActionRow({
  label,
  href,
  onClick,
}: {
  label: string;
  href?: string;
  onClick?: () => void;
}) {
  const shared =
    "w-full py-5 md:py-6 text-center font-mono text-3xl md:text-4xl tracking-tight " +
    "text-white no-underline outline-none focus:outline-none";
  const hover =
    "transition opacity-85 hover:opacity-100 active:opacity-90";
  const underline =
    "relative after:absolute after:left-1/2 after:-translate-x-1/2 after:bottom-1 " +
    "after:h-px after:w-0 after:bg-white/85 after:transition-all after:duration-300 " +
    "hover:after:w-[14ch]";

  if (href) {
    return (
      <a
        className={[shared, hover, underline].join(" ")}
        href={href}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noreferrer" : undefined}
      >
        {label}
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} className={[shared, hover, underline].join(" ")}>
      {label}
    </button>
  );
}

function AccordionRow({
  open,
  onClick,
  title,
}: {
  open: boolean;
  onClick: () => void;
  title: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-expanded={open}
      className={[
        "w-full py-5 md:py-6 text-center font-mono text-3xl md:text-4xl tracking-tight",
        "text-white outline-none focus:outline-none",
        "transition opacity-85 hover:opacity-100 active:opacity-90",
        "relative after:absolute after:left-1/2 after:-translate-x-1/2 after:bottom-1 after:h-px after:bg-white/85",
        open ? "after:w-[14ch]" : "after:w-0",
        "after:transition-all after:duration-300",
      ].join(" ")}
    >
      {title}
    </button>
  );
}

function Panel({
  open,
  children,
}: {
  open: boolean;
  children: ReactNode;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <AnimatePresence initial={false}>
      {open && (
        <motion.div
          key="panel"
          initial={
            reduceMotion
              ? { opacity: 0 }
              : { height: 0, opacity: 0, y: -8, filter: "blur(10px)" }
          }
          animate={
            reduceMotion
              ? { opacity: 1 }
              : { height: "auto", opacity: 1, y: 0, filter: "blur(0px)" }
          }
          exit={
            reduceMotion
              ? { opacity: 0 }
              : { height: 0, opacity: 0, y: -8, filter: "blur(10px)" }
          }
          transition={{ duration: 0.42, ease: EASE_OUT }}
          className="overflow-hidden"
        >
          <div className="pb-6 md:pb-8 pt-2">
            <div className="mx-auto max-w-[42rem] text-center text-white/85 text-base md:text-lg leading-relaxed">
              {children}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function Menu() {
  const [open, setOpen] = useState<ItemKey | null>(null);

  const items = useMemo(
    () => [
      {
        key: "bio" as const,
        title: "bio",
        content: (
          <p>
            I'm Isaac, a recent graduate of Washington University in St. Louis, Fulbright and Truman Scholar, and Member of ChatGPT Lab at OpenAI. I've directed a communications program on Capitol Hill, published work through OpenAI, set up a congressional office, run my own consultancy, and run AI workshops for educators. I'm currently in the market for tech roles starting summer 2026.
          </p>
        ),
      },
      {
        key: "resume" as const,
        title: "resume",
        content: (
          <div className="flex items-center justify-center">
            <a
              className="inline-flex items-center justify-center rounded-full px-5 py-2.5 font-mono text-sm md:text-base tracking-tight text-white border border-white/25 hover:border-white/50 hover:bg-white/10 transition"
              href="/resume.pdf"
              download
            >
              download pdf
            </a>
          </div>
        ),
      },
    ],
    []
  );

  return (
    <section className="w-full">
      <div className="mx-auto w-full max-w-xl flex flex-col items-stretch">
        {items.map((it) => {
          const isOpen = open === it.key;
          return (
            <div key={it.key} className="w-full">
              <AccordionRow
                open={isOpen}
                onClick={() => setOpen((prev) => (prev === it.key ? null : it.key))}
                title={it.title}
              />
              <Panel open={isOpen}>{it.content}</Panel>
            </div>
          );
        })}

        <div className="h-2" />

        <ActionRow label="linkedin" href="https://www.linkedin.com/in/isaacseiler/" />

        <ActionRow label="contact" href="mailto:isaacseiler@gmail.com" />
      </div>
    </section>
  );
}
