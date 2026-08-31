"use client";

import { useLayoutEffect } from "react";

let lockCount = 0;
let saved: {
  overflow: string;
  htmlOverflow: string;
  paddingRight: string;
  overscroll: string;
  htmlOverscroll: string;
} | null = null;

function lockBody() {
  if (typeof document === "undefined") return;
  if (lockCount === 0) {
    const { style } = document.body;
    const html = document.documentElement;
    const scrollbar = Math.max(0, window.innerWidth - html.clientWidth);
    saved = {
      overflow: style.overflow,
      htmlOverflow: html.style.overflow,
      paddingRight: style.paddingRight,
      overscroll: style.overscrollBehavior,
      htmlOverscroll: html.style.overscrollBehavior,
    };
    html.style.overflow = "hidden";
    html.style.overscrollBehavior = "none";
    style.overflow = "hidden";
    style.overscrollBehavior = "none";
    if (scrollbar) style.paddingRight = `${scrollbar}px`;
  }
  lockCount += 1;
}

function unlockBody() {
  if (lockCount === 0) return;
  lockCount -= 1;
  if (lockCount > 0 || !saved) return;
  const { style } = document.body;
  const html = document.documentElement;
  style.overflow = saved.overflow;
  style.paddingRight = saved.paddingRight;
  style.overscrollBehavior = saved.overscroll;
  html.style.overflow = saved.htmlOverflow;
  html.style.overscrollBehavior = saved.htmlOverscroll;
  saved = null;
}

export function useBodyScrollLock(locked: boolean) {
  useLayoutEffect(() => {
    if (!locked) return;
    lockBody();
    return () => unlockBody();
  }, [locked]);
}
