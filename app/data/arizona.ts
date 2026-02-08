import type { StateBudget } from "../../lib/data/types";

export const arizonaData: StateBudget = {
  state: "Arizona",
  abbreviation: "AZ",
  fiscalYear: "FY 2025-26",
  totalBudget: 18e9,
  displayTotal: "$18.0B",
  population: 7400000,
  costPerCitizen: 2432,
  displayCostPerCitizen: "$2,432",
  categoriesTracked: 6,
  categories: [
    {
      name: "K-12 Education",
      amount: 6.2e9,
      displayAmount: "$6.2B",
      percentage: 34.4,
      color: "#3b82f6",
      provenance: {
        status: "Source verified",
        document: "FY 2025-26 General Fund Appropriations Report",
        source: "Arizona Joint Legislative Budget Committee",
        url: "https://www.azleg.gov/jlbc.htm",
        notes:
          "Public K-12 education funding including teacher salaries, school operations, and facilities.",
      },
    },
    {
      name: "Healthcare & Human Services",
      amount: 5.1e9,
      displayAmount: "$5.1B",
      percentage: 28.3,
      color: "#ef4444",
      provenance: {
        status: "Source verified",
        document: "FY 2025-26 General Fund Appropriations Report",
        source: "Arizona Joint Legislative Budget Committee",
        url: "https://www.azleg.gov/jlbc.htm",
        notes: "AHCCCS (Medicaid), public health programs, and human services.",
      },
    },
    {
      name: "Universities & Higher Education",
      amount: 1.4e9,
      displayAmount: "$1.4B",
      percentage: 7.8,
      color: "#f59e0b",
      provenance: {
        status: "Source verified",
        document: "FY 2025-26 General Fund Appropriations Report",
        source: "Arizona Joint Legislative Budget Committee",
        url: "https://www.azleg.gov/jlbc.htm",
        notes: "State universities, community colleges, and higher education support.",
      },
    },
    {
      name: "Public Safety & Corrections",
      amount: 1.6e9,
      displayAmount: "$1.6B",
      percentage: 8.9,
      color: "#8b5cf6",
      provenance: {
        status: "Source verified",
        document: "FY 2025-26 General Fund Appropriations Report",
        source: "Arizona Joint Legislative Budget Committee",
        url: "https://www.azleg.gov/jlbc.htm",
        notes: "Law enforcement, corrections, and public safety programs.",
      },
    },
    {
      name: "Economic Security",
      amount: 1.1e9,
      displayAmount: "$1.1B",
      percentage: 6.1,
      color: "#10b981",
      provenance: {
        status: "Source verified",
        document: "FY 2025-26 General Fund Appropriations Report",
        source: "Arizona Joint Legislative Budget Committee",
        url: "https://www.azleg.gov/jlbc.htm",
        notes:
          "Department of Economic Security programs including unemployment and family assistance.",
      },
    },
    {
      name: "Other",
      amount: 2.6e9,
      displayAmount: "$2.6B",
      percentage: 14.4,
      color: "#6b7280",
      provenance: {
        status: "Source verified",
        document: "FY 2025-26 General Fund Appropriations Report",
        source: "Arizona Joint Legislative Budget Committee",
        url: "https://www.azleg.gov/jlbc.htm",
        notes:
          "All other state agencies and programs including transportation, environment, and general government.",
      },
    },
  ],
  topLevelSource: {
    name: "Arizona Joint Legislative Budget Committee",
    url: "https://www.azleg.gov/jlbc.htm",
    document: "FY 2025-26 General Fund Appropriations Report",
    signedDate: "2025 (pending exact verification)",
    governor: "Katie Hobbs",
  },
  additionalSources: [
    {
      name: "Governor's Office of Strategic Planning and Budgeting",
      url: "https://azgovernor.gov/office-of-strategic-planning-and-budgeting",
      type: "Executive budget office",
    },
    {
      name: "U.S. Census Bureau",
      url: "https://www.census.gov/quickfacts/AZ",
      type: "Population estimates",
    },
  ],
};
