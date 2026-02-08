import {
  FLORIDA_SOURCE_BASELINES,
  VOTER_STATS_METHOD_NOTE,
} from "./sources";
import type {
  DatasetMeta,
  FloridaCountyRegistration,
  FloridaCountySortKey,
  FloridaPartyTotals,
  FloridaRegistration,
} from "./types";

const FLORIDA_PARTY_FALLBACK_TEXT = `
Data as of December 31, 2025.
Year Republican Democratic Minor No Party Affiliation Total
2025 5,509,354 4,330,372 403,778 3,847,473 14,091,977
`;

const FLORIDA_COUNTY_FALLBACK_TEXT = `
Data as of December 31, 2025
County Republican Democratic Minor No Party Affiliation Total
ALACHUA 47,605 73,487 4,274 52,342 177,708
BAKER 7,867 2,585 164 1,939 12,555
BAY 67,370 32,971 2,396 36,458 139,195
BRADFORD 8,724 2,695 217 2,205 13,841
BREVARD 228,217 146,168 11,918 145,779 532,082
BROWARD 284,358 605,495 38,056 283,128 1,211,037
CALHOUN 4,413 1,913 197 1,630 8,153
CHARLOTTE 67,435 39,374 2,678 34,757 144,244
CITRUS 51,286 30,240 2,182 25,031 108,739
CLAY 84,038 35,430 2,502 45,422 167,392
COLLIER 120,542 89,523 6,594 82,476 299,135
COLUMBIA 24,697 10,659 850 8,862 45,068
DESOTO 8,469 8,478 1,169 7,286 25,402
DIXIE 6,766 2,356 193 1,565 10,880
DUVAL 287,878 285,841 22,372 207,689 803,780
ESCAMBIA 101,415 68,631 5,823 49,378 225,247
FLAGLER 43,026 27,684 2,111 26,393 99,214
FRANKLIN 3,623 1,617 157 1,304 6,701
GADSDEN 8,993 26,843 1,533 7,580 44,949
GILCHRIST 6,861 2,502 176 1,961 11,500
GLADES 4,224 1,825 214 1,601 7,864
GULF 5,972 3,042 198 2,447 11,659
HAMILTON 3,468 3,367 194 1,878 8,907
HARDEE 8,005 6,260 716 6,088 21,069
HENDRY 9,527 8,063 950 7,145 25,685
HERNANDO 62,208 36,586 3,479 31,658 133,931
HIGHLANDS 31,073 18,690 1,709 16,552 68,024
HILLSBOROUGH 322,869 309,029 27,276 245,424 904,598
HOLMES 7,721 1,938 182 1,731 11,572
INDIAN RIVER 58,134 43,383 3,248 30,511 135,276
JACKSON 15,104 5,647 510 5,056 26,317
JEFFERSON 2,698 4,917 286 1,993 9,894
LAFAYETTE 3,266 988 65 849 5,168
LAKE 150,193 92,225 7,199 90,886 340,503
LEE 252,995 154,595 13,403 159,100 580,093
LEON 67,269 112,236 8,174 67,697 255,376
LEVY 15,632 6,725 448 5,233 28,038
LIBERTY 2,749 1,226 72 918 4,965
MADISON 4,502 5,435 395 2,356 12,688
MANATEE 141,828 108,104 8,213 90,596 348,741
MARION 137,577 76,165 5,587 79,729 299,058
MARTIN 59,322 34,705 2,765 37,339 134,131
MIAMI-DADE 444,220 580,642 37,186 420,778 1,482,826
MONROE 22,610 20,575 2,018 19,047 64,250
NASSAU 39,960 16,818 1,186 20,464 78,428
OKALOOSA 91,647 45,538 3,591 45,886 186,662
OKEECHOBEE 10,304 5,262 501 4,716 20,783
ORANGE 229,523 343,411 26,214 308,352 907,500
OSCEOLA 86,102 111,173 10,981 95,702 303,958
PALM BEACH 290,348 363,515 30,397 283,519 967,779
PASCO 210,917 125,804 9,966 118,773 465,460
PINELLAS 240,777 233,412 18,149 179,365 671,703
POLK 218,489 161,289 12,694 140,995 533,467
PUTNAM 26,254 11,906 944 10,445 49,549
ST. JOHNS 123,090 68,212 4,883 72,317 268,502
ST. LUCIE 95,775 95,768 8,369 82,535 282,447
SANTA ROSA 82,231 35,823 2,654 32,950 153,658
SARASOTA 148,155 112,037 8,188 87,040 355,420
SEMINOLE 123,274 116,163 9,450 92,668 341,555
SUMTER 63,338 37,584 2,851 25,177 128,950
SUWANNEE 14,184 7,558 450 5,412 27,604
TAYLOR 8,794 3,615 224 2,339 14,972
UNION 5,655 1,506 102 1,066 8,329
VOLUSIA 176,412 145,670 10,714 109,766 442,562
WAKULLA 13,091 6,678 493 4,971 25,233
WALTON 31,016 11,912 900 12,539 56,367
WASHINGTON 9,596 3,215 227 2,595 15,633
TOTALS 5,509,354 4,330,372 403,778 3,847,473 14,091,977
`;

