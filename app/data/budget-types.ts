export type BudgetCategory = {
  name: string;
  value: number;
  children?: BudgetCategory[];
  description?: string;
  source?: SourceMeta;
  provenance?: Provenance;
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

export type Provenance = {
  sourceId?: string;
  status: string;
  document: string;
  source: string;
  url?: string;
  pageRef?: string;
};

export type SourceEntry = {
  id: string;
  name: string;
  type: string;
  url: string;
};

export type BudgetData = {
  meta: BudgetMeta;
  categories: BudgetCategory[];
  sources?: SourceEntry[];
};
