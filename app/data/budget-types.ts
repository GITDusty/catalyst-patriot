export type BudgetCategory = {
  name: string;
  value: number;
  children?: BudgetCategory[];
  description?: string;
  source?: {
    label: string;
    href: string;
    page?: string;
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
};
