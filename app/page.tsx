"use client";

import { useEffect } from "react";
import Main from "@/components/Main";

const COLORS = ["#4053d4", "#c495d1", "#95d1b1", "#67b6cf"] as const;

function pickColor(): string {
  const idx = Math.floor(Math.random() * COLORS.length);
  return COLORS[idx];
}

export default function Page() {
  useEffect(() => {
    // stable within the same browser tab session, random across new sessions
    const key = "isaac_bg_session_v1";
    let c = sessionStorage.getItem(key);

    if (!c || !COLORS.includes(c as any)) {
      c = pickColor();
      sessionStorage.setItem(key, c);
    }

    // avoid a visible “restart” snap: set var immediately, css handles smooth transition
    document.documentElement.style.setProperty("--bg", c);
  }, []);

  return <Main />;
}
