"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { CreateTeamForm } from "@/components/team/CreateTeamForm";
import Link from "next/link";

function NewTeamContent() {
  const searchParams = useSearchParams();
  const resultId = searchParams.get("resultId");

  if (!resultId) {
    return (
      <div className="text-center">
        <h1 className="mb-4 text-2xl font-bold text-gray-900">잘못된 접근입니다</h1>
        <p className="mb-6 text-gray-500">먼저 테스트를 완료해주세요.</p>
        <Link href="/assessment" className="text-primary hover:underline">
          테스트 하러 가기
        </Link>
      </div>
    );
  }

  return <CreateTeamForm resultId={resultId} />;
}

export default function NewTeamPage() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center px-4">
      <Suspense fallback={<p className="text-gray-400">로딩 중...</p>}>
        <NewTeamContent />
      </Suspense>
    </main>
  );
}
