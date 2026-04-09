"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/Button";
import { useDownloadImage } from "@/hooks/useDownloadImage";
import { trackEvent } from "@/lib/analytics";

interface ShareButtonsProps {
  resultId: string;
  captureRef: React.RefObject<HTMLDivElement | null>;
  showTeamButton?: boolean;
  showRetryButton?: boolean;
}

export function ShareButtons({ resultId, captureRef, showTeamButton = true, showRetryButton = true }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const { download, isCapturing } = useDownloadImage();
  const timeoutRef = useRef<NodeJS.Timeout>();

  async function handleCopyLink() {
    const url = `${window.location.origin}/result/${resultId}`;
    await navigator.clipboard.writeText(url);
    trackEvent("share_link", { resultId });
    setCopied(true);
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setCopied(false), 2000);
  }

  function handleDownload() {
    if (captureRef.current) {
      trackEvent("image_download", { resultId, context: "result" });
      download(captureRef.current, `personality-${resultId.slice(0, 8)}.png`);
    }
  }

  return (
    <div className="flex flex-wrap gap-3">
      <Button variant="primary" onClick={handleCopyLink}>
        {copied ? "복사됨!" : "결과 공유하기"}
      </Button>
      <Button variant="secondary" onClick={handleDownload} disabled={isCapturing}>
        {isCapturing ? "저장 중..." : "이미지 저장"}
      </Button>
      {showTeamButton && (
        <Button
          variant="secondary"
          onClick={() => {
            window.location.href = `/team/new?resultId=${resultId}`;
          }}
        >
          팀원 초대하기
        </Button>
      )}
      {showRetryButton && (
        <Button
          variant="ghost"
          onClick={() => {
            trackEvent("retake", { resultId });
            try { localStorage.removeItem("assessment_progress"); } catch {}
            window.location.href = "/assessment";
          }}
        >
          다시 하기
        </Button>
      )}
    </div>
  );
}
