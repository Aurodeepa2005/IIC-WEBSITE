import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8 text-center bg-background">
      <div className="max-w-md border border-line p-8 relative bg-surface">
        <div className="corner-bracket-tl" />
        <div className="corner-bracket-tr" />
        <div className="corner-bracket-bl" />
        <div className="corner-bracket-br" />

        <p className="font-mono text-xs text-muted lowercase tracking-wider mb-3">
          // system ready &bull; step u1
        </p>
        <h1 className="font-sans text-2xl font-light uppercase tracking-widest text-text mb-4">
          IDEA INNOVATION CELL
        </h1>
        <p className="font-sans text-sm text-muted mb-6 leading-relaxed">
          Design system and foundational tokens initialized. The full page implementations will begin in subsequent steps.
        </p>

        <Link
          href="/style"
          className="inline-block bg-text text-background font-sans font-medium text-sm px-6 py-2.5 rounded-full hover:bg-white transition-all shadow-glow"
        >
          View Style Tile &rarr;
        </Link>
      </div>
    </main>
  );
}
