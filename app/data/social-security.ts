export interface TimelineEntry {
  year: number;
  event: string;
  detail: string;
  stat?: {
    beneficiaries?: string;
    workers?: string;
    ratio?: string;
    deficit?: string;
    benefitCut?: string;
    payable?: string;
  };
  source: string;
  url: string;
  isFuture?: boolean;
}

export interface RatioDataPoint {
  year: number;
  ratio: number;
  beneficiaries: number;
}

export interface StatCard {
  value: string;
  label: string;
  sublabel: string;
  source: string;
  url: string;
}

export interface SourceEntry {
  name: string;
  url: string;
}

export const timeline: TimelineEntry[] = [
  {
    year: 1935,
    event: "Social Security Act signed by President Franklin D. Roosevelt",
    detail:
      "Originally only paid retirement benefits to the primary worker. Named the Economic Security Act before Congress changed it.",
    source: "SSA Historical FAQ",
    url: "https://www.ssa.gov/history/hfaq.html",
  },
  {
    year: 1940,
    event: "First monthly benefits paid",
    detail:
      "Ida May Fuller of Ludlow, Vermont received the first monthly Social Security check: $22.54. Only 222,000 beneficiaries. 159 workers paying in for every 1 person receiving benefits.",
    stat: { beneficiaries: "222,000", workers: "35.4M", ratio: "159:1" },
    source: "SSA Worker-to-Beneficiary Ratio Table",
    url: "https://www.ssa.gov/history/ratios.html",
  },
  {
    year: 1945,
    event: "Post-war expansion begins",
    detail:
      "Beneficiaries grow to 1.1 million. The ratio of workers to beneficiaries drops to 42:1. The U.S. population is approximately 140 million.",
    stat: { beneficiaries: "1,106,000", workers: "46.4M", ratio: "42:1" },
    source: "SSA Worker-to-Beneficiary Ratio Table",
    url: "https://www.ssa.gov/history/ratios.html",
  },
  {
    year: 1950,
    event: "Benefits increased 77% \u2014 first major COLA",
    detail:
      "2.9 million beneficiaries. 16.5 workers per beneficiary. Congress makes first major cost-of-living adjustment.",
    stat: { beneficiaries: "2,930,000", workers: "48.3M", ratio: "16.5:1" },
    source: "SSA Worker-to-Beneficiary Ratio Table",
    url: "https://www.ssa.gov/history/ratios.html",
  },
  {
    year: 1965,
    event: "Medicare added to Social Security",
    detail:
      "20.2 million beneficiaries. 4 workers per beneficiary. Medicare enrollment hits 20 million within 3 years of launch.",
    stat: { beneficiaries: "20,157,000", workers: "80.7M", ratio: "4:1" },
    source: "SSA Worker-to-Beneficiary Ratio Table",
    url: "https://www.ssa.gov/history/ratios.html",
  },
  {
    year: 1980,
    event: "Ratio stabilizes at 3.2:1",
    detail:
      "35.1 million beneficiaries. The ratio of workers to beneficiaries has dropped from 159:1 to 3.2:1 in just 40 years.",
    stat: { beneficiaries: "35,118,000", workers: "113.7M", ratio: "3.2:1" },
    source: "SSA Worker-to-Beneficiary Ratio Table",
    url: "https://www.ssa.gov/history/ratios.html",
  },
  {
    year: 2010,
    event: "Costs begin exceeding non-interest income",
    detail:
      "53.4 million beneficiaries. 2.9 workers per beneficiary. For the first time, Social Security pays out more in benefits than it collects in payroll taxes.",
    stat: { beneficiaries: "53,398,000", workers: "156.7M", ratio: "2.9:1" },
    source: "SSA Worker-to-Beneficiary Ratio Table & 2025 Trustees Report",
    url: "https://www.ssa.gov/history/ratios.html",
  },
  {
    year: 2025,
    event: "72.9 million beneficiaries \u2014 185 million workers",
    detail:
      "About 2.5 workers per beneficiary. Program running a $250 billion annual cash deficit. Trust fund reserves at $2.72 trillion and declining.",
    stat: {
      beneficiaries: "72,900,000",
      workers: "185,000,000",
      ratio: "~2.5:1",
      deficit: "$250B/year",
    },
    source: "SSA Fast Facts 2025 & 2025 Trustees Report",
    url: "https://www.ssa.gov/OACT/FACTS/",
  },
  {
    year: 2034,
    event: "PROJECTED: Trust fund reserves depleted",
    detail:
      "Without Congressional action, all beneficiaries face an automatic 19% benefit cut. Only 81% of scheduled benefits payable from incoming tax revenue alone.",
    stat: { benefitCut: "19%", payable: "81%" },
    source: "2025 Social Security Trustees Report (released June 18, 2025)",
    url: "https://www.ssa.gov/oact/TRSUM/",
    isFuture: true,
  },
];