type ParsedFloridaPayload = {
  totals: FloridaPartyTotals;
  counties: FloridaCountyRegistration[];
  asOfDate: string;
};

export type FloridaCompositionDatum = {
  key: "republican" | "democratic" | "npa" | "minor" | "other";
  label: string;
  value: number;
  percent: number;
  color: string;
};

const PARTY_COLORS: Record<FloridaCompositionDatum["key"], string> = {
  republican: "#1f3a5f",
  democratic: "#5f7ea6",
  npa: "#a9b7cc",
  minor: "#b24c57",
  other: "#8f9bb0",
};

function decodeHtmlEntities(value: string): string {
  return value
    .replaceAll("&nbsp;", " ")
    .replaceAll("&amp;", "&")
    .replaceAll("&#8217;", "'")
    .replaceAll("&quot;", '"')
    .replaceAll("&#39;", "'");
}

function flattenHtmlToText(content: string): string {
  return decodeHtmlEntities(
    content
      .replaceAll(/<br\s*\/?/gi, "\n")
      .replaceAll(/<\/tr>/gi, "\n")
      .replaceAll(/<\/p>/gi, "\n")
      .replaceAll(/<\/li>/gi, "\n")
      .replaceAll(/<[^>]+>/g, " ")
  )
    .replaceAll(/\r/g, "\n")
    .replaceAll(/\u00A0/g, " ");
}

function normalizeLine(line: string): string {
  return line.replaceAll(/\s+/g, " ").trim();
}

function parseIntegerToken(token: string): number {
  return Number.parseInt(token.replaceAll(/[^\d]/g, ""), 10);
}

