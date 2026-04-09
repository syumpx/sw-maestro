"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import type { Result, Team } from "@/lib/db/schema";

interface TeamData {
  team: Team;
  members: Result[];
}

export function useTeamPolling(teamId: string) {
  const [data, setData] = useState<TeamData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const fetchTeam = useCallback(async () => {
    try {
      const res = await fetch(`/api/teams/${teamId}`);
      if (!res.ok) throw new Error("Failed to fetch team");
      const teamData = await res.json();
      setData(teamData);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }, [teamId]);

  useEffect(() => {
    fetchTeam();

    function startPolling() {
      stopPolling();
      intervalRef.current = setInterval(fetchTeam, 5000);
    }

    function stopPolling() {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    function handleVisibility() {
      if (document.hidden) {
        stopPolling();
      } else {
        fetchTeam(); // Fetch immediately when tab becomes visible
        startPolling();
      }
    }

    startPolling();
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      stopPolling();
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [fetchTeam]);

  return { data, error, loading, refetch: fetchTeam };
}
