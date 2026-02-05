import type { StateBudget } from "./types";

export const floridaBudget: StateBudget = {
  state: "Florida",
  abbreviation: "FL",
  fiscalYear: "FY 2024-25",
  totalBudget: 116.5e9,
  displayTotal: "$116.5B",
  population: 22600000,
  costPerCitizen: 5155,
  displayCostPerCitizen: "$5,155",
  categoriesTracked: 6,
  categories: [
    {
      name: "Health & Human Services",
      amount: 46.0675e9,
      displayAmount: "$46.1B",
      percentage: 39.5,
      color: "#1e293b",
      provenance: {
        status: "Pending verification",
        document: "Florida FY 2024-25 General Appropriations Act",
        source: "State of Florida",
        notes:
          "Category total is based on existing project allocations and remains unchanged in this refactor.",
      },
    },
    {
      name: "Education",
      amount: 30.989e9,
      displayAmount: "$31.0B",
      percentage: 26.6,
      color: "#dc2626",
      provenance: {
        status: "Pending verification",
        document: "Florida FY 2024-25 General Appropriations Act",
        source: "State of Florida",
        notes:
          "Category total is based on existing project allocations and remains unchanged in this refactor.",
      },
    },
    {
      name: "Transportation",
      amount: 15.7275e9,
      displayAmount: "$15.7B",
      percentage: 13.5,
      color: "#94a3b8",
      provenance: {
        status: "Pending verification",
        document: "Florida FY 2024-25 General Appropriations Act",
        source: "State of Florida",
        notes:
          "Category total is based on existing project allocations and remains unchanged in this refactor.",
      },
    },
    {
      name: "Corrections",
      amount: 7.3395e9,
      displayAmount: "$7.3B",
      percentage: 6.3,
      color: "#475569",
      provenance: {
        status: "Pending verification",
        document: "Florida FY 2024-25 General Appropriations Act",
        source: "State of Florida",
        notes:
          "Category total is based on existing project allocations and remains unchanged in this refactor.",
      },
    },
    {
      name: "Environment",
      amount: 3.3785e9,
      displayAmount: "$3.4B",
      percentage: 2.9,
      color: "#f59e0b",
      provenance: {
        status: "Pending verification",
        document: "Florida FY 2024-25 General Appropriations Act",
        source: "State of Florida",
        notes:
          "Category total is based on existing project allocations and remains unchanged in this refactor.",
      },
    },
    {
      name: "Other",
      amount: 13.048e9,
      displayAmount: "$13.0B",
      percentage: 11.2,
      color: "#6366f1",
      provenance: {
        status: "Pending verification",
        document: "Florida FY 2024-25 General Appropriations Act",
        source: "State of Florida",
        notes:
          "Category total is based on existing project allocations and remains unchanged in this refactor.",
      },
    },
  ],
  topLevelSource: {
    name: "Florida Legislature",
    url: "https://www.flsenate.gov/Session/Budget",
    document: "FY 2024-25 General Appropriations Act",
    signedDate: "June 2024 (pending exact verification)",
    governor: "Ron DeSantis",
  },
  additionalSources: [
    {
      name: "Florida Office of Policy and Budget",
      url: "https://opb.myflorida.com",
      type: "Executive budget office",
    },
  ],
};
