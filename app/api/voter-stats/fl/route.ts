import { NextResponse } from "next/server";

import {
  FLORIDA_COUNTY_PARTY_URL,
  FLORIDA_PARTY_AFFILIATION_URL,
} from "@/app/data/voter-stats/sources";
import {
  buildFloridaRegistration,
  floridaFallbackRegistration,
} from "@/app/data/voter-stats/florida";
import type { FloridaApiResponse } from "@/app/data/voter-stats/types";

export const revalidate = 86400;

async function fetchTextFromUrl(url: string): Promise<string> {
  const response = await fetch(url, {
    next: { revalidate },
    headers: {
      "user-agent": "CatalystPatriot Data Bot/1.0",
      accept: "text/html, text/plain;q=0.9",
    },
  });

  if (!response.ok) {
    throw new Error(`Fetch failed (${response.status}) for ${url}`);
  }

  return response.text();
}

async function fetchWithMirror(url: string, diagnostics: string[], label: string): Promise<string> {
  try {
    return await fetchTextFromUrl(url);
  } catch (primaryError) {
    diagnostics.push(`${label}: primary source fetch failed, trying mirror proxy.`);

    const normalized = url.replace(/^https?:\/\//, "");
    const mirrorUrl = `https://r.jina.ai/http://${normalized}`;

    try {
      return await fetchTextFromUrl(mirrorUrl);
    } catch (mirrorError) {
      diagnostics.push(`${label}: mirror fetch failed.`);
      throw mirrorError instanceof Error ? mirrorError : primaryError;
    }
  }
}

export async function GET() {
  const lastChecked = new Date().toISOString();
  const diagnostics: string[] = [];

  try {
    const [partyContent, countyContent] = await Promise.all([
      fetchWithMirror(FLORIDA_PARTY_AFFILIATION_URL, diagnostics, "party totals"),
      fetchWithMirror(FLORIDA_COUNTY_PARTY_URL, diagnostics, "county table"),
    ]);

    const parsed = buildFloridaRegistration(partyContent, countyContent, {
      lastChecked,
      usedFallback: false,
      diagnostics,
    });

    if (parsed) {
      const response: FloridaApiResponse = {
        data: parsed,
        meta: {
          lastRefreshed: parsed.lastRefreshed,
          usedFallback: false,
          diagnostics,
        },
      };

      return NextResponse.json(response);
    }

    diagnostics.push("Parser returned no rows; serving fallback snapshot.");
    const fallback = {
      ...floridaFallbackRegistration,
      lastRefreshed: lastChecked,
      sourceMeta: {
        partyTotals: {
          ...floridaFallbackRegistration.sourceMeta.partyTotals,
          lastChecked,
        },
        countyBreakdown: {
          ...floridaFallbackRegistration.sourceMeta.countyBreakdown,
          lastChecked,
        },
      },
      notes: [...floridaFallbackRegistration.notes, ...diagnostics],
    };

    const response: FloridaApiResponse = {
      data: fallback,
      meta: {
        lastRefreshed: fallback.lastRefreshed,
        usedFallback: true,
        diagnostics,
      },
    };

    return NextResponse.json(response);
  } catch {
    const fallback = {
      ...floridaFallbackRegistration,
      lastRefreshed: lastChecked,
      sourceMeta: {
        partyTotals: {
          ...floridaFallbackRegistration.sourceMeta.partyTotals,
          lastChecked,
        },
        countyBreakdown: {
          ...floridaFallbackRegistration.sourceMeta.countyBreakdown,
          lastChecked,
        },
      },
      notes: [
        ...floridaFallbackRegistration.notes,
        "Remote Florida sources unavailable; returned last-known-good bundled snapshot.",
      ],
    };

    const response: FloridaApiResponse = {
      data: fallback,
      meta: {
        lastRefreshed: fallback.lastRefreshed,
        usedFallback: true,
        diagnostics: [
          "Remote Florida source fetch failed. Served fallback snapshot.",
        ],
      },
    };

    return NextResponse.json(response);
  }
}
