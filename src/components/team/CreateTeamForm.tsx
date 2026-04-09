"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";

interface CreateTeamFormProps {
  resultId: string;
}

export function CreateTeamForm({ resultId }: CreateTeamFormProps) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/teams", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), createdBy: resultId }),
      });

      if (!res.ok) throw new Error("Failed to create team");

      const team = await res.json();
      router.push(`/team/${team.id}`);
    } catch {
      setError("팀 생성에 실패했습니다. 다시 시도해주세요.");
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto flex w-full max-w-sm flex-col gap-6">
      <div>
        <h1 className="mb-2 text-2xl font-bold text-gray-900">팀 만들기</h1>
        <p className="text-gray-500">팀 이름을 정하고 팀원을 초대하세요</p>
      </div>

      <div>
        <label htmlFor="teamName" className="mb-1 block text-sm font-medium text-gray-700">
          팀 이름
        </label>
        <input
          id="teamName"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="우리 팀"
          required
          autoFocus
          className="h-11 w-full rounded-xl border border-gray-200 bg-white px-4 text-base outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
        />
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}

      <Button type="submit" size="lg" disabled={!name.trim() || loading}>
        {loading ? "생성 중..." : "팀 생성하기"}
      </Button>
    </form>
  );
}
