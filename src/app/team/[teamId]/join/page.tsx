"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { trackEvent } from "@/lib/analytics";

export default function JoinTeamPage() {
  const params = useParams();
  const router = useRouter();
  const teamId = params.teamId as string;
  const [teamName, setTeamName] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchTeam() {
      try {
        const res = await fetch(`/api/teams/${teamId}`);
        if (!res.ok) throw new Error();
        const data = await res.json();
        setTeamName(data.team.name);
        trackEvent("team_invite_view", { teamId });
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchTeam();
  }, [teamId]);

  function handleJoin() {
    trackEvent("team_join", { teamId });
    try {
      localStorage.setItem("pending_team_id", teamId);
    } catch {}
    router.push("/assessment");
  }

  if (loading) {
    return (
      <main className="flex min-h-dvh items-center justify-center">
        <p className="text-gray-400">로딩 중...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex min-h-dvh flex-col items-center justify-center px-4">
        <h1 className="mb-4 text-2xl font-bold text-gray-900">팀을 찾을 수 없습니다</h1>
        <p className="text-gray-500">링크를 확인해주세요.</p>
      </main>
    );
  }

  return (
    <main className="flex min-h-dvh flex-col items-center justify-center px-4">
      <div className="mx-auto max-w-sm text-center">
        <h1 className="mb-2 text-2xl font-bold text-gray-900">
          {teamName}에 초대받으셨습니다
        </h1>
        <p className="mb-8 text-gray-500">
          테스트를 완료하면 팀 그래프에서 결과를 함께 볼 수 있어요
        </p>
        <Button size="lg" onClick={handleJoin}>
          참여하기
        </Button>
      </div>
    </main>
  );
}
