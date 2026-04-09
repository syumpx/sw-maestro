import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center px-4">
      <div className="text-center">
        <h1 className="mb-2 text-6xl font-bold text-gray-200">404</h1>
        <p className="mb-6 text-lg text-gray-500">페이지를 찾을 수 없습니다</p>
        <Link
          href="/"
          className="inline-flex h-11 items-center justify-center rounded-xl bg-primary px-6 text-base font-semibold text-white transition-colors hover:bg-primary-dark"
        >
          홈으로 돌아가기
        </Link>
      </div>
    </main>
  );
}
