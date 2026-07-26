import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center bg-void">
      <main className="flex w-full max-w-[1200px] flex-col items-start px-4 py-32 sm:px-8 lg:px-16">
        <p className="mb-3 font-body text-xs font-medium uppercase tracking-[0.05em] text-ash">
          Portfolio
        </p>
        <h1 className="font-display text-[clamp(2.5rem,5vw,4rem)] font-bold leading-[1.1] text-bone">
          Bidyabhushan Nanda
        </h1>
        <p className="mt-4 max-w-[65ch] font-body text-base leading-relaxed text-ash">
          Full-stack engineer. Frontend, backend, infrastructure.
        </p>
        <Link
          href="/style-guide"
          className="mt-8 font-body text-sm text-amber underline-offset-4 hover:underline"
        >
          View style guide →
        </Link>
      </main>
    </div>
  );
}