export const ratioData: RatioDataPoint[] = [
  { year: 1940, ratio: 159.4, beneficiaries: 0.222 },
  { year: 1945, ratio: 41.9, beneficiaries: 1.106 },
  { year: 1950, ratio: 16.5, beneficiaries: 2.93 },
  { year: 1955, ratio: 8.6, beneficiaries: 7.563 },
  { year: 1960, ratio: 5.1, beneficiaries: 14.262 },
  { year: 1965, ratio: 4.0, beneficiaries: 20.157 },
  { year: 1970, ratio: 3.7, beneficiaries: 25.186 },
  { year: 1975, ratio: 3.2, beneficiaries: 31.123 },
  { year: 1980, ratio: 3.2, beneficiaries: 35.118 },
  { year: 1990, ratio: 3.4, beneficiaries: 39.47 },
  { year: 2000, ratio: 3.4, beneficiaries: 45.166 },
  { year: 2010, ratio: 2.9, beneficiaries: 53.398 },
  { year: 2013, ratio: 2.8, beneficiaries: 57.471 },
  { year: 2025, ratio: 2.5, beneficiaries: 72.9 },
];

export const keyStats: StatCard[] = [
  {
    value: "72.9M",
    label: "Beneficiaries",
    sublabel: "receiving benefits",
    source: "SSA Fast Facts 2025",
    url: "https://www.ssa.gov/OACT/FACTS/",
  },
  {
    value: "185M",
    label: "Workers",
    sublabel: "paying in today",
    source: "SSA Fast Facts 2025",
    url: "https://www.ssa.gov/OACT/FACTS/",
  },
  {
    value: "$1.42T",
    label: "Collected",
    sublabel: "in payroll taxes (2024)",
    source: "2025 Trustees Report",
    url: "https://www.ssa.gov/oact/TRSUM/",
  },
  {
    value: "2034",
    label: "Insolvency",
    sublabel: "projected year",
    source: "2025 Trustees Report",
    url: "https://www.ssa.gov/oact/TRSUM/",
  },
  {
    value: "$250B",
    label: "Annual",
    sublabel: "cash deficit (2025)",
    source: "2025 Trustees Report",
    url: "https://www.ssa.gov/oact/TRSUM/",
  },
  {
    value: "2.5:1",
    label: "Worker to",
    sublabel: "beneficiary ratio",
    source: "SSA Ratio Table",
    url: "https://www.ssa.gov/history/ratios.html",
  },
  {
    value: "19%",
    label: "Automatic",
    sublabel: "benefit cut at depletion",
    source: "2025 Trustees Report",
    url: "https://www.ssa.gov/oact/TRSUM/",
  },
  {
    value: "$25T",
    label: "75-year",
    sublabel: "unfunded obligation",
    source: "2025 Trustees Report",
    url: "https://www.ssa.gov/oact/TRSUM/",
  },
];

export const sources: SourceEntry[] = [
  {
    name: "SSA Worker-to-Beneficiary Ratio Table",
    url: "https://www.ssa.gov/history/ratios.html",
  },
  {
    name: "SSA Historical FAQ",
    url: "https://www.ssa.gov/history/hfaq.html",
  },
  {
    name: "SSA Fast Facts & Figures 2025",
    url: "https://www.ssa.gov/policy/docs/chartbooks/fast_facts/2025/fast_facts25.html",
  },
  {
    name: "SSA OACT Program Fact Sheet June 2025",
    url: "https://www.ssa.gov/OACT/FACTS/",
  },
  {
    name: "2025 Social Security Trustees Report Summary",
    url: "https://www.ssa.gov/oact/TRSUM/",
  },
  {
    name: "SSA Press Release June 18, 2025",
    url: "https://www.ssa.gov/news/en/press/releases/2025-06-18.html",
  },
  {
    name: "Congressional Research Service: Selected Findings of the 2025 Annual Report",
    url: "https://www.congress.gov/crs-product/IF13045",
  },
  {
    name: "Committee for a Responsible Federal Budget: Analysis of 2025 Report",
    url: "https://www.crfb.org/papers/analysis-2025-social-security-trustees-report",
  },
  {
    name: "Center on Budget and Policy Priorities: What the 2025 Trustees' Report Shows",
    url: "https://www.cbpp.org/research/social-security/what-the-2025-trustees-report-shows-about-social-security",
  },
  {
    name: "Bipartisan Policy Center: 2025 Trustees Report Explained",
    url: "https://bipartisanpolicy.org/article/2025-social-security-trustees-report-explained/",
  },
  {
    name: "American Action Forum: Trust Funds and Options for Reform",
    url: "https://www.americanactionforum.org/insight/the-social-security-trust-funds-and-options-for-reform/",
  },
];
