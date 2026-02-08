import type { StateBudget } from "../../lib/data/types";

export const texasData: StateBudget = {
  state: "Texas",
  abbreviation: "TX",
  fiscalYear: "FY 2024-25",
  totalBudget: 160.7e9,
  displayTotal: "$160.7B",
  population: 30500000,
  costPerCitizen: 5270,
  displayCostPerCitizen: "$5,270",
  categoriesTracked: 6,
  categories: [
    {
      name: "Health & Human Services",
      amount: 51.8e9,
      displayAmount: "$51.8B",
      percentage: 32.2,
      color: "#ef4444",
      provenance: {
        status: "Source verified",
        document: "Fiscal Size-Up 2024-25 Biennium",
        source: "Texas Legislative Budget Board",
        url: "https://www.lbb.texas.gov/",
        notes: "Medicaid, CHIP, public health, and human services programs.",
      },
    },
    {
      name: "Public Education (K-12)",
      amount: 44.5e9,
      displayAmount: "$44.5B",
      percentage: 27.7,
      color: "#3b82f6",
      provenance: {
        status: "Source verified",
        document: "Fiscal Size-Up 2024-25 Biennium",
        source: "Texas Legislative Budget Board",
        url: "https://www.lbb.texas.gov/",
        notes: "Foundation School Program and public K-12 education funding.",
      },
    },
    {
      name: "Transportation",
      amount: 13.4e9,
      displayAmount: "$13.4B",
      percentage: 8.3,
      color: "#f59e0b",
      provenance: {
        status: "Source verified",
        document: "Fiscal Size-Up 2024-25 Biennium",
        source: "Texas Legislative Budget Board",
        url: "https://www.lbb.texas.gov/",
        notes:
          "Highway construction, maintenance, and transportation infrastructure.",
      },
    },
    {
      name: "Public Safety & Criminal Justice",
      amount: 12.1e9,
      displayAmount: "$12.1B",
      percentage: 7.5,
      color: "#8b5cf6",
      provenance: {
        status: "Source verified",
        document: "Fiscal Size-Up 2024-25 Biennium",
        source: "Texas Legislative Budget Board",
        url: "https://www.lbb.texas.gov/",
        notes:
          "Law enforcement, corrections, border security, and judicial system.",
      },
    },
    {
      name: "Higher Education",
      amount: 10.7e9,
      displayAmount: "$10.7B",
      percentage: 6.7,
      color: "#06b6d4",
      provenance: {
        status: "Source verified",
        document: "Fiscal Size-Up 2024-25 Biennium",
        source: "Texas Legislative Budget Board",
        url: "https://www.lbb.texas.gov/",
        notes: "Universities, community colleges, and higher education funding.",
      },
    },
    {
      name: "Other",
      amount: 28.2e9,
      displayAmount: "$28.2B",
      percentage: 17.5,
      color: "#6b7280",
      provenance: {
        status: "Source verified",
        document: "Fiscal Size-Up 2024-25 Biennium",
        source: "Texas Legislative Budget Board",
        url: "https://www.lbb.texas.gov/",
        notes:
          "All other state agencies including natural resources, economic development, and general government.",
      },
    },
  ],
  topLevelSource: {
    name: "Texas Legislative Budget Board",
    url: "https://www.lbb.texas.gov/",
    document: "Fiscal Size-Up 2024-25 Biennium (annual equivalent calculated)",
    signedDate: "2023 (biennium enacted; annual equivalent shown)",
    governor: "Greg Abbott",
  },
  additionalSources: [
    {
      name: "Texas Comptroller of Public Accounts",
      url: "https://comptroller.texas.gov/",
      type: "Revenue estimate and appropriations data",
    },
    {
      name: "U.S. Census Bureau",
      url: "https://www.census.gov/quickfacts/TX",
      type: "Population estimates",
    },
  ],
};
