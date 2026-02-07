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
];
