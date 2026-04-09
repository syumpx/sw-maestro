"use client";

import { useCallback, useState } from "react";

export function useDownloadImage() {
  const [isCapturing, setIsCapturing] = useState(false);

  const download = useCallback(async (element: HTMLElement, filename: string = "result.png") => {
    setIsCapturing(true);
    try {
      const { toPng } = await import("html-to-image");
      const dataUrl = await toPng(element, {
        backgroundColor: "#FAFAFA",
        pixelRatio: 2,
      });
      const link = document.createElement("a");
      link.download = filename;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error("Image capture failed:", error);
    } finally {
      setIsCapturing(false);
    }
  }, []);

  return { download, isCapturing };
}
