export type BudgetCategory = {
  name: string;
  value: number;
  children?: BudgetCategory[];
  description?: string;
  provenance?: {
    sourceId: string;
    status: "Source verified" | "Estimated" | "Pending verification";
    document: string;
    source: string;
    url?: string;
    pageRef?: string;
    notes?: string;
  };
};

export type BudgetMeta = {
  fiscalYear: string;
  totalBudget: number;
  sourceLabel: string;
  sourceUrl?: string;
};

export type BudgetData = {
  meta: BudgetMeta;
  categories: BudgetCategory[];
  sources?: {
    id: string;
    name: string;
    type: string;
    url?: string;
  }[];
};
