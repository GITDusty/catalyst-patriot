const compactCurrencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  notation: "compact",
  maximumFractionDigits: 1,
});

const wholeCurrencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export const formatCompactCurrency = (value: number): string =>
  compactCurrencyFormatter.format(value);

export const formatWholeCurrency = (value: number): string =>
  wholeCurrencyFormatter.format(value);
