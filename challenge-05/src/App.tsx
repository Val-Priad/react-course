import { useState } from "react";

function App() {
  const [billAmount, setBillAmount] = useState<number>(0);
  const [percentage1, setPercentage1] = useState(0);
  const [percentage2, setPercentage2] = useState(0);

  function handleReset() {
    setBillAmount(0);
    setPercentage1(0);
    setPercentage2(0);
  }

  const tip = (percentage1 + percentage2) / 2;
  const tipAmount = (billAmount * tip) / 100;
  const total = billAmount + tipAmount;

  return (
    <main className="rounded-xl p-3 bg-slate-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
        <h1 className="mb-6 text-center text-3xl font-bold text-slate-800">
          Tip Calculator
        </h1>

        <div className="space-y-5">
          <BillAmount
            billAmount={billAmount}
            onBillAmountUpdate={setBillAmount}
          >
            How much was the bill?
          </BillAmount>

          <ServiceSatisfaction
            percentage={percentage1}
            onPercentageChange={setPercentage1}
          >
            How did you like the service?
          </ServiceSatisfaction>

          <ServiceSatisfaction
            percentage={percentage2}
            onPercentageChange={setPercentage2}
          >
            How did your friend like the service?
          </ServiceSatisfaction>

          {billAmount !== 0 && (
            <div className="mt-6 rounded-xl bg-emerald-50 p-5">
              <Bill>
                You pay{" "}
                <span className="font-bold text-emerald-700">
                  ${total.toFixed(2)}
                </span>{" "}
                (${billAmount.toFixed(2)} + ${tipAmount.toFixed(2)} tip)
              </Bill>

              <Reset onReset={handleReset} />
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

export default App;

function BillAmount({
  children,
  billAmount,
  onBillAmountUpdate,
}: {
  children: React.ReactNode;
  billAmount: number;
  onBillAmountUpdate: (value: number) => void;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-slate-700">
        {children}
      </label>

      <input
        className="w-full rounded-lg border border-slate-300 px-4 py-2 text-slate-800 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
        type="number"
        placeholder="Enter bill amount"
        value={billAmount === 0 ? "" : billAmount}
        onChange={(e) => {
          onBillAmountUpdate(+e.target.value);
        }}
      />
    </div>
  );
}

function ServiceSatisfaction({
  children,
  percentage,
  onPercentageChange,
}: {
  children: React.ReactNode;
  percentage: number;
  onPercentageChange: (value: number) => void;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-slate-700">
        {children}
      </label>

      <select
        className="w-full cursor-pointer rounded-lg border border-slate-300 bg-white px-4 py-2 text-slate-800 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
        value={percentage}
        onChange={(e) => {
          const newValue = +e.target.value;

          if (!Number.isFinite(newValue)) return;

          onPercentageChange(newValue);
        }}
      >
        <option value="0">Dissatisfied (0%)</option>
        <option value="5">It was okay (5%)</option>
        <option value="10">It was good (10%)</option>
        <option value="20">It was amazing (20%)</option>
      </select>
    </div>
  );
}

function Bill({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="mb-4 text-lg font-semibold text-slate-800">{children}</h3>
  );
}

function Reset({ onReset }: { onReset: () => void }) {
  return (
    <button
      className="w-full rounded-lg bg-emerald-600 px-4 py-2 font-semibold text-white transition hover:bg-emerald-700 active:scale-[0.98]"
      onClick={onReset}
    >
      Reset
    </button>
  );
}
