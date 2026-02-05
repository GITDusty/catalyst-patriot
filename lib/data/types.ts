export interface Provenance {
  status: "Source verified" | "Estimated" | "Pending verification";
  document: string;
  source: string;
  url?: string;
  pageRef?: string;
  notes?: string;
}

export interface BudgetCategory {
  name: string;
  amount: number;
  displayAmount: string;
  percentage: number;
  color: string;
  provenance: Provenance;
}

export interface StateBudget {
  state: string;
  abbreviation: string;
  fiscalYear: string;
  totalBudget: number;
  displayTotal: string;
  population: number;
  costPerCitizen: number;
  displayCostPerCitizen: string;
  categoriesTracked: number;
  categories: BudgetCategory[];
  topLevelSource: {
    name: string;
    url: string;
    document: string;
    signedDate: string;
    governor: string;
  };
  additionalSources: {
    name: string;
    url: string;
    type: string;
  }[];
}
