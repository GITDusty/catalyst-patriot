"use client";

import { useState, useEffect, FormEvent } from "react";
import Link from "next/link";

function ScrollIndicator() {
  return (
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 animate-bounce">
      <span className="text-gray-600 text-[10px] tracking-[0.3em] uppercase">
        Scroll
      </span>
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        className="text-gray-600"
      >
        <path
          d="M8 3v10M4 9l4 4 4-4"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

function StarIcon({ size = 48 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="#F59E0B"
      className="mx-auto"
    >
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

export default function ActPage() {
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [issueInterest, setIssueInterest] = useState("");
  const [actions, setActions] = useState({
    share: false,
    representatives: false,
    volunteer: false,
    informed: false,
  });

  // Check localStorage on mount
  useEffect(() => {
    const wasSubmitted = localStorage.getItem("catalyst-waitlist-submitted");
    if (wasSubmitted === "true") {
      setSubmitted(true);
    }
  }, []);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = {
      firstName,
      email,
      location,
      issueInterest,
      actions,
      submittedAt: new Date().toISOString(),
    };
    localStorage.setItem("catalyst-waitlist", JSON.stringify(formData));
    localStorage.setItem("catalyst-waitlist-submitted", "true");
    setSubmitted(true);
  }

  function handleCopy() {
    const shareText =
      "72.9M Americans depend on Social Security — and it's running out of money by 2034. See the verified data:";
    const shareUrl = "https://catalystpatriot.com/social-security";
    navigator.clipboard.writeText(`${shareText} ${shareUrl}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function scrollToWaitlist() {
    const waitlistSection = document.getElementById("waitlist");
    waitlistSection?.scrollIntoView({ behavior: "smooth" });
  }

  function scrollToNextSlide() {
    window.scrollBy({ top: window.innerHeight, behavior: "smooth" });
  }

  const shareText = encodeURIComponent(
    "72.9M Americans depend on Social Security — and it's running out of money by 2034. See the verified data:"
  );
  const shareUrl = encodeURIComponent(
    "https://catalystpatriot.com/social-security"
  );
  const emailSubject = encodeURIComponent(
    "You need to see this — Social Security by the numbers"
  );
  const emailBody = encodeURIComponent(
    "72.9M Americans depend on Social Security — and it's running out of money by 2034. See the verified data: https://catalystpatriot.com/social-security"
  );

  return (
    <div className="bg-black text-white snap-y snap-mandatory h-screen overflow-y-auto">
      {/* Slide 1: Hero */}
      <section className="min-h-screen snap-start relative flex flex-col items-center justify-center px-6">
        {/* Diagonal line motif */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          preserveAspectRatio="none"
          viewBox="0 0 1000 1000"
        >
          <line
            x1="150"
            y1="850"
            x2="850"
            y2="150"
            stroke="white"
            strokeWidth="2"
            opacity="0.08"
          />
          <circle cx="500" cy="500" r="8" fill="#F59E0B" opacity="0.7" />
        </svg>

        <div className="relative z-10 text-center max-w-3xl">
          <p className="text-amber-500 text-xs font-semibold tracking-[0.3em] uppercase mb-6">
            CATALYST USA
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight">
            This isn&apos;t about left or right.
          </h1>
          <p className="mt-4 text-2xl sm:text-3xl text-amber-500 font-bold">
            It&apos;s about what&apos;s right.
          </p>
          <p className="mt-8 text-gray-400 text-lg max-w-xl mx-auto">
            Data doesn&apos;t have an agenda. Numbers don&apos;t lie.
            We&apos;re building a movement of citizens who demand transparency,
            accountability, and action on the issues that affect every American.
          </p>
          <button
            onClick={scrollToNextSlide}
            className="mt-12 border-2 border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-black font-bold px-8 py-4 rounded-xl transition-all text-sm tracking-[0.15em] inline-flex items-center gap-2"
          >
            SEE WHAT WE STAND FOR
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
            >
              <path
                d="M8 3v10M4 9l4 4 4-4"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
        <ScrollIndicator />
      </section>

      {/* Slide 2: Three Pillars */}
      <section className="min-h-screen snap-start relative flex flex-col items-center justify-center px-6">
        <div className="max-w-5xl w-full">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
            What We Stand For
          </h2>

          <div className="grid gap-6 md:grid-cols-3">
            {/* Pillar 1: Radical Transparency */}
            <div className="bg-white/5 border border-white/10 border-t-2 border-t-amber-500 rounded-2xl p-8 hover:bg-white/[0.08] hover:border-white/20 transition-all duration-300">
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#F59E0B"
                strokeWidth="2"
                className="mb-4"
              >
                <rect x="3" y="3" width="7" height="7" />
                <rect x="14" y="3" width="7" height="7" />
                <rect x="14" y="14" width="7" height="7" />
                <rect x="3" y="14" width="7" height="7" />
              </svg>
              <h3 className="text-amber-500 text-xs font-semibold tracking-[0.2em] uppercase mb-3">
                RADICAL TRANSPARENCY
              </h3>
              <p className="text-gray-400 text-sm">
                Every dollar of taxpayer money tracked to its source. Every
                claim verified. No spin. No agenda.
              </p>
            </div>

            {/* Pillar 2: Civic Action */}
            <div className="bg-white/5 border border-white/10 border-t-2 border-t-amber-500 rounded-2xl p-8 hover:bg-white/[0.08] hover:border-white/20 transition-all duration-300">
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#F59E0B"
                strokeWidth="2"
                className="mb-4"
              >
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
              </svg>
              <h3 className="text-amber-500 text-xs font-semibold tracking-[0.2em] uppercase mb-3">
                CIVIC ACTION
              </h3>
              <p className="text-gray-400 text-sm">
                We don&apos;t just show you the problem — we give you tools to
                do something about it.
              </p>
            </div>

            {/* Pillar 3: Nonpartisan Accountability */}
            <div className="bg-white/5 border border-white/10 border-t-2 border-t-amber-500 rounded-2xl p-8 hover:bg-white/[0.08] hover:border-white/20 transition-all duration-300">
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#F59E0B"
                strokeWidth="2"
                className="mb-4"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              <h3 className="text-amber-500 text-xs font-semibold tracking-[0.2em] uppercase mb-3">
                NONPARTISAN ACCOUNTABILITY
              </h3>
              <p className="text-gray-400 text-sm">
                We hold ALL leaders to the same standard: the truth. No party.
                No bias. Just data and facts.
              </p>
            </div>
          </div>
        </div>
        <ScrollIndicator />
      </section>

      {/* Slide 3: Issues Tracker */}
      <section className="min-h-screen snap-start relative flex flex-col items-center justify-center px-6">
        <div className="max-w-5xl w-full">
          <p className="text-sm tracking-widest uppercase text-amber-500 text-center mb-4">
            ISSUES WE&apos;RE INVESTIGATING
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">
            The critical questions we&apos;re answering with verified data.
          </h2>
          <p className="text-gray-500 text-center mb-12 max-w-2xl mx-auto">
            Every issue is backed by source-verified data from government
            agencies, peer-reviewed research, and public records.
          </p>

          <div className="grid gap-6 md:grid-cols-2">
            {/* LIVE Issue 1: Social Security */}
            <Link
              href="/social-security"
              className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/[0.08] hover:border-white/20 transition-all duration-300 block"
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs px-2 py-0.5 rounded-full">
                  LIVE
                </span>
              </div>
              <h3 className="text-xl font-bold mb-3">
                Social Security Crisis
              </h3>
              <p className="text-gray-400 text-sm mb-4">
                72.9M beneficiaries. Trust fund depleted by 2034. Where is YOUR
                money going?
              </p>
              <span className="text-amber-500 text-sm font-medium">
                Explore the Data &rarr;
              </span>
            </Link>

            {/* LIVE Issue 2: State Budget Transparency */}
            <Link
              href="/compare"
              className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/[0.08] hover:border-white/20 transition-all duration-300 block"
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs px-2 py-0.5 rounded-full">
                  LIVE
                </span>
              </div>
              <h3 className="text-xl font-bold mb-3">
                State Budget Transparency
              </h3>
              <p className="text-gray-400 text-sm mb-4">
                Florida & Illinois budgets broken down to the dollar. Every
                source verified.
              </p>
              <span className="text-amber-500 text-sm font-medium">
                Explore the Data &rarr;
              </span>
            </Link>

            {/* COMING SOON Issue 3: Housing Affordability */}
            <button
              onClick={scrollToWaitlist}
              className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/[0.08] hover:border-white/20 transition-all duration-300 text-left"
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs px-2 py-0.5 rounded-full">
                  COMING SOON
                </span>
              </div>
              <h3 className="text-xl font-bold mb-3">
                Housing Affordability Crisis
              </h3>
              <p className="text-gray-400 text-sm mb-4">
                Can a 20-year-old afford a home today vs 30 years ago? The data
                tells the story.
              </p>
              <span className="text-amber-400 text-sm font-medium">
                Get Notified &rarr;
              </span>
            </button>

            {/* COMING SOON Issue 4: Tax Reform */}
            <button
              onClick={scrollToWaitlist}
              className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/[0.08] hover:border-white/20 transition-all duration-300 text-left"
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs px-2 py-0.5 rounded-full">
                  COMING SOON
                </span>
              </div>
              <h3 className="text-xl font-bold mb-3">
                Tax Reform &amp; the Middle Class
              </h3>
              <p className="text-gray-400 text-sm mb-4">
                Where does your tax dollar actually go? A breakdown of federal
                spending, simplified.
              </p>
              <span className="text-amber-400 text-sm font-medium">
                Get Notified &rarr;
              </span>
            </button>
          </div>
        </div>
        <ScrollIndicator />
      </section>

      {/* Slide 4: Impact Counter */}
      <section className="min-h-screen snap-start relative flex flex-col items-center justify-center px-6">
        <div className="max-w-4xl w-full">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
            WHAT WE&apos;VE BUILT
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            <div className="border border-white/5 rounded-xl p-6 text-center">
              <p className="text-5xl font-bold text-amber-500">2</p>
              <p className="text-sm text-gray-400 mt-2">States Analyzed</p>
            </div>
            <div className="border border-white/5 rounded-xl p-6 text-center">
              <p className="text-5xl font-bold text-amber-500">12+</p>
              <p className="text-sm text-gray-400 mt-2">Data Sources</p>
            </div>
            <div className="border border-white/5 rounded-xl p-6 text-center">
              <p className="text-5xl font-bold text-amber-500">21</p>
              <p className="text-sm text-gray-400 mt-2">Verified Sources</p>
            </div>
            <div className="border border-white/5 rounded-xl p-6 text-center">
              <p className="text-5xl font-bold text-amber-500">100%</p>
              <p className="text-sm text-gray-400 mt-2">Open Source</p>
            </div>
          </div>

          <p className="text-gray-500 text-center mb-8">
            Growing weekly. More states and issues launching soon.
          </p>

          <div className="border border-amber-500/20 bg-amber-500/5 rounded-xl p-8 text-center">
            <p className="text-lg text-gray-300 italic">
              &ldquo;The math doesn&apos;t lie. This isn&apos;t a political
              issue — it&apos;s an arithmetic one.&rdquo;
            </p>
            <p className="text-sm text-amber-500 mt-3">— Catalyst USA</p>
          </div>
        </div>
        <ScrollIndicator />
      </section>

      {/* Slide 5: Waitlist Form */}
      <section
        id="waitlist"
        className="min-h-screen snap-start relative flex flex-col items-center justify-center px-6"
      >
        <div className="w-full max-w-md">
          {!submitted ? (
            <>
              <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">
                JOIN THE MOVEMENT
              </h2>
              <p className="text-gray-400 text-center mb-8">
                Be first to know when new data drops, new states launch, and
                new issues go live.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-gray-500 focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/20 focus:outline-none transition-all text-base"
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-gray-500 focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/20 focus:outline-none transition-all text-base"
                />
                <input
                  type="text"
                  placeholder="City, State (optional)"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-gray-500 focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/20 focus:outline-none transition-all text-base"
                />
                <select
                  value={issueInterest}
                  onChange={(e) => setIssueInterest(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/20 focus:outline-none transition-all text-base"
                >
                  <option value="" className="bg-black text-gray-500">
                    What issue matters most to you?
                  </option>
                  <option value="social-security" className="bg-black">
                    Social Security Reform
                  </option>
                  <option value="housing" className="bg-black">
                    Housing Affordability
                  </option>
                  <option value="budget" className="bg-black">
                    Government Spending Transparency
                  </option>
                  <option value="taxes" className="bg-black">
                    Tax Reform
                  </option>
                  <option value="healthcare" className="bg-black">
                    Healthcare Costs
                  </option>
                  <option value="other" className="bg-black">
                    Other
                  </option>
                </select>

                <div className="space-y-3 pt-2">
                  <p className="text-sm text-gray-300">How do you want to help?</p>
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={actions.share}
                      onChange={(e) =>
                        setActions({ ...actions, share: e.target.checked })
                      }
                      className="mt-1 accent-amber-500"
                    />
                    <span className="text-sm text-gray-400">
                      Share data with my network
                    </span>
                  </label>
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={actions.representatives}
                      onChange={(e) =>
                        setActions({ ...actions, representatives: e.target.checked })
                      }
                      className="mt-1 accent-amber-500"
                    />
                    <span className="text-sm text-gray-400">
                      Contact my representatives
                    </span>
                  </label>
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={actions.volunteer}
                      onChange={(e) =>
                        setActions({ ...actions, volunteer: e.target.checked })
                      }
                      className="mt-1 accent-amber-500"
                    />
                    <span className="text-sm text-gray-400">
                      Volunteer to research new states/issues
                    </span>
                  </label>
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={actions.informed}
                      onChange={(e) =>
                        setActions({ ...actions, informed: e.target.checked })
                      }
                      className="mt-1 accent-amber-500"
                    />
                    <span className="text-sm text-gray-400">
                      Just keep me informed
                    </span>
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full bg-amber-500 text-black font-bold py-4 rounded-xl hover:bg-amber-400 transition-all text-lg tracking-wide flex items-center justify-center gap-2"
                >
                  <StarIcon size={20} />
                  JOIN CATALYST USA
                </button>

                <p className="text-gray-600 text-xs text-center pt-2">
                  No spam. No politics. Just data & action.
                </p>
              </form>
            </>
          ) : (
            <div className="text-center space-y-6 py-12">
              <div className="w-16 h-16 bg-amber-500/10 border border-amber-500/30 rounded-full flex items-center justify-center mx-auto">
                <span className="text-amber-500 text-3xl">&#9733;</span>
              </div>
              <h3 className="text-3xl font-bold text-white">
                You&apos;re in.
              </h3>
              <p className="text-gray-400 text-lg max-w-md mx-auto">
                Welcome to Catalyst USA. We&apos;ll reach out when new data
                drops and when it&apos;s time to act.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Link
                  href="/social-security"
                  className="px-6 py-3 border border-amber-500/30 text-amber-500 rounded-xl hover:bg-amber-500/10 transition-all"
                >
                  Explore Social Security Data
                </Link>
                <Link
                  href="/compare"
                  className="px-6 py-3 border border-white/10 text-gray-300 rounded-xl hover:bg-white/5 transition-all"
                >
                  Compare State Budgets
                </Link>
              </div>
            </div>
          )}
        </div>
        <ScrollIndicator />
      </section>

      {/* Slide 6: Share Tools */}
      <section className="min-h-screen snap-start relative flex flex-col items-center justify-center px-6">
        <div className="max-w-2xl w-full">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">
            SPREAD THE WORD
          </h2>
          <p className="text-gray-400 text-center mb-8">
            Every American deserves to see where their money goes. Help us
            reach more people.
          </p>

          <div className="bg-white/5 border border-white/10 rounded-xl p-6 mb-6">
            <p className="text-gray-300 text-sm leading-relaxed">
              72.9M Americans depend on Social Security — and it&apos;s running
              out of money by 2034. See the verified data:
              <br />
              <span className="text-amber-500">
                https://catalystpatriot.com/social-security
              </span>
            </p>
          </div>

          <button
            onClick={handleCopy}
            className="w-full border border-white/10 rounded-xl px-6 py-3 text-gray-300 hover:bg-white/5 hover:border-white/20 transition-all mb-6 flex items-center justify-center gap-2"
          >
            {copied ? (
              <>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="2"
                >
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                <span className="text-emerald-400">Copied!</span>
              </>
            ) : (
              <>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                </svg>
                Copy to Clipboard
              </>
            )}
          </button>

          <p className="text-gray-500 text-sm mb-3">Share on:</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <a
              href={`https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-white/10 rounded-xl px-6 py-3 text-gray-300 hover:bg-white/5 hover:border-white/20 transition-all text-center text-sm"
            >
              Twitter/X
            </a>
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-white/10 rounded-xl px-6 py-3 text-gray-300 hover:bg-white/5 hover:border-white/20 transition-all text-center text-sm"
            >
              Facebook
            </a>
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-white/10 rounded-xl px-6 py-3 text-gray-300 hover:bg-white/5 hover:border-white/20 transition-all text-center text-sm"
            >
              LinkedIn
            </a>
            <a
              href={`mailto:?subject=${emailSubject}&body=${emailBody}`}
              className="border border-white/10 rounded-xl px-6 py-3 text-gray-300 hover:bg-white/5 hover:border-white/20 transition-all text-center text-sm"
            >
              Email
            </a>
          </div>
        </div>
        <ScrollIndicator />
      </section>

      {/* Slide 7: Footer */}
      <section className="min-h-screen snap-start relative flex flex-col items-center justify-center px-6">
        <div className="max-w-4xl w-full text-center">
          <StarIcon size={32} />
          <p className="text-amber-500 text-xs font-semibold tracking-[0.3em] uppercase mt-4 mb-2">
            CATALYST USA
          </p>
          <p className="text-gray-500 text-sm mb-12 max-w-2xl mx-auto">
            Radical Sourcing — Source-verified civic intelligence for every
            American who gives a damn.
          </p>

          <div className="w-full h-px bg-white/10 mb-12" />

          <div className="mb-12">
            <h3 className="text-amber-500 text-xs font-semibold tracking-[0.2em] uppercase mb-6">
              EXPLORE THE DATA
            </h3>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/florida"
                className="text-gray-400 hover:text-amber-500 transition-colors text-sm"
              >
                Florida Budget
              </Link>
              <Link
                href="/illinois"
                className="text-gray-400 hover:text-amber-500 transition-colors text-sm"
              >
                Illinois Budget
              </Link>
              <Link
                href="/compare"
                className="text-gray-400 hover:text-amber-500 transition-colors text-sm"
              >
                Compare States
              </Link>
              <Link
                href="/social-security"
                className="text-gray-400 hover:text-amber-500 transition-colors text-sm"
              >
                Social Security Crisis
              </Link>
            </div>
          </div>

          <div className="mb-12">
            <h3 className="text-amber-500 text-xs font-semibold tracking-[0.2em] uppercase mb-6">
              COMING SOON
            </h3>
            <div className="flex flex-wrap justify-center gap-4 text-gray-600 text-sm">
              <span>Housing Affordability</span>
              <span>Tax Reform</span>
              <span>Arizona</span>
              <span>Texas</span>
              <span>Missouri</span>
              <span>Wyoming</span>
            </div>
          </div>

          <div className="w-full h-px bg-white/10 mb-8" />

          <div className="text-gray-600 text-xs space-y-2">
            <p>CatalystPatriot.com · A Catalyst USA Project</p>
            <p>© 2025 Catalyst USA</p>
          </div>
        </div>
      </section>
    </div>
  );
}
