import { useState } from "react";

function App() {
  const today = new Date();

  const [count, setCount] = useState(0);
  const [step, setStep] = useState(1);

  const date = new Date();
  date.setDate(today.getDate() + count);

  return (
    <div className="flex w-full max-w-4xl flex-col items-center justify-center rounded-2xl bg-orange-50 px-6 py-8">
      <div className="mb-4 flex items-center justify-center gap-x-8">
        <p className="w-6 text-center text-lg font-semibold">{step}</p>

        <input
          type="range"
          min={1}
          max={10}
          value={step}
          onChange={(e) => setStep(Number(e.target.value))}
          className="cursor-pointer"
        />
      </div>

      <div className="flex items-center justify-center gap-x-4">
        <button
          onClick={() => {
            setCount((count) => count - step);
          }}
          className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-300 text-xl font-bold transition hover:bg-slate-400"
        >
          &#45;
        </button>

        <input
          className="w-24 rounded-lg border border-orange-200 bg-orange-100 px-3 py-2 text-center text-lg outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-200"
          type="text"
          value={count}
          onChange={(e) => {
            const value = Number(e.target.value);

            if (!Number.isInteger(value)) return;

            setCount(value);
          }}
        />

        <button
          onClick={() => {
            setCount((count) => count + step);
          }}
          className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-300 text-xl font-bold transition hover:bg-slate-400"
        >
          &#43;
        </button>
      </div>

      <h1 className="mt-4 text-center text-xl font-semibold">
        {count > 0
          ? `${count} days from today is `
          : count < 0
            ? `${Math.abs(count)} days ago was `
            : "Today is "}
        {date.toDateString()}
      </h1>

      {count !== 0 && (
        <button
          className="mt-4 rounded-lg bg-red-500 px-5 py-2 font-semibold text-white transition hover:bg-red-600"
          onClick={() => {
            setStep(1);
            setCount(0);
          }}
        >
          Reset
        </button>
      )}
    </div>
  );
}

export default App;
