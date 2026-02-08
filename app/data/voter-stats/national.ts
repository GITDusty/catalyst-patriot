import { NATIONAL_SOURCE_BASELINES, VOTER_STATS_METHOD_NOTE } from "./sources";
import type {
  NationalDemographicDimension,
  NationalDemographicRow,
  NationalPartyId,
} from "./types";

export type NationalChartDatum = {
  group: string;
  democratic: number;
  republican: number;
  independent?: number;
};

const PEW_GENDER_SNAPSHOT: NationalDemographicRow[] = [
  {
    group: "Men",
    democratic: 46,
    republican: 52,
    independent: 2,
    total: 100,
  },
  {
    group: "Women",
    democratic: 51,
    republican: 44,
    independent: 5,
    total: 100,
  },
];

const PEW_AGE_SNAPSHOT: NationalDemographicRow[] = [
  {
    group: "18-29",
    democratic: 65,
    republican: 33,
    independent: 2,
    total: 100,
  },
  {
    group: "30-49",
    democratic: 53,
    republican: 45,
    independent: 2,
    total: 100,
  },
  {
    group: "50-64",
    democratic: 45,
    republican: 52,
    independent: 3,
    total: 100,
  },
  {
    group: "65+",
    democratic: 43,
    republican: 54,
    independent: 3,
    total: 100,
  },
];

export const nationalFallbackPartyId: NationalPartyId = {
  sourceMeta: {
    pewFactSheet: {
      ...NATIONAL_SOURCE_BASELINES.pewFactSheet,
      lastChecked: "2026-02-08T00:00:00.000Z",
    },
    pewGender: {
      ...NATIONAL_SOURCE_BASELINES.pewGender,
      lastChecked: "2026-02-08T00:00:00.000Z",
    },
    gallupPartyId: {
      ...NATIONAL_SOURCE_BASELINES.gallupPartyId,
      lastChecked: "2026-02-08T00:00:00.000Z",
    },
  },
  byGender: PEW_GENDER_SNAPSHOT,
  byAge: PEW_AGE_SNAPSHOT,
  methodNotes: [
    "National values are survey percentages and should not be interpreted as official voter registration counts.",
    "Pew values are identify/lean snapshots for registered voters; Gallup tracks self-identification trends among U.S. adults.",
    "Independent percentages represent respondents who do not identify or lean to either major party in this curated snapshot.",
    VOTER_STATS_METHOD_NOTE,
  ],
  lastRefreshed: "2026-02-08T00:00:00.000Z",
  usedFallback: true,
};

export function buildNationalSnapshot(options?: {
  lastChecked?: string;
  diagnostics?: string[];
  usedFallback?: boolean;
}): NationalPartyId {
  const lastChecked = options?.lastChecked ?? new Date().toISOString();

  return {
    ...nationalFallbackPartyId,
    sourceMeta: {
      pewFactSheet: {
        ...nationalFallbackPartyId.sourceMeta.pewFactSheet,
        lastChecked,
      },
      pewGender: {
        ...nationalFallbackPartyId.sourceMeta.pewGender,
        lastChecked,
      },
      gallupPartyId: {
        ...nationalFallbackPartyId.sourceMeta.gallupPartyId,
        lastChecked,
      },
    },
    methodNotes: [
      ...nationalFallbackPartyId.methodNotes,
      ...(options?.diagnostics ?? []),
    ],
    lastRefreshed: lastChecked,
    usedFallback: options?.usedFallback ?? true,
  };
}

export function getNationalRows(
  national: NationalPartyId,
  dimension: NationalDemographicDimension
): NationalDemographicRow[] {
  if (dimension === "age") {
    return national.byAge;
  }

  return national.byGender;
}

export function buildNationalChartData(
  rows: NationalDemographicRow[],
  includeIndependent: boolean
): NationalChartDatum[] {
  if (!includeIndependent) {
    return rows.map((row) => ({
      group: row.group,
      democratic: row.democratic,
      republican: row.republican,
    }));
  }

  return rows.map((row) => ({
    group: row.group,
    democratic: row.democratic,
    republican: row.republican,
    independent: row.independent,
  }));
}
