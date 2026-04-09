import Link from "next/link";
import type { Result } from "@/lib/db/schema";
import { getQuadrant, quadrantInfo } from "@/lib/questions";

interface MemberListProps {
  members: Result[];
}

export function MemberList({ members }: MemberListProps) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white">
      <div className="border-b border-gray-100 px-4 py-3">
        <h3 className="text-sm font-semibold text-gray-900">팀원 ({members.length}명)</h3>
      </div>
      <div className="divide-y divide-gray-50">
        {members.map((m) => {
          const quadrant = getQuadrant({
            active: m.activeScore,
            passive: m.passiveScore,
            structured: m.structuredScore,
            free: m.freeScore,
          });
          const info = quadrantInfo[quadrant];
          return (
            <Link
              key={m.id}
              href={`/result/${m.id}`}
              className="flex items-center justify-between px-4 py-3 transition-colors hover:bg-gray-50"
            >
              <div>
                <span className="font-medium text-gray-900">{m.name}</span>
                <span className="ml-2 text-sm text-gray-400">{info.title}</span>
              </div>
              <div className="flex gap-3 text-xs text-gray-400">
                <span>A:{m.activeScore}</span>
                <span>P:{m.passiveScore}</span>
                <span>S:{m.structuredScore}</span>
                <span>F:{m.freeScore}</span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
