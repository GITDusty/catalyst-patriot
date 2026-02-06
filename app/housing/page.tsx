import Link from "next/link";

export default function HousingPage() {
  return (
    <div className="bg-black text-white min-h-screen flex flex-col items-center justify-center px-6">
      <div className="text-center max-w-2xl">
        <p className="text-amber-500 text-xs font-semibold tracking-[0.3em] uppercase mb-6">
          Coming Soon
        </p>
        <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-6">
          The American Housing Crisis, By the Numbers.
        </h1>
        <p className="text-gray-400 text-lg max-w-xl mx-auto mb-4">
          How much harder is it for a 20-year-old to afford a home today
          compared to 1995? Or 1975?
        </p>
        <p className="text-gray-500 mb-12">
          We&apos;re building the data layer now. Join the waitlist to be
          notified when this page launches.
        </p>
        <Link
          href="/act"
          className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-black font-bold px-8 py-4 rounded-lg text-lg transition"
        >
          Join the Waitlist
          <span aria-hidden="true">&rarr;</span>
        </Link>
      </div>
    </div>
  );
}
