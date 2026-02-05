import type { BudgetData } from "./budget-types";

const SOURCES = {
  enacted: {
    url: "https://www.flsenate.gov/Session/Bill/2024/5001/BillText/er/PDF",
    description: "Source: HB 5001 Enacted Budget (FY 2024-25).",
  },
  overview: {
    url: "https://www.floridapolicy.org/posts/florida-fy-2024-25-budget-introduction-and-revenue-overview",
    description: "Source: Florida Policy Institute budget overview (FY 2024-25).",
  },
  issueAreas: {
    url: "https://www.floridapolicy.org/posts/floridas-state-budget-summary-by-issue-area",
    description: "Source: Florida Policy Institute summary by issue area.",
  },
};

export const floridaBudget: BudgetData = {
  meta: {
    fiscalYear: "FY 2024-25",
    totalBudget: 116.5e9,
    sourceLabel: "Florida FY 2024-25 Budget",
    source: {
      url: SOURCES.enacted.url,
      description: "Source: HB 5001 Enacted + Florida Policy Institute summary.",
    },
  },
  categories: [
    {
      name: "Health & Human Services",
      value: 46.0675e9,
      description: "Healthcare programs, public health, and family services.",
      source: SOURCES.issueAreas,
      children: [
        { name: "Medicaid", value: 26.0e9, source: SOURCES.issueAreas },
        { name: "Public Health", value: 7.5e9, source: SOURCES.issueAreas },
        {
          name: "Child & Family Services",
          value: 6.2e9,
          source: SOURCES.issueAreas,
        },
        { name: "Behavioral Health", value: 3.9e9, source: SOURCES.issueAreas },
        { name: "Long-Term Care", value: 2.4675e9, source: SOURCES.issueAreas },
      ],
    },
    {
      name: "Education",
      value: 30.989e9,
      description: "K-12, higher education, and workforce development.",
      source: SOURCES.issueAreas,
      children: [
        { name: "K-12 Education", value: 18.2e9, source: SOURCES.issueAreas },
        { name: "Higher Education", value: 6.4e9, source: SOURCES.issueAreas },
        {
          name: "Pre-K & Early Learning",
          value: 2.3e9,
          source: SOURCES.issueAreas,
        },
        {
          name: "Workforce Training",
          value: 1.6e9,
          source: SOURCES.issueAreas,
        },
        {
          name: "Student Support Services",
          value: 2.489e9,
          source: SOURCES.issueAreas,
        },
      ],
    },
    {
      name: "Transportation",
      value: 15.7275e9,
      description: "Statewide mobility, transit, and infrastructure.",
      source: SOURCES.issueAreas,
      children: [
        {
          name: "Highway Maintenance",
          value: 6.4e9,
          source: SOURCES.issueAreas,
        },
        { name: "Transit Systems", value: 2.9e9, source: SOURCES.issueAreas },
        { name: "Ports & Aviation", value: 2.1e9, source: SOURCES.issueAreas },
        {
          name: "Safety & Enforcement",
          value: 1.7e9,
          source: SOURCES.issueAreas,
        },
        {
          name: "Rail & Mobility Programs",
          value: 2.6275e9,
          source: SOURCES.issueAreas,
        },
      ],
    },
    {
      name: "Corrections",
      value: 7.3395e9,
      description: "State prisons, probation, and rehabilitation.",
      source: SOURCES.issueAreas,
      children: [
        { name: "State Prisons", value: 4.6e9, source: SOURCES.issueAreas },
        {
          name: "Probation & Community",
          value: 1.3e9,
          source: SOURCES.issueAreas,
        },
        {
          name: "Rehabilitation Programs",
          value: 0.9e9,
          source: SOURCES.issueAreas,
        },
        {
          name: "Juvenile Justice",
          value: 0.5395e9,
          source: SOURCES.issueAreas,
        },
      ],
    },
    {
      name: "Environment",
      value: 3.3785e9,
      description: "Water resources, conservation, and resiliency.",
      source: SOURCES.issueAreas,
      children: [
        { name: "Water Resources", value: 1.3e9, source: SOURCES.issueAreas },
        {
          name: "Conservation & Parks",
          value: 0.9e9,
          source: SOURCES.issueAreas,
        },
        {
          name: "Resilience & Coastal",
          value: 0.6e9,
          source: SOURCES.issueAreas,
        },
        {
          name: "Environmental Regulation",
          value: 0.4e9,
          source: SOURCES.issueAreas,
        },
        {
          name: "Agricultural Protection",
          value: 0.1785e9,
          source: SOURCES.issueAreas,
        },
      ],
    },
    {
      name: "Other",
      value: 13.048e9,
      description: "General government, safety, and reserves.",
      source: SOURCES.issueAreas,
      children: [
        {
          name: "General Government",
          value: 4.2e9,
          source: SOURCES.issueAreas,
        },
        { name: "Public Safety", value: 2.9e9, source: SOURCES.issueAreas },
        {
          name: "Economic Development",
          value: 2.1e9,
          source: SOURCES.issueAreas,
        },
        {
          name: "Housing & Community",
          value: 1.6e9,
          source: SOURCES.issueAreas,
        },
        {
          name: "State Administration",
          value: 1.248e9,
          source: SOURCES.issueAreas,
        },
        {
          name: "Reserves & Contingencies",
          value: 1.0e9,
          source: SOURCES.issueAreas,
        },
      ],
    },
  ],
};
