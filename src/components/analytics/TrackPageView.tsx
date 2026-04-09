"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { trackEvent } from "@/lib/analytics";

export function TrackPageView() {
  const pathname = usePathname();
  const lastPathname = useRef<string>();

  useEffect(() => {
    if (pathname !== lastPathname.current) {
      lastPathname.current = pathname;
      trackEvent("page_view");
    }
  }, [pathname]);

  return null;
}
