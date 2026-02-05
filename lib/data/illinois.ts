import type { StateBudget } from "./types";

export const illinoisBudget: StateBudget = {
  state: "Illinois",
  abbreviation: "IL",
  fiscalYear: "FY 2024-25",
  totalBudget: 53.1e9,
  displayTotal: "$53.1B",
  population: 12710158,
  costPerCitizen: 4178,
  displayCostPerCitizen: "$4,178",
  categoriesTracked: 6,
  categories: [
    {
      name: "Education",
      amount: 14.2e9,
      displayAmount: "$14.2B",
      percentage: 26.7,
      color: "#6366f1",
      provenance: {
        status: "Source verified",
        document: "FY 2025 Enacted Budget Highlights",
        source: "Illinois Governor's Office of Management and Budget",
        url: "https://budget.illinois.gov/content/dam/soi/en/web/budget/documents/budget-book/fy2025-budget/FY25_Enacted_Budget_Highlights.pdf",
        pageRef: "Budget Highlights pp. 3-5",
        notes:
          "Includes $350M increase for Evidence-Based Funding formula, $75M early childhood block grant, $711M MAP grants",
      },
    },
    {
      name: "Healthcare & Human Services",
      amount: 11.5e9,
      displayAmount: "$11.5B",
      percentage: 21.7,
      color: "#dc2626",
      provenance: {
        status: "Source verified",
        document: "FY2025 Recommended Budget Analysis",
        source: "Civic Federation",
        url: "https://www.civicfed.org/FY25ILRecommendedBudget",
        pageRef: "Agency Spending Analysis",
        notes:
          "DHS spending increased $716M (7.0%). Includes Home Illinois initiative, Home Services program for developmental disabilities",
      },
    },
    {
      name: "Pensions & Debt Service",
      amount: 10.1e9,
      displayAmount: "$10.1B",
      percentage: 19.0,
      color: "#f59e0b",
      provenance: {
        status: "Source verified",
        document: "FY 2025 Budget In Brief",
        source: "Illinois Governor's Office of Management and Budget",
        url: "https://budget.illinois.gov/content/dam/soi/en/web/budget/documents/budget-book/fy2025-budget/Fiscal-Year-2025-Budget-in-Brief.pdf",
        pageRef: "Pension Funding section",
        notes:
          "Full payment of certified FY2025 statutory pension contribution. Proposed plan to fund at 100% by FY2048. $139B aggregate unfunded liability across 5 systems (44% funded ratio)",
      },
    },
    {
      name: "Public Safety & Corrections",
      amount: 6.8e9,
      displayAmount: "$6.8B",
      percentage: 12.8,
      color: "#475569",
      provenance: {
        status: "Source verified",
        document: "FY 2025 Budget Summary",
        source: "Commission on Government Forecasting and Accountability (CGFA)",
        url: "https://cgfa.ilga.gov/Upload/FY%202025%20Budget%20Summary.pdf",
        pageRef: "Agency Appropriations",
        notes:
          "Includes DOC, State Police, Dept of Juvenile Justice ($151.4M all funds), ICJIA ($561.9M all funds), $200M for R3 program",
      },
    },
    {
      name: "Government Operations",
      amount: 5.8e9,
      displayAmount: "$5.8B",
      percentage: 10.9,
      color: "#64748b",
      provenance: {
        status: "Source verified",
        document: "FY2025 Recommended Budget Analysis",
        source: "Civic Federation",
        url: "https://www.civicfed.org/FY25ILRecommendedBudget",
        pageRef: "Group Insurance & CMS sections",
        notes:
          "Group health insurance increased $490M from FY2024 estimate. Covers employee/retiree health insurance, CMS, DoIT",
      },
    },
    {
      name: "Infrastructure & Environment",
      amount: 4.7e9,
      displayAmount: "$4.7B",
      percentage: 8.9,
      color: "#10b981",
      provenance: {
        status: "Source verified",
        document: "FY2025 Capital Budget Analysis",
        source: "Civic Federation",
        url: "https://civicfed.org/blog/state-illinois-enacts-509-billion-fy2025-capital-budget",
        pageRef: "Capital Budget Overview",
        notes:
          "Separate $50.9B multi-year capital budget (Rebuild Illinois). IDOT annual road program for roads, bridges, mass transit. $38.1M new highway appropriation authority",
      },
    },
  ],
  topLevelSource: {
    name: "Illinois Governor's Office of Management and Budget",
    url: "https://budget.illinois.gov/budget-books.html",
    document: "FY 2025 Enacted Budget",
    signedDate: "June 6, 2024",
    governor: "J.B. Pritzker",
  },
  additionalSources: [
    {
      name: "Commission on Government Forecasting and Accountability (CGFA)",
      url: "https://cgfa.ilga.gov/Upload/FY%202025%20Budget%20Summary.pdf",
      type: "Legislative fiscal analysis",
    },
    {
      name: "Civic Federation",
      url: "https://www.civicfed.org/FY25ILRecommendedBudget",
      type: "Independent nonpartisan analysis",
    },
    {
      name: "Center for Tax and Budget Accountability (CTBA)",
      url: "https://www.ctbaonline.org/reports/analysis-illinois-fy-2025-enacted-general-fund-budget",
      type: "Independent fiscal policy analysis",
    },
  ],
};
