import type { DatasetMeta } from "./types";

export const FLORIDA_PARTY_AFFILIATION_URL =
  "https://dos.fl.gov/elections/data-statistics/voter-registration-statistics/voter-registration-by-party-affiliation/";

export const FLORIDA_COUNTY_PARTY_URL =
  "https://dos.fl.gov/elections/data-statistics/voter-registration-statistics/voter-registration-by-county-and-party/";

export const PEW_FACT_SHEET_URL =
  "https://www.pewresearch.org/politics/2024/04/09/the-partisanship-and-ideology-of-american-voters/";

export const PEW_GENDER_URL =
  "https://www.pewresearch.org/politics/2024/04/09/the-partisanship-and-ideology-of-american-voters/#partisan-composition-by-gender";

export const GALLUP_PARTY_AFFILIATION_URL =
  "https://news.gallup.com/poll/15370/party-affiliation.aspx";

export const CPS_VOTING_REGISTRATION_URL =
  "https://www.census.gov/topics/public-sector/voting/data/tables.html";

export const FLORIDA_SOURCE_BASELINES: {
  partyTotals: DatasetMeta;
  countyBreakdown: DatasetMeta;
} = {
  partyTotals: {
    id: "fl-dos-party-totals",
    name: "Voter Registration by Party Affiliation",
    publisher: "Florida Department of State, Division of Elections",
    asOfDate: "Unknown",
    lastChecked: "Unknown",
    url: FLORIDA_PARTY_AFFILIATION_URL,
    notes: "Official statewide registration counts by party.",
  },
  countyBreakdown: {
    id: "fl-dos-county-party",
    name: "Voter Registration by County and Party",
    publisher: "Florida Department of State, Division of Elections",
    asOfDate: "Unknown",
    lastChecked: "Unknown",
    url: FLORIDA_COUNTY_PARTY_URL,
    notes: "Official county-level registration counts by party.",
  },
};

export const NATIONAL_SOURCE_BASELINES: {
  pewFactSheet: DatasetMeta;
  pewGender: DatasetMeta;
  gallupPartyId: DatasetMeta;
  censusVotingContext: DatasetMeta;
} = {
  pewFactSheet: {
    id: "pew-partisanship-fact-sheet",
    name: "The Partisanship and Ideology of American Voters",
    publisher: "Pew Research Center",
    asOfDate: "2024-04-09",
    lastChecked: "Unknown",
    url: PEW_FACT_SHEET_URL,
    notes:
      "Survey-based party identification and partisan leaning among U.S. registered voters.",
  },
  pewGender: {
    id: "pew-partisanship-gender",
    name: "Partisan Composition by Gender",
    publisher: "Pew Research Center",
    asOfDate: "2024-04-09",
    lastChecked: "Unknown",
    url: PEW_GENDER_URL,
    notes:
      "Survey results by gender; identifies/leans Democratic, Republican, and independent/other.",
  },
  gallupPartyId: {
    id: "gallup-party-affiliation",
    name: "Gallup Party Affiliation",
    publisher: "Gallup",
    asOfDate: "2025-01-15",
    lastChecked: "Unknown",
    url: GALLUP_PARTY_AFFILIATION_URL,
    notes:
      "Long-running trend of U.S. adults identifying as Democrat, Republican, or independent.",
  },
  censusVotingContext: {
    id: "census-cps-voting-registration",
    name: "Voting and Registration in the Election of November 2024",
    publisher: "U.S. Census Bureau (CPS Voting and Registration)",
    asOfDate: "2025-04-22",
    lastChecked: "Unknown",
    url: CPS_VOTING_REGISTRATION_URL,
    notes:
      "Context dataset for turnout and registration rates. Turnout is not party identification.",
  },
};

export const VOTER_STATS_METHOD_NOTE =
  "Registration counts are administrative records; turnout is election participation; party identification is survey self-identification/leaning. These measures are not interchangeable.";
