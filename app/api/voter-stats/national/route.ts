import { NextResponse } from "next/server";

import {
  GALLUP_PARTY_AFFILIATION_URL,
  PEW_FACT_SHEET_URL,
  PEW_GENDER_URL,
} from "@/app/data/voter-stats/sources";
import { buildNationalSnapshot } from "@/app/data/voter-stats/national";
import type { NationalApiResponse } from "@/app/data/voter-stats/types";

export const revalidate = 86400;

async function checkSource(url: string): Promise<void> {
  const response = await fetch(url, {
    next: { revalidate },
    headers: {
      "user-agent": "CatalystPatriot Data Bot/1.0",
      accept: "text/html, text/plain;q=0.9",
    },
  });

  if (!response.ok) {
    throw new Error(`Source check failed (${response.status}) for ${url}`);
  }
}

export async function GET() {
  const lastChecked = new Date().toISOString();
  const diagnostics: string[] = [];

  const sourceChecks = await Promise.allSettled([
    checkSource(PEW_FACT_SHEET_URL),
    checkSource(PEW_GENDER_URL),
    checkSource(GALLUP_PARTY_AFFILIATION_URL),
  ]);

  sourceChecks.forEach((result, index) => {
    if (result.status === "fulfilled") {
      return;
    }

    const sourceLabel =
      index === 0
        ? "Pew fact sheet"
        : index === 1
          ? "Pew gender dataset"
          : "Gallup party affiliation";

    diagnostics.push(`${sourceLabel}: remote check failed, serving curated snapshot.`);
  });

  const usedFallback = diagnostics.length > 0;

  const data = buildNationalSnapshot({
    lastChecked,
    diagnostics,
    usedFallback,
  });

  const response: NationalApiResponse = {
    data,
    meta: {
      lastRefreshed: data.lastRefreshed,
      usedFallback: data.usedFallback,
      diagnostics,
    },
  };

  return NextResponse.json(response);
}
