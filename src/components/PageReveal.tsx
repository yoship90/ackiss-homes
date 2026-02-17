"use client";

import { useEffect, type ReactNode } from "react";

export default function PageReveal({ children }: { children: ReactNode }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="animate-page-reveal origin-top will-change-[transform,opacity] [backface-visibility:hidden]">
      {children}
    </div>
  );
}
