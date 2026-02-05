export type BudgetCategory = {
  name: string;
  value: number;
  children?: BudgetCategory[];
  description?: string;
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
};
