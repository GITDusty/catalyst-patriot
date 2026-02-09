import { NextResponse } from "next/server";

type TreasuryDebtRecord = {
  record_date: string;
  tot_pub_debt_out_amt: string;
};

type TreasuryDebtApiResponse = {
  data?: TreasuryDebtRecord[];
};

function parseDebt(value: string): number {
  const normalized = value.replaceAll(",", "");
  const parsed = Number(normalized);
  return Number.isFinite(parsed) ? parsed : 0;
}

function getPerSecondEstimate(current: TreasuryDebtRecord, previous?: TreasuryDebtRecord): number {
  if (!previous) {
    return 0;
  }

  const currentDate = new Date(current.record_date);
  const previousDate = new Date(previous.record_date);
  const elapsedMs = currentDate.getTime() - previousDate.getTime();

  if (!Number.isFinite(elapsedMs) || elapsedMs <= 0) {
    return 0;
  }

  const currentDebt = parseDebt(current.tot_pub_debt_out_amt);
  const previousDebt = parseDebt(previous.tot_pub_debt_out_amt);
  const delta = currentDebt - previousDebt;
  return delta / (elapsedMs / 1_000);
}

export async function GET() {
  const upstreamUrl =
    "https://api.fiscaldata.treasury.gov/services/api/fiscal_service/v2/accounting/od/debt_to_penny?fields=record_date,tot_pub_debt_out_amt&sort=-record_date&page%5Bsize%5D=2";

  try {
    const response = await fetch(upstreamUrl, {
      next: { revalidate: 300 },
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      return NextResponse.json(
        {
          error: {
            code: "UPSTREAM_UNAVAILABLE",
            message: "Unable to load U.S. debt data right now.",
          },
        },
        { status: 502 }
      );
    }

    const payload = (await response.json()) as TreasuryDebtApiResponse;
    const current = payload.data?.[0];

    if (!current) {
      return NextResponse.json(
        {
          error: {
            code: "NO_DEBT_DATA",
            message: "Debt data is temporarily unavailable.",
          },
        },
        { status: 502 }
      );
    }

    const previous = payload.data?.[1];
    const currentDebt = parseDebt(current.tot_pub_debt_out_amt);
    const previousDebt = previous ? parseDebt(previous.tot_pub_debt_out_amt) : null;
    const perSecondEstimate = getPerSecondEstimate(current, previous);

    return NextResponse.json({
      data: {
        amount: currentDebt,
        asOfDate: current.record_date,
        previousAmount: previousDebt,
        previousDate: previous?.record_date ?? null,
        perSecondEstimate,
      },
      meta: {
        source: "U.S. Treasury Fiscal Data - Debt to the Penny",
        fetchedAt: new Date().toISOString(),
      },
    });
  } catch {
    return NextResponse.json(
      {
        error: {
          code: "FETCH_FAILED",
          message: "Unable to load U.S. debt data right now.",
        },
      },
      { status: 502 }
    );
  }
}
