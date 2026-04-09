import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center px-4">
      <div className="mx-auto max-w-md text-center">
        <h1 className="mb-4 text-4xl font-bold tracking-tight text-gray-900">
          창업자 성향 테스트
        </h1>
        <p className="mb-2 text-lg text-gray-600">
          40개의 질문으로 알아보는 나의 창업자 성향
        </p>
        <p className="mb-8 text-sm text-gray-400">
          Active / Passive × Structured / Free
        </p>
        <Link
          href="/assessment"
          className="inline-flex h-12 items-center justify-center rounded-xl bg-primary px-8 text-base font-semibold text-white transition-colors hover:bg-primary-dark"
        >
          시작하기
        </Link>
      </div>
    </main>
  );
}
