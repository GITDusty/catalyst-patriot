import Link from "next/link";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/florida", label: "Florida" },
  { href: "/illinois", label: "Illinois" },
  { href: "/compare", label: "Compare" },
];

export function AppNav() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/70 backdrop-blur-md">
      <nav className="section-shell flex items-center justify-between py-4">
        <Link href="/" className="text-sm font-semibold tracking-[0.16em] uppercase text-cyan-300">
          Catalyst Patriot
        </Link>
        <div className="flex items-center gap-2 sm:gap-3">
          {NAV_LINKS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-gray-200 transition hover:border-cyan-500/40 hover:text-cyan-300"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
