export type BudgetCategory = {
  name: string;
  value: number;
  children?: BudgetCategory[];
  description?: string;
  source?: SourceMeta;
};

export type BudgetMeta = {
  fiscalYear: string;
  totalBudget: number;
  sourceLabel: string;
  sourceUrl?: string;
  source?: SourceMeta;
};

export type SourceMeta = {
  url: string;
  description: string;
};

export type BudgetData = {
  meta: BudgetMeta;
  categories: BudgetCategory[];
};
