"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/Button";

interface InviteLinkProps {
  teamId: string;
}

export function InviteLink({ teamId }: InviteLinkProps) {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout>();

  const url = typeof window !== "undefined"
    ? `${window.location.origin}/team/${teamId}/join`
    : `/team/${teamId}/join`;

  async function handleCopy() {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4">
      <p className="mb-2 text-sm font-medium text-gray-500">초대 링크</p>
      <div className="flex items-center gap-2">
        <input
          readOnly
          value={url}
          className="h-10 flex-1 rounded-lg border border-gray-200 bg-gray-50 px-3 text-sm text-gray-600"
        />
        <Button variant="primary" size="sm" onClick={handleCopy}>
          {copied ? "복사됨!" : "복사"}
        </Button>
      </div>
    </div>
  );
}
