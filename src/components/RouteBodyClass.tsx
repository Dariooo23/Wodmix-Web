"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const SUBPAGE_CLASS = "subpage-no-scrollbar";

export const RouteBodyClass = () => {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname) {
      return;
    }

    const isHomePage = pathname === "/";
    const root = document.documentElement;

    root.classList.toggle(SUBPAGE_CLASS, !isHomePage);
    document.body.classList.toggle(SUBPAGE_CLASS, !isHomePage);

    return () => {
      root.classList.remove(SUBPAGE_CLASS);
      document.body.classList.remove(SUBPAGE_CLASS);
    };
  }, [pathname]);

  return null;
};
