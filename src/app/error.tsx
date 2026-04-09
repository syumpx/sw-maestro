"use client";

import { Button } from "@/components/ui/Button";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center px-4">
      <div className="text-center">
        <h1 className="mb-2 text-2xl font-bold text-gray-900">문제가 발생했습니다</h1>
        <p className="mb-6 text-gray-500">잠시 후 다시 시도해주세요</p>
        <Button onClick={reset}>다시 시도</Button>
      </div>
    </main>
  );
}
