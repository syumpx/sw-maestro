"use client";

import { forwardRef, ReactNode } from "react";

interface ResultCaptureProps {
  children: ReactNode;
}

export const ResultCapture = forwardRef<HTMLDivElement, ResultCaptureProps>(
  ({ children }, ref) => {
    return (
      <div ref={ref} className="rounded-2xl bg-background p-6">
        {children}
      </div>
    );
  }
);

ResultCapture.displayName = "ResultCapture";
