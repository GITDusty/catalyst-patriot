export type AvailableState = {
  name: string;
  slug: string;
  icon: string;
  fiscalYear: string;
  totalBudget: string;
  population: string;
  perCitizen: string;
  categories: number;
};

export const availableStates: AvailableState[] = [
  {
    name: "Florida",
    slug: "florida",
    icon: "🌴",
    fiscalYear: "FY 2024-25",
    totalBudget: "$116.5B",
    population: "22,600,000",
    perCitizen: "$5,155",
    categories: 6,
  },
  {
    name: "Illinois",
    slug: "illinois",
    icon: "🏛️",
    fiscalYear: "FY 2024-25",
    totalBudget: "$53.1B",
    population: "12,710,158",
    perCitizen: "$4,178",
    categories: 6,
  },
  {
    name: "Arizona",
    slug: "arizona",
    icon: "🌵",
    fiscalYear: "FY 2025-26",
    totalBudget: "$18.0B",
    population: "7,400,000",
    perCitizen: "$2,432",
    categories: 6,
  },
  {
    name: "Texas",
    slug: "texas",
    icon: "🤠",
    fiscalYear: "FY 2024-25",
    totalBudget: "$160.7B",
    population: "30,500,000",
    perCitizen: "$5,270",
    categories: 6,
  },
];
