// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`

import { ChangeEvent, useEffect, useState } from "react";

type ExchangeRateResponseT = {
  amount: number;
  base: string;
  date: string;
  rates: Record<string, number>;
};

export default function App() {
  const [currencyFrom, setCurrencyFrom] = useState("USD");
  const [currencyTo, setCurrencyTo] = useState("EUR");
  const [amount, setCurrency] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [output, setOutput] = useState<string | null>(null);

  function convertCurrency() {
    const controller = new AbortController();

    async function fetchData() {
      try {
        setIsLoading(true);
        setError("");

        const params = new URLSearchParams({
          amount,
          from: currencyFrom,
          to: currencyTo,
        });

        const res = await fetch(
          `https://api.frankfurter.dev/v1/latest?${params.toString()}`,
          { signal: controller.signal },
        );

        if (!res.ok) {
          throw new Error(`Request failed with status ${res.status}`);
        }

        const data: ExchangeRateResponseT = await res.json();

        setOutput(String(data.rates[currencyTo]));
      } catch (error) {
        if (error instanceof Error && error.name !== "AbortError") {
          setError(error.message);
        }
      } finally {
        setIsLoading(false);
      }
    }

    setOutput(null);
    setError("");

    const numericAmount = Number(amount);

    if (currencyFrom === currencyTo) {
      setOutput(amount);
      return;
    }

    if (!Number.isFinite(numericAmount)) return;
    if (numericAmount <= 0) return;

    fetchData();

    return function () {
      controller.abort();
    };
  }

  useEffect(convertCurrency, [currencyFrom, currencyTo, amount]);

  return (
    <main className="rounded-xl p-3 bg-slate-950 px-4 py-10 text-slate-100">
      <div className="w-full rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-2xl shadow-black/30 backdrop-blur sm:p-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Currency Converter
          </h1>
          <p className="mt-3 text-sm text-slate-400 sm:text-base">
            Enter an amount and choose currencies to get the latest exchange
            rate.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-[1fr_auto_auto]">
          <div className="flex flex-col gap-2">
            <label
              htmlFor="amount"
              className="text-sm font-medium text-slate-300"
            >
              Amount
            </label>
            <input
              id="amount"
              type="text"
              value={amount}
              placeholder="Enter amount"
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setCurrency(e.target.value);
              }}
              className="h-12 rounded-xl border border-slate-700 bg-slate-950 px-4 text-lg text-white outline-none transition placeholder:text-slate-500 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="currency-from"
              className="text-sm font-medium text-slate-300"
            >
              From
            </label>
            <select
              id="currency-from"
              value={currencyFrom}
              onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                setCurrencyFrom(e.target.value);
              }}
              className="h-12 rounded-xl border border-slate-700 bg-slate-950 px-4 text-white outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20"
            >
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="CAD">CAD</option>
              <option value="INR">INR</option>
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="currency-to"
              className="text-sm font-medium text-slate-300"
            >
              To
            </label>
            <select
              id="currency-to"
              value={currencyTo}
              onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                setCurrencyTo(e.target.value);
              }}
              className="h-12 rounded-xl border border-slate-700 bg-slate-950 px-4 text-white outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20"
            >
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="CAD">CAD</option>
              <option value="INR">INR</option>
            </select>
          </div>
        </div>

        <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-950 p-6 text-center">
          <p className="text-sm font-medium uppercase tracking-wide text-slate-500">
            Result
          </p>

          <div className="mt-3 min-h-10">
            {isLoading && (
              <p className="text-lg font-semibold text-blue-400">Loading...</p>
            )}

            {!isLoading && output && (
              <p className="text-3xl font-bold text-white">
                {Number(output).toFixed(2)}{" "}
                <span className="text-blue-400">{currencyTo}</span>
              </p>
            )}

            {!isLoading && error && (
              <p className="text-lg font-semibold text-red-400">{error}</p>
            )}

            {!isLoading && !output && !error && (
              <p className="text-lg text-slate-500">
                Your converted amount will appear here.
              </p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
