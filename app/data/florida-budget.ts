import type { BudgetData } from "./budget-types";

export const floridaBudget: BudgetData = {
  meta: {
    fiscalYear: "FY 2024-25",
    totalBudget: 116.5e9,
    sourceLabel: "Florida FY 2024-25 Budget (Source TBD)",
  },
  categories: [
    {
      name: "Health & Human Services",
      value: 46.0675e9,
      description: "Healthcare programs, public health, and family services.",
      source: {
        label: "General Appropriations Act (TBD)",
        href: "https://example.com/florida-budget.pdf",
        page: "42",
      },
      children: [
        { name: "Medicaid", value: 26.0e9 },
        { name: "Public Health", value: 7.5e9 },
        { name: "Child & Family Services", value: 6.2e9 },
        { name: "Behavioral Health", value: 3.9e9 },
        { name: "Long-Term Care", value: 2.4675e9 },
      ],
    },
    {
      name: "Education",
      value: 30.989e9,
      description: "K-12, higher education, and workforce development.",
      source: {
        label: "Education Appropriations (TBD)",
        href: "https://example.com/florida-budget.pdf",
        page: "88",
      },
      children: [
        { name: "K-12 Education", value: 18.2e9 },
        { name: "Higher Education", value: 6.4e9 },
        { name: "Pre-K & Early Learning", value: 2.3e9 },
        { name: "Workforce Training", value: 1.6e9 },
        { name: "Student Support Services", value: 2.489e9 },
      ],
    },
    {
      name: "Transportation",
      value: 15.7275e9,
      description: "Statewide mobility, transit, and infrastructure.",
      source: {
        label: "Transportation Program (TBD)",
        href: "https://example.com/florida-budget.pdf",
        page: "137",
      },
      children: [
        { name: "Highway Maintenance", value: 6.4e9 },
        { name: "Transit Systems", value: 2.9e9 },
        { name: "Ports & Aviation", value: 2.1e9 },
        { name: "Safety & Enforcement", value: 1.7e9 },
        { name: "Rail & Mobility Programs", value: 2.6275e9 },
      ],
    },
    {
      name: "Corrections",
      value: 7.3395e9,
      description: "State prisons, probation, and rehabilitation.",
      source: {
        label: "Corrections Budget (TBD)",
        href: "https://example.com/florida-budget.pdf",
        page: "214",
      },
      children: [
        { name: "State Prisons", value: 4.6e9 },
        { name: "Probation & Community", value: 1.3e9 },
        { name: "Rehabilitation Programs", value: 0.9e9 },
        { name: "Juvenile Justice", value: 0.5395e9 },
      ],
    },
    {
      name: "Environment",
      value: 3.3785e9,
      description: "Water resources, conservation, and resiliency.",
      source: {
        label: "Environment Budget (TBD)",
        href: "https://example.com/florida-budget.pdf",
        page: "302",
      },
      children: [
        { name: "Water Resources", value: 1.3e9 },
        { name: "Conservation & Parks", value: 0.9e9 },
        { name: "Resilience & Coastal", value: 0.6e9 },
        { name: "Environmental Regulation", value: 0.4e9 },
        { name: "Agricultural Protection", value: 0.1785e9 },
      ],
    },
    {
      name: "Other",
      value: 13.048e9,
      description: "General government, safety, and reserves.",
      source: {
        label: "General Government (TBD)",
        href: "https://example.com/florida-budget.pdf",
        page: "356",
      },
      children: [
        { name: "General Government", value: 4.2e9 },
        { name: "Public Safety", value: 2.9e9 },
        { name: "Economic Development", value: 2.1e9 },
        { name: "Housing & Community", value: 1.6e9 },
        { name: "State Administration", value: 1.248e9 },
        { name: "Reserves & Contingencies", value: 1.0e9 },
      ],
    },
  ],
};

export const floridaBudgetData = floridaBudget;
