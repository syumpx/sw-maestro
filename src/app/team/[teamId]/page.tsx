"use client";

import { useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { useTeamPolling } from "@/hooks/useTeamPolling";
import { useDownloadImage } from "@/hooks/useDownloadImage";
import { ScatterPlot, type Dot } from "@/components/result/ScatterPlot";
import { MemberList } from "@/components/team/MemberList";
import { InviteLink } from "@/components/team/InviteLink";
import { Button } from "@/components/ui/Button";
import { COLORS } from "@/lib/constants";

export default function TeamPage() {
  const params = useParams();
  const router = useRouter();
  const teamId = params.teamId as string;
  const { data, loading, error } = useTeamPolling(teamId);
  const captureRef = useRef<HTMLDivElement>(null);
  const { download, isCapturing } = useDownloadImage();

  if (loading) {
    return (
      <main className="flex min-h-dvh items-center justify-center">
        <p className="text-gray-400">로딩 중...</p>
      </main>
    );
  }

  if (error || !data) {
    return (
      <main className="flex min-h-dvh flex-col items-center justify-center px-4">
        <h1 className="mb-4 text-2xl font-bold text-gray-900">팀을 찾을 수 없습니다</h1>
        <p className="text-gray-500">링크를 확인해주세요.</p>
      </main>
    );
  }

  const dots: Dot[] = data.members.map((m, i) => ({
    name: m.name,
    x: m.activeScore,
    y: m.structuredScore,
    color: COLORS.dots[i % COLORS.dots.length],
    id: m.id,
  }));

  function handleDotClick(dot: Dot) {
    if (dot.id) router.push(`/result/${dot.id}`);
  }

  function handleDownload() {
    if (captureRef.current) {
      download(captureRef.current, `team-${teamId.slice(0, 8)}.png`);
    }
  }

  return (
    <main className="mx-auto max-w-lg px-4 py-10">
      <h1 className="mb-2 text-center text-2xl font-bold text-gray-900">
        {data.team.name}
      </h1>
      <p className="mb-8 text-center text-sm text-gray-400">
        팀원 {data.members.length}명 · 5초마다 자동 업데이트
      </p>

      <div ref={captureRef} className="rounded-2xl bg-background p-6">
        <div className="mb-6 flex justify-center">
          <ScatterPlot dots={dots} onDotClick={handleDotClick} />
        </div>
      </div>

      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <Button variant="secondary" onClick={handleDownload} disabled={isCapturing}>
          {isCapturing ? "저장 중..." : "이미지 저장"}
        </Button>
      </div>

      <div className="mt-8 space-y-4">
        <MemberList members={data.members} />
        <InviteLink teamId={teamId} />
      </div>
    </main>
  );
}
