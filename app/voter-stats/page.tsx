import type { Metadata } from "next";

import VoterStatsDashboard from "@/app/components/voter-stats/VoterStatsDashboard";

export const metadata: Metadata = {
  title: "Voter Statistics",
  description:
    "Official Florida registration data and national survey party-identification snapshots, with transparent methodology.",
};

export default function VoterStatsPage() {
  return (
    <main className="page-shell min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <section className="mx-auto w-[min(100%-1.5rem,80rem)] py-8 sm:py-10">
        <VoterStatsDashboard />
      </section>
    </main>
  );
}
