"use client";

import type { BudgetCategory } from "../../data/budget-types";
import { formatCurrency, formatPercent } from "../../utils/formatting";

type CategoryTableProps = {
  id: string;
  caption: string;
  items: BudgetCategory[];
  total: number;
};

export const CategoryTable = ({
  id,
  caption,
  items,
  total,
}: CategoryTableProps) => (
  <table
    id={id}
    className="min-w-full text-left text-sm text-slate-700"
  >
    <caption className="mb-2 text-left text-sm font-semibold text-slate-700">
      {caption}
    </caption>
    <thead className="border-b border-slate-200 text-xs uppercase tracking-wide text-slate-500">
      <tr>
        <th scope="col" className="px-3 py-2 font-semibold">
          Category
        </th>
        <th scope="col" className="px-3 py-2 font-semibold">
          Value
        </th>
        <th scope="col" className="px-3 py-2 font-semibold">
          Percent of total
        </th>
      </tr>
    </thead>
    <tbody className="divide-y divide-slate-100">
      {items.map((item) => {
        const percent = total > 0 ? item.value / total : 0;

        return (
          <tr key={item.name}>
            <td className="px-3 py-2 font-medium text-slate-900">
              {item.name}
            </td>
            <td className="ledger px-3 py-2">{formatCurrency(item.value)}</td>
            <td className="ledger px-3 py-2">{formatPercent(percent)}</td>
          </tr>
        );
      })}
    </tbody>
  </table>
);