function toIsoDate(raw: string | null | undefined): string {
  if (!raw) {
    return "Unknown";
  }

  const text = normalizeLine(raw.replaceAll(".", ""));
  const parsed = new Date(text);
  if (Number.isNaN(parsed.valueOf())) {
    return text;
  }

  const year = parsed.getUTCFullYear();
  const month = `${parsed.getUTCMonth() + 1}`.padStart(2, "0");
  const day = `${parsed.getUTCDate()}`.padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function extractAsOfDate(content: string): string {
  const text = flattenHtmlToText(content);

  const monthDate = text.match(
    /Data\s+as\s+of\s*:?\s*([A-Za-z]+\s+\d{1,2},\s*\d{4})/i
  );
  if (monthDate?.[1]) {
    return toIsoDate(monthDate[1]);
  }

  const numericDate = text.match(
    /Data\s+as\s+of\s*:?\s*(\d{1,2}\/\d{1,2}\/\d{2,4})/i
  );
  if (numericDate?.[1]) {
    return toIsoDate(numericDate[1]);
  }

  return "Unknown";
}

function formatCountyName(rawCounty: string): string {
  return rawCounty
    .toLowerCase()
    .replaceAll(/\b\w/g, (letter) => letter.toUpperCase())
    .replace("St. ", "St. ");
}

function computeShares(
  republican: number,
  democratic: number,
  minor: number,
  npa: number,
  total: number
): Pick<FloridaCountyRegistration, "repShare" | "demShare" | "minorShare" | "npaShare"> {
  if (total <= 0) {
    return {
      repShare: 0,
      demShare: 0,
      npaShare: 0,
      minorShare: 0,
    };
  }

  return {
    repShare: republican / total,
    demShare: democratic / total,
    npaShare: npa / total,
    minorShare: minor / total,
  };
}

function parsePartyTotalsFromText(content: string): FloridaPartyTotals | null {
  const text = flattenHtmlToText(content);
  const lines = text
    .split("\n")
    .map(normalizeLine)
    .filter((line) => line.length > 0);

  const yearLineCandidates = lines
    .filter((line) => /^20\d{2}\s+[\d,]+\s+[\d,]+\s+[\d,]+\s+[\d,]+\s+[\d,]+$/.test(line))
    .sort((a, b) => parseIntegerToken(b.split(" ")[0]) - parseIntegerToken(a.split(" ")[0]));

  if (yearLineCandidates.length > 0) {
    const tokens = yearLineCandidates[0].match(/[\d,]+/g);
    if (tokens && tokens.length >= 6) {
      const republican = parseIntegerToken(tokens[1]);
      const democratic = parseIntegerToken(tokens[2]);
      const minor = parseIntegerToken(tokens[3]);
      const npa = parseIntegerToken(tokens[4]);
      const total = parseIntegerToken(tokens[5]);

      return {
        republican,
        democratic,
        npa,
        minor,
        total,
      };
    }
  }

  const totalsLine = lines.find((line) => /^TOTALS\s+[\d,]+\s+[\d,]+\s+[\d,]+\s+[\d,]+\s+[\d,]+$/i.test(line));
  if (!totalsLine) {
    return null;
  }

  const tokens = totalsLine.match(/[\d,]+/g);
  if (!tokens || tokens.length < 5) {
    return null;
  }

  return {
    republican: parseIntegerToken(tokens[0]),
    democratic: parseIntegerToken(tokens[1]),
    minor: parseIntegerToken(tokens[2]),
    npa: parseIntegerToken(tokens[3]),
    total: parseIntegerToken(tokens[4]),
  };
}

function parseCountyRowsFromText(content: string): FloridaCountyRegistration[] {
  const text = flattenHtmlToText(content);
  const lines = text
    .split("\n")
    .map(normalizeLine)
    .filter((line) => line.length > 0);

  const rows: FloridaCountyRegistration[] = [];
  for (const line of lines) {
    const matched =
      line.match(
        /^([A-Z][A-Z.\-\s]+?)\s+([\d,]+)\s+([\d,]+)\s+([\d,]+)\s+([\d,]+)\s+([\d,]+)$/
      ) ?? null;

    if (!matched) {
      continue;
    }

    const countyRaw = normalizeLine(matched[1]);
    if (countyRaw === "TOTALS" || countyRaw === "COUNTY") {
      continue;
    }

    const republican = parseIntegerToken(matched[2]);
    const democratic = parseIntegerToken(matched[3]);
    const minor = parseIntegerToken(matched[4]);
    const npa = parseIntegerToken(matched[5]);
    const total = parseIntegerToken(matched[6]);

    const shares = computeShares(republican, democratic, minor, npa, total);
    rows.push({
      county: formatCountyName(countyRaw),
      republican,
      democratic,
      minor,
      npa,
      total,
      ...shares,
    });
  }

  return rows.sort((left, right) => right.total - left.total);
}

function parseFloridaPayload(
  partyContent: string,
  countyContent: string
): ParsedFloridaPayload | null {
  const totals = parsePartyTotalsFromText(partyContent);
  const counties = parseCountyRowsFromText(countyContent);

  if (!totals || counties.length === 0) {
    return null;
  }

  const partyAsOf = extractAsOfDate(partyContent);
  const countyAsOf = extractAsOfDate(countyContent);
  const asOfDate = partyAsOf !== "Unknown" ? partyAsOf : countyAsOf;

  return {
    totals,
    counties,
    asOfDate,
  };
}

function mergeSourceMeta(lastChecked: string, asOfDate: string): {
  partyTotals: DatasetMeta;
  countyBreakdown: DatasetMeta;
} {
  return {
    partyTotals: {
      ...FLORIDA_SOURCE_BASELINES.partyTotals,
      asOfDate,
      lastChecked,
    },
    countyBreakdown: {
      ...FLORIDA_SOURCE_BASELINES.countyBreakdown,
      asOfDate,
      lastChecked,
    },
  };
}

export function buildFloridaRegistration(
  partyContent: string,
  countyContent: string,
  options?: {
    lastChecked?: string;
    usedFallback?: boolean;
    diagnostics?: string[];
  }
): FloridaRegistration | null {
  const parsed = parseFloridaPayload(partyContent, countyContent);
  if (!parsed) {
    return null;
  }

  const lastChecked = options?.lastChecked ?? new Date().toISOString();

  return {
    totals: parsed.totals,
    byCounty: parsed.counties,
    sourceMeta: mergeSourceMeta(lastChecked, parsed.asOfDate),
    notes: [
      "Florida registration counts are official administrative records from the Florida Division of Elections.",
      VOTER_STATS_METHOD_NOTE,
      ...(options?.diagnostics ?? []),
    ],
    lastRefreshed: lastChecked,
    usedFallback: options?.usedFallback ?? false,
  };
}

export const floridaFallbackRegistration: FloridaRegistration =
  buildFloridaRegistration(FLORIDA_PARTY_FALLBACK_TEXT, FLORIDA_COUNTY_FALLBACK_TEXT, {
    lastChecked: "2026-02-08T00:00:00.000Z",
    usedFallback: true,
    diagnostics: ["Loaded bundled Florida fallback snapshot."],
  }) ?? {
    totals: {
      republican: 5_509_354,
      democratic: 4_330_372,
      minor: 403_778,
      npa: 3_847_473,
      total: 14_091_977,
    },
    byCounty: [],
    sourceMeta: mergeSourceMeta("2026-02-08T00:00:00.000Z", "2025-12-31"),
    notes: [
      "Fallback snapshot could not be parsed; totals are hardcoded from Florida DOS report.",
      VOTER_STATS_METHOD_NOTE,
    ],
    lastRefreshed: "2026-02-08T00:00:00.000Z",
    usedFallback: true,
  };

export function buildFloridaCompositionData(
  registration: Pick<FloridaRegistration, "totals">,
  twoPartyView: boolean
): FloridaCompositionDatum[] {
  const { totals } = registration;

  if (totals.total <= 0) {
    return [];
  }

  if (twoPartyView) {
    const other = totals.npa + totals.minor;
    const rows: Array<{ key: FloridaCompositionDatum["key"]; label: string; value: number }> = [
      { key: "republican", label: "Republican", value: totals.republican },
      { key: "democratic", label: "Democratic", value: totals.democratic },
      { key: "other", label: "Other (NPA + Minor)", value: other },
    ];

    return rows.map((row) => ({
      ...row,
      percent: row.value / totals.total,
      color: PARTY_COLORS[row.key],
    }));
  }

  const rows: Array<{ key: FloridaCompositionDatum["key"]; label: string; value: number }> = [
    { key: "republican", label: "Republican", value: totals.republican },
    { key: "democratic", label: "Democratic", value: totals.democratic },
    { key: "npa", label: "No Party Affiliation", value: totals.npa },
    { key: "minor", label: "Minor Parties", value: totals.minor },
  ];

  return rows.map((row) => ({
    ...row,
    percent: row.value / totals.total,
    color: PARTY_COLORS[row.key],
  }));
}

export function getCountyRanking(
  counties: FloridaCountyRegistration[],
  options: {
    query: string;
    sortKey: FloridaCountySortKey;
    viewAll: boolean;
  }
): FloridaCountyRegistration[] {
  const normalizedQuery = options.query.trim().toLowerCase();

  const filtered = normalizedQuery
    ? counties.filter((row) => row.county.toLowerCase().includes(normalizedQuery))
    : counties;

  const sorted = [...filtered].sort((left, right) => {
    return right[options.sortKey] - left[options.sortKey];
  });

  if (options.viewAll || normalizedQuery.length > 0) {
    return sorted;
  }

  return sorted.slice(0, 10);
}

/**
 * Unit-ish parser checks for local validation.
 * Run this manually from a script or REPL to sanity-check parser behavior.
 */
export function runFloridaParserSelfCheck(): void {
  const sampleParty = `Data as of January 31, 2026\n2026 1,000 900 100 500 2,500`;
  const parsedTotals = parsePartyTotalsFromText(sampleParty);

  console.assert(parsedTotals?.republican === 1000, "Expected republican count to parse");
  console.assert(parsedTotals?.npa === 500, "Expected NPA count to parse");

  const sampleCounty = `
    Data as of January 31, 2026
    County Republican Democratic Minor No Party Affiliation Total
    SAMPLE 100 90 10 40 240
    TOTALS 100 90 10 40 240
  `;

  const parsedCounties = parseCountyRowsFromText(sampleCounty);
  console.assert(parsedCounties.length === 1, "Expected one county row");
  console.assert(parsedCounties[0]?.total === 240, "Expected county total to parse");
}
