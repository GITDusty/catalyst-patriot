export type DatasetMeta = {
  id: string;
  name: string;
  publisher: string;
  asOfDate: string;
  lastChecked: string;
  url: string;
  notes: string;
};

export type FloridaPartyTotals = {
  republican: number;
  democratic: number;
  npa: number;
  minor: number;
  total: number;
};

export type FloridaCountyRegistration = {
  county: string;
  republican: number;
  democratic: number;
  npa: number;
  minor: number;
  total: number;
  repShare: number;
  demShare: number;
  npaShare: number;
  minorShare: number;
};

export type FloridaRegistration = {
  totals: FloridaPartyTotals;
  byCounty: FloridaCountyRegistration[];
  sourceMeta: {
    partyTotals: DatasetMeta;
    countyBreakdown: DatasetMeta;
  };
  notes: string[];
  lastRefreshed: string;
  usedFallback: boolean;
};

export type NationalDemographicRow = {
  group: string;
  democratic: number;
  republican: number;
  independent: number;
  total: number;
};

export type NationalDemographicDimension = "gender" | "age";

export type NationalPartyId = {
  sourceMeta: {
    pewFactSheet: DatasetMeta;
    pewGender: DatasetMeta;
    gallupPartyId: DatasetMeta;
  };
  byGender: NationalDemographicRow[];
  byAge: NationalDemographicRow[];
  methodNotes: string[];
  lastRefreshed: string;
  usedFallback: boolean;
};

export type FloridaCountySortKey =
  | "republican"
  | "democratic"
  | "npa"
  | "total"
  | "repShare"
  | "demShare";

export type FloridaApiResponse = {
  data: FloridaRegistration;
  meta: {
    lastRefreshed: string;
    usedFallback: boolean;
    diagnostics: string[];
  };
};

export type NationalApiResponse = {
  data: NationalPartyId;
  meta: {
    lastRefreshed: string;
    usedFallback: boolean;
    diagnostics: string[];
  };
};

export type ApiError = {
  error: {
    code: string;
    message: string;
  };
};
