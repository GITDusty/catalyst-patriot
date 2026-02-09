import type {
  FloridaRegistrationTrendMeta,
  FloridaRegistrationTrendPoint,
  FloridaRegistrationTrendPointWithTotal,
} from "./types";

export type FloridaTrendViewMode = "absolute" | "indexed" | "share";
export type FloridaTrendSeriesKey =
  | "republican"
  | "democratic"
  | "npa"
  | "minor"
  | "other";

export type FloridaRegistrationTrendChartPoint = {
  date: string;
  republican: number;
  democratic: number;
  npa?: number;
  minor?: number;
  other?: number;
  total: number;
  rawRepublican: number;
  rawDemocratic: number;
  rawNpa: number;
  rawMinor: number;
  rawOther?: number;
};

export type FloridaRegistrationTrendDelta = {
  key: "republican" | "democratic" | "npa" | "other";
  label: string;
  startValue: number;
  endValue: number;
  delta: number;
  percentChange: number;
};

export const floridaRegistrationTrendMeta: FloridaRegistrationTrendMeta = {
  status: "seeded-demo",
  label: "Seeded series (demo)",
  asOfLabel: "Seed data",
  note: "Seeded demo time series; replace with official historical extracts.",
};

const monthWave = [0, 320, 650, 280, 740, 180, 520, 0, 460, 250, 600, 120];

function monthEndIso(year: number, monthOneBased: number): string {
  const lastDay = new Date(Date.UTC(year, monthOneBased, 0));
  return lastDay.toISOString().slice(0, 10);
}

function buildSeededSeries(): FloridaRegistrationTrendPoint[] {
  const points: FloridaRegistrationTrendPoint[] = [];

  const startRep = 5_300_000;
  const startDem = 4_500_000;
  const startNpa = 3_550_000;
  const startMinor = 380_000;

  let index = 0;
  for (let year = 2023; year <= 2025; year += 1) {
    for (let month = 1; month <= 12; month += 1) {
      const rep = Math.round(startRep + index * 5_981 + monthWave[index % 12]);
      const dem = Math.round(startDem - index * 4_846 + monthWave[(index + 3) % 12] * 0.65);
      const npa = Math.round(startNpa + index * 8_499 + monthWave[(index + 6) % 12] * 0.8);
      const minor = Math.round(startMinor + index * 679 + monthWave[(index + 9) % 12] * 0.25);

      points.push({
        date: monthEndIso(year, month),
        republican: rep,
        democratic: dem,
        npa,
        minor,
      });

      index += 1;
    }
  }

  return points;
}

export const floridaRegistrationTrendSeed: FloridaRegistrationTrendPoint[] =
  buildSeededSeries();

export function withFloridaTrendTotals(
  points: FloridaRegistrationTrendPoint[]
): FloridaRegistrationTrendPointWithTotal[] {
  return points.map((point) => ({
    ...point,
    total: point.republican + point.democratic + point.npa + point.minor,
  }));
}

export function mapFloridaTrendTwoParty(
  points: FloridaRegistrationTrendPointWithTotal[]
): FloridaRegistrationTrendChartPoint[] {
  return points.map((point) => ({
    date: point.date,
    republican: point.republican,
    democratic: point.democratic,
    other: point.npa + point.minor,
    total: point.total,
    rawRepublican: point.republican,
    rawDemocratic: point.democratic,
    rawNpa: point.npa,
    rawMinor: point.minor,
    rawOther: point.npa + point.minor,
  }));
}

export function mapFloridaTrendFullComposition(
  points: FloridaRegistrationTrendPointWithTotal[]
): FloridaRegistrationTrendChartPoint[] {
  return points.map((point) => ({
    date: point.date,
    republican: point.republican,
    democratic: point.democratic,
    npa: point.npa,
    minor: point.minor,
    total: point.total,
    rawRepublican: point.republican,
    rawDemocratic: point.democratic,
    rawNpa: point.npa,
    rawMinor: point.minor,
  }));
}

function readSeriesValue(
  point: FloridaRegistrationTrendChartPoint,
  key: FloridaTrendSeriesKey
): number | undefined {
  switch (key) {
    case "republican":
      return point.republican;
    case "democratic":
      return point.democratic;
    case "npa":
      return point.npa;
    case "minor":
      return point.minor;
    case "other":
      return point.other;
    default:
      return undefined;
  }
}

function writeSeriesValue(
  point: FloridaRegistrationTrendChartPoint,
  key: FloridaTrendSeriesKey,
  value: number
): void {
  switch (key) {
    case "republican":
      point.republican = value;
      return;
    case "democratic":
      point.democratic = value;
      return;
    case "npa":
      point.npa = value;
      return;
    case "minor":
      point.minor = value;
      return;
    case "other":
      point.other = value;
      return;
    default:
      return;
  }
}

