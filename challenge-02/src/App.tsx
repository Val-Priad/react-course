import { useState } from "react";

function App() {
  const today = new Date();
  let [count, setCount] = useState(0);
  let [step, setStep] = useState(1);
  // TOLEARN when react rerenders the component it computes everything again
  // but with updated values, so all dependent on updated values variables will
  // also update
  let date = new Date();
  date.setDate(today.getDate() + count);

  const btn =
    "h-5 w-5 bg-gray-300 flex justify-center items-center hover:bg-gray-400 rounded-md";

  return (
    <div className="w-full max-w-4xl bg-amber-50 py-3 px-6 rounded-2xl shadow-lg flex flex-col items-center justify-center">
      <div className="flex gap-2 mb-0.5">
        <button className={btn} onClick={() => setStep(() => step - 1)}>
          &#45;
        </button>
        <p>Step: {step}</p>
        <button className={btn} onClick={() => setStep(() => step + 1)}>
          &#43;
        </button>
      </div>
      <div className="flex gap-2 mb-1">
        <button
          onClick={() => {
            setCount(() => count - step);
          }}
          className={btn}
        >
          &#45;
        </button>
        <p>Count: {count}</p>
        <button
          onClick={() => {
            setCount(() => count + step);
          }}
          className={btn}
        >
          &#43;
        </button>
      </div>
      <h1 className="text-xl font-semibold">
        {count > 0
          ? `${count} days from today is `
          : count < 0
            ? `${count} days ago was `
            : "Today is "}
        {date.toDateString()}
      </h1>
    </div>
  );
}

export default App;
