const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  notation: "compact",
  maximumFractionDigits: 1,
});

const percentFormatter = new Intl.NumberFormat("en-US", {
  style: "percent",
  maximumFractionDigits: 1,
});

export const formatCurrency = (value: number): string =>
  currencyFormatter.format(value);

export const formatPercent = (value: number): string =>
  percentFormatter.format(value);
