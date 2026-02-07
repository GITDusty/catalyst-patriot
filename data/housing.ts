export type HousingTimelinePoint = {
  year: number;
  price: number;
  income: number;
  ratio: number;
};

export type HousingChartPoint = {
  year: number;
  homePrice: number;
  income: number;
};

export type HousingSource = {
  name: string;
  url: string;
  description: string;
};

export const housingData = {
  timeline: [
    { year: 1986, price: 92000, income: 24900, ratio: 3.7 },
    { year: 1996, price: 140000, income: 35500, ratio: 3.9 },
    { year: 2025, price: 417000, income: 83000, ratio: 5.0 },
  ] satisfies HousingTimelinePoint[],

  chartData: [
    { year: 1986, homePrice: 92000, income: 24900 },
    { year: 1990, homePrice: 123000, income: 29943 },
    { year: 1995, homePrice: 133900, income: 34076 },
    { year: 2000, homePrice: 169000, income: 42148 },
    { year: 2005, homePrice: 240900, income: 46326 },
    { year: 2010, homePrice: 221800, income: 49276 },
    { year: 2015, homePrice: 289000, income: 56516 },
    { year: 2020, homePrice: 329000, income: 67521 },
    { year: 2025, homePrice: 417000, income: 83000 },
  ] satisfies HousingChartPoint[],

  homeownerAge: {
    past: { range: "25-28", era: "1980s" },
    current: { range: "35-38", era: "2024" },
  },

  supportingStats: [
    {
      label: "Average Down Payment",
      value: "$83,400",
      context: "20% of median home price",
    },
    {
      label: "Monthly Mortgage Payment",
      value: "~$2,800",
      context: "30-year loan at 7% rate",
    },
    {
      label: "Rent-Burdened Households",
      value: "32%",
      context: "Pay >50% of income on rent",
    },
    {
      label: "Housing Unit Shortage",
      value: "4.5M",
      context: "Units needed vs. supply",
    },
  ],

  sources: [
    {
      name: "U.S. Census Bureau",
      url: "https://www.census.gov/construction/nrs/historical_data/",
      description: "Historical median home sales prices",
    },
    {
      name: "Federal Reserve Economic Data (FRED)",
      url: "https://fred.stlouisfed.org/series/MEHOINUSA646N",
      description: "Median household income data",
    },
    {
      name: "National Association of Realtors",
      url: "https://www.nar.realtor/research-and-statistics/housing-statistics",
      description: "Homebuyer demographics and affordability index",
    },
    {
      name: "Bureau of Labor Statistics",
      url: "https://www.bls.gov/data/inflation_calculator.htm",
      description: "CPI inflation calculator",
    },
    {
      name: "U.S. Department of Housing & Urban Development",
      url: "https://www.hud.gov/press/press_releases_media_advisories",
      description: "Housing cost burden statistics",
    },
    {
      name: "Freddie Mac",
      url: "https://www.freddiemac.com/research",
      description: "Mortgage rates and housing supply data",
    },
    {
      name: "Up for Growth",
      url: "https://upforgrowth.org/housing-underproduction/",
      description: "National housing shortage analysis",
    },
  ] satisfies HousingSource[],
};
