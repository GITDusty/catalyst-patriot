import type { Metadata } from "next";
import DebtVaultClient from "./DebtVaultClient";

export const metadata: Metadata = {
  title: "Debt Vault",
  description: "Hidden live U.S. debt tracker powered by U.S. Treasury data.",
};

export default function DebtVaultPage() {
  return <DebtVaultClient />;
}
