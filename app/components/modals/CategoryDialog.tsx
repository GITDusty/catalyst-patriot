"use client";

import * as Dialog from "@radix-ui/react-dialog";

import type { BudgetCategory } from "../../data/budget-types";
import { formatCurrency, formatPercent } from "../../utils/formatting";

type CategoryDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  category: BudgetCategory | null;
  fiscalYear: string;
  total: number;
};

export const CategoryDialog = ({
  open,
  onOpenChange,
  category,
  fiscalYear,
  total,
}: CategoryDialogProps) => {
  const subcategories = category?.children ?? [];

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-slate-950/40 backdrop-blur-sm" />
        <Dialog.Content className="fixed left-1/2 top-1/2 w-[min(92vw,36rem)] -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white p-6 shadow-2xl outline-none">
          <div className="flex items-start justify-between gap-4">
            <div>
              <Dialog.Title className="text-xl font-semibold text-slate-900">
                {category?.name ?? "Category details"}
              </Dialog.Title>
              <Dialog.Description className="mt-1 text-sm text-slate-600">
                {category?.name
                  ? `Subcategory breakdown for ${category.name} (${fiscalYear}).`
                  : `Select a category to view subcategory details (${fiscalYear}).`}
              </Dialog.Description>
            </div>
            <Dialog.Close asChild>
              <button
                type="button"
                aria-label="Close dialog"
                className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-600 transition hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-400"
              >
                Close
              </button>
            </Dialog.Close>
          </div>

          {category?.description ? (
            <p className="mt-4 text-sm text-slate-700">{category.description}</p>
          ) : null}

          <div className="mt-5 rounded-xl border border-slate-200">
            {subcategories.length > 0 ? (
              <div className="max-h-[50vh] overflow-auto">
                <table className="min-w-full text-left text-sm">
                  <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                    <tr>
                      <th className="px-4 py-3 font-semibold">Subcategory</th>
                      <th className="px-4 py-3 font-semibold">Value</th>
                      <th className="px-4 py-3 font-semibold">Percent of total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {subcategories.map((item) => {
                      const percent = total > 0 ? item.value / total : 0;

                      return (
                        <tr key={item.name} className="text-slate-700">
                          <td className="px-4 py-3 font-medium text-slate-900">
                            {item.name}
                          </td>
                          <td className="ledger px-4 py-3">
                            {formatCurrency(item.value)}
                          </td>
                          <td className="ledger px-4 py-3">
                            {formatPercent(percent)}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="px-4 py-6 text-sm text-slate-600">
                No subcategory details available yet.
              </div>
            )}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
