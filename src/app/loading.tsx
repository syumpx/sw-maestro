export default function Loading() {
  return (
    <main className="flex min-h-dvh items-center justify-center">
      <div className="flex gap-1">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="h-2.5 w-2.5 animate-pulse rounded-full bg-primary"
            style={{ animationDelay: `${i * 150}ms` }}
          />
        ))}
      </div>
    </main>
  );
}
