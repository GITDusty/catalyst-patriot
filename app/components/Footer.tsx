import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black/30 backdrop-blur-sm">
      <div className="max-w-5xl mx-auto px-8 py-10">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
          <div className="space-y-3">
            <Link href="/" className="inline-flex items-center" aria-label="Catalyst Patriot">
              <Image
                src="/brand/logo-horizontal-mono-light.png"
                alt="Catalyst Patriot"
                width={320}
                height={56}
                className="h-6 md:h-7 w-auto"
              />
            </Link>
            <p className="text-white text-sm md:text-base">
              Catalyst Patriot{" "}
              <span className="text-gray-500">&middot; A Catalyst USA Project</span>
            </p>
            <p className="text-gray-500 text-sm mt-1">
              Radical Sourcing &mdash; Source-verified civic intelligence
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-8 text-sm">
            <div>
              <p className="text-gray-400 font-semibold mb-2 text-xs uppercase tracking-wider">
                State Budgets
              </p>
              <div className="flex gap-4">
                <Link
                  href="/florida"
                  className="text-gray-500 hover:text-white transition"
                >
                  Florida
                </Link>
                <Link
                  href="/illinois"
                  className="text-gray-500 hover:text-white transition"
                >
                  Illinois
                </Link>
                <Link
                  href="/compare"
                  className="text-gray-500 hover:text-white transition"
                >
                  Compare
                </Link>
              </div>
            </div>

            <div>
              <p className="text-gray-400 font-semibold mb-2 text-xs uppercase tracking-wider">
                National Issues
              </p>
              <div className="flex gap-4">
                <Link
                  href="/social-security"
                  className="text-gray-500 hover:text-white transition"
                >
                  Social Security
                </Link>
                <Link
                  href="/housing"
                  className="text-gray-500 hover:text-white transition"
                >
                  Housing
                  <span className="text-gray-700 text-xs ml-1">
                    (Coming Soon)
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white/5 text-center">
          <p className="text-gray-600 text-xs">
            &copy; 2025 Catalyst USA &middot; CatalystPatriot.com
          </p>
        </div>
      </div>
    </footer>
  );
}
