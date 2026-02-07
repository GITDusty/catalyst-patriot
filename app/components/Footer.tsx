import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black/30 backdrop-blur-sm">
      <div className="mx-auto max-w-6xl px-8 py-10">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div>
            <p className="mb-4 text-base font-semibold text-white">Catalyst Patriot</p>

            <p className="mb-2 text-xs font-semibold tracking-wider text-gray-400 uppercase">
              State Budgets
            </p>
            <div className="mb-5 space-y-2 text-sm">
              <Link href="/florida" className="block text-gray-300 transition hover:text-white">
                → Florida
              </Link>
              <Link href="/illinois" className="block text-gray-300 transition hover:text-white">
                → Illinois
              </Link>
              <Link href="/compare" className="block text-gray-300 transition hover:text-white">
                → Compare
              </Link>
            </div>

            <p className="mb-2 text-xs font-semibold tracking-wider text-gray-400 uppercase">
              National Issues
            </p>
            <div className="space-y-2 text-sm">
              <Link
                href="/social-security"
                className="block text-gray-300 transition hover:text-amber-300"
              >
                → Social Security
              </Link>
              <Link
                href="/housing"
                className="block text-cyan-400 transition hover:text-cyan-300"
              >
                → Housing
              </Link>
            </div>
          </div>

          <div>
            <p className="mb-4 text-xs font-semibold tracking-wider text-gray-400 uppercase">
              Get Involved
            </p>
            <div className="space-y-2 text-sm">
              <Link href="/act" className="block text-gray-300 transition hover:text-emerald-300">
                → Join the Movement
              </Link>
              <Link href="/compare" className="block text-gray-300 transition hover:text-white">
                → Share the Data
              </Link>
              <Link
                href="/act#waitlist"
                className="block text-cyan-300 transition hover:text-cyan-200"
              >
                → Request Your State
              </Link>
            </div>
          </div>

          <div>
            <p className="mb-4 text-xs font-semibold tracking-wider text-gray-400 uppercase">
              In Development
            </p>
            <div className="space-y-2 text-sm text-gray-300">
              <p>→ More States (AZ, TX, MO, WY)</p>
              <p>→ Federal Budget</p>
              <p>→ Healthcare &amp; Medicare</p>
              <p>→ Tax Policy</p>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-center">
          <div className="mb-4 flex items-center justify-center">
            <Image
              src="/brand/logo-horizontal-mono-light.png"
              alt="Catalyst USA"
              width={220}
              height={38}
              className="h-7 w-auto"
            />
          </div>
          <p className="text-sm text-gray-300">
            Catalyst Patriot &middot; A Catalyst USA Project
          </p>
          <p className="mt-2 text-xs text-gray-500">
            Radical Sourcing &middot; Nonpartisan Accountability &middot; Built for Citizens
          </p>
          <p className="mt-2 text-xs text-gray-600">
            &copy; 2025 Catalyst USA. All data sourced from official government records.
          </p>
        </div>
      </div>
    </footer>
  );
}