function hasSeries(point: FloridaRegistrationTrendChartPoint, key: FloridaTrendSeriesKey): boolean {
  return typeof readSeriesValue(point, key) === "number";
}

const floridaTrendSeriesKeys: FloridaTrendSeriesKey[] = [
  "republican",
  "democratic",
  "npa",
  "minor",
  "other",
];

export function toIndexed(
  points: FloridaRegistrationTrendChartPoint[],
  baseKey = "2023-01"
): FloridaRegistrationTrendChartPoint[] {
  if (points.length === 0) {
    return [];
  }

  const basePoint = points.find((point) => point.date.startsWith(baseKey)) ?? points[0];

  return points.map((point) => {
    const indexedPoint: FloridaRegistrationTrendChartPoint = { ...point };

    for (const key of floridaTrendSeriesKeys) {
      if (!hasSeries(point, key)) {
        continue;
      }

      const currentValue = readSeriesValue(point, key) ?? 0;
      const baseValue = readSeriesValue(basePoint, key) ?? 0;
      const indexedValue = baseValue > 0 ? (currentValue / baseValue) * 100 : 100;
      writeSeriesValue(indexedPoint, key, indexedValue);
    }

    return indexedPoint;
  });
}

export function toShare(points: FloridaRegistrationTrendChartPoint[]): FloridaRegistrationTrendChartPoint[] {
  return points.map((point) => {
    const sharePoint: FloridaRegistrationTrendChartPoint = { ...point };
    const total = point.total > 0 ? point.total : 1;

    for (const key of floridaTrendSeriesKeys) {
      if (!hasSeries(point, key)) {
        continue;
      }

      const value = readSeriesValue(point, key) ?? 0;
      writeSeriesValue(sharePoint, key, (value / total) * 100);
    }

    return sharePoint;
  });
}

export function getDomain(
  points: FloridaRegistrationTrendChartPoint[],
  keys: FloridaTrendSeriesKey[],
  paddingPct = 0.06
): [number, number] {
  const values: number[] = [];

  for (const point of points) {
    for (const key of keys) {
      const value = readSeriesValue(point, key);
      if (typeof value === "number" && Number.isFinite(value)) {
        values.push(value);
      }
    }
  }

  if (values.length === 0) {
    return [0, 1];
  }

  const min = Math.min(...values);
  const max = Math.max(...values);

  if (min === max) {
    const flatPadding = Math.max(Math.abs(min) * paddingPct, 1);
    return [min - flatPadding, max + flatPadding];
  }

  const span = max - min;
  const padding = span * paddingPct;
  return [min - padding, max + padding];
}

export function getFloridaTrendDeltaChips(
  points: FloridaRegistrationTrendPointWithTotal[],
  options?: {
    mode?: FloridaTrendViewMode;
    twoPartyView?: boolean;
    baseKey?: string;
  }
): FloridaRegistrationTrendDelta[] {
  if (points.length < 2) {
    return [];
  }

  const mode = options?.mode ?? "absolute";
  const twoPartyView = options?.twoPartyView ?? false;
  const baseKey = options?.baseKey ?? "2023-01";
  const mapped = twoPartyView
    ? mapFloridaTrendTwoParty(points)
    : mapFloridaTrendFullComposition(points);

  const transformed =
    mode === "indexed" ? toIndexed(mapped, baseKey) : mode === "share" ? toShare(mapped) : mapped;

  const first = transformed[0];
  const last = transformed[transformed.length - 1];
  const descriptors: Array<{ key: FloridaRegistrationTrendDelta["key"]; label: string }> = twoPartyView
    ? [
        { key: "republican", label: "Rep" },
        { key: "democratic", label: "Dem" },
        { key: "other", label: "Other" },
      ]
    : [
        { key: "republican", label: "Rep" },
        { key: "democratic", label: "Dem" },
        { key: "npa", label: "NPA" },
      ];

  const buildDelta = (
    key: FloridaRegistrationTrendDelta["key"],
    label: string,
    firstValue: number,
    lastValue: number
  ): FloridaRegistrationTrendDelta => {
    const delta = lastValue - firstValue;
    const percentChange = firstValue === 0 ? 0 : (delta / firstValue) * 100;

    return {
      key,
      label,
      startValue: firstValue,
      endValue: lastValue,
      delta,
      percentChange,
    };
  };

  return descriptors.map((descriptor) => {
    const firstValue = readSeriesValue(first, descriptor.key) ?? 0;
    const lastValue = readSeriesValue(last, descriptor.key) ?? 0;
    return buildDelta(descriptor.key, descriptor.label, firstValue, lastValue);
  });
}

export const floridaRegistrationTrendWithTotals = withFloridaTrendTotals(
  floridaRegistrationTrendSeed
);
