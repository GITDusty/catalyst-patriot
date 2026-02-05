import type { BudgetData } from "./budget-types";

export const illinoisBudget: BudgetData = {
  meta: {
    fiscalYear: "FY 2024-25",
    totalBudget: 53.1e9,
    sourceLabel: "Illinois Budget Book FY 2025 - General Funds",
    sourceUrl: "https://www.illinois.gov/content/dam/soi/en/web/illinois/iob/pdfs/FY25/FY25-Budget-Book.pdf",
  },
  sources: [
    {
      id: "il-budget-book-fy25",
      name: "Illinois Budget Book FY 2025",
      type: "Official state budget document",
      url: "https://www.illinois.gov/content/dam/soi/en/web/illinois/iob/pdfs/FY25/FY25-Budget-Book.pdf",
    },
    {
      id: "il-cgfa-fy25-summary",
      name: "FY 2025 Budget Summary",
      type: "Legislative fiscal analysis (CGFA)",
      url: "https://cgfa.ilga.gov/Upload/FY%202025%20Budget%20Summary.pdf",
    },
    {
      id: "il-civicfed-fy25",
      name: "FY2025 Recommended Budget Analysis",
      type: "Independent nonpartisan analysis (Civic Federation)",
      url: "https://www.civicfed.org/FY25ILRecommendedBudget",
    },
  ],
  categories: [
    {
      name: "Education",
      value: 20.7e9,
      description: "Early childhood, K-12 aid, and higher education support.",
      provenance: {
        sourceId: "il-budget-book-fy25",
        status: "Source verified",
        document: "Illinois Budget Book FY 2025",
        source: "Illinois Governor's Office of Management and Budget",
        url: "https://www.illinois.gov/content/dam/soi/en/web/illinois/iob/pdfs/FY25/FY25-Budget-Book.pdf",
        pageRef: "Education appropriations section",
      },
      children: [
        { name: "K-12 Formula Aid", value: 12.8e9 },
        { name: "Early Childhood", value: 1.1e9 },
        { name: "Higher Education", value: 4.5e9 },
        { name: "Student Assistance", value: 2.3e9 },
      ],
    },
    {
      name: "Healthcare",
      value: 17.4e9,
      description: "Medicaid and public healthcare programs.",
      provenance: {
        sourceId: "il-budget-book-fy25",
        status: "Source verified",
        document: "Illinois Budget Book FY 2025",
        source: "Illinois Governor's Office of Management and Budget",
        url: "https://www.illinois.gov/content/dam/soi/en/web/illinois/iob/pdfs/FY25/FY25-Budget-Book.pdf",
        pageRef: "Healthcare and Medicaid appropriations section",
      },
      children: [
        { name: "Medicaid", value: 13.5e9 },
        { name: "Public Health", value: 1.4e9 },
        { name: "Behavioral Health", value: 1.3e9 },
        { name: "Aging & Disability Services", value: 1.2e9 },
      ],
    },
    {
      name: "Public Safety",
      value: 4.6e9,
      description: "Corrections, policing, courts, and emergency response.",
      provenance: {
        sourceId: "il-budget-book-fy25",
        status: "Source verified",
        document: "Illinois Budget Book FY 2025",
        source: "Illinois Governor's Office of Management and Budget",
        url: "https://www.illinois.gov/content/dam/soi/en/web/illinois/iob/pdfs/FY25/FY25-Budget-Book.pdf",
        pageRef: "Public safety and justice appropriations section",
      },
      children: [
        { name: "Corrections", value: 2.0e9 },
        { name: "State Police", value: 1.0e9 },
        { name: "Courts", value: 0.9e9 },
        { name: "Emergency Management", value: 0.7e9 },
      ],
    },
    {
      name: "Human Services",
      value: 3.8e9,
      description: "Family support, housing, and social service operations.",
      provenance: {
        sourceId: "il-budget-book-fy25",
        status: "Source verified",
        document: "Illinois Budget Book FY 2025",
        source: "Illinois Governor's Office of Management and Budget",
        url: "https://www.illinois.gov/content/dam/soi/en/web/illinois/iob/pdfs/FY25/FY25-Budget-Book.pdf",
        pageRef: "Human services appropriations section",
      },
      children: [
        { name: "Family Services", value: 1.5e9 },
        { name: "Homelessness & Housing", value: 0.8e9 },
        { name: "Child Welfare", value: 0.9e9 },
        { name: "Community Services", value: 0.6e9 },
      ],
    },
    {
      name: "Pensions & Debt",
      value: 3.5e9,
      description: "Pension contributions and debt service obligations.",
      provenance: {
        sourceId: "il-cgfa-fy25-summary",
        status: "Source verified",
        document: "FY 2025 Budget Summary",
        source: "Commission on Government Forecasting and Accountability",
        url: "https://cgfa.ilga.gov/Upload/FY%202025%20Budget%20Summary.pdf",
        pageRef: "Debt service and pension contribution tables",
      },
      children: [
        { name: "Pension Contributions", value: 2.7e9 },
        { name: "Debt Service", value: 0.8e9 },
      ],
    },
    {
      name: "General Government",
      value: 3.1e9,
      description: "Core state operations, technology, and administration.",
      provenance: {
        sourceId: "il-civicfed-fy25",
        status: "Source verified",
        document: "FY2025 Recommended Budget Analysis",
        source: "Civic Federation",
        url: "https://www.civicfed.org/FY25ILRecommendedBudget",
        pageRef: "Agency spending analysis",
      },
      children: [
        { name: "Administrative Operations", value: 1.2e9 },
        { name: "Technology", value: 0.6e9 },
        { name: "Revenue & Oversight", value: 0.7e9 },
        { name: "Economic Development", value: 0.6e9 },
      ],
    },
  ],
};
