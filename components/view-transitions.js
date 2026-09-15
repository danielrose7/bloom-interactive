"use client";

import { ViewTransition } from "react";
import { usePathname } from "next/navigation";

export default function ViewTransitions({ children }) {
  const pathname = usePathname();

  return (
    <ViewTransition
      key={pathname}
      enter="bloom-page-enter"
      exit="bloom-page-exit"
    >
      {children}
    </ViewTransition>
  );
}
