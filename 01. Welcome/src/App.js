import { useState } from "react";

function App() {
  const [advice, setAdvice] = useState("");
  const [fetching, setFetching] = useState(false);
  let [adviceCount, setAdviceCount] = useState(0);

  async function getAdvice() {
    setFetching(true);
    const res = await fetch("https://api.adviceslip.com/advice");
    const data = await res.json();
    setAdvice(data.slip.advice);
    setAdviceCount(++adviceCount);
    console.log(data);
    setFetching(false);
  }

  return (
    <div className="max-w-4xl w-full flex justify-center items-center flex-col bg-stone-100 rounded-xl p-5 shadow-lg">
      <h1 className="text-green-950 font-semibold text-xl mb-6">{advice}</h1>
      <button
        className="bg-green-500 hover:bg-green-600 shadow-md disabled:bg-gray-400 rounded-xl text-white py-1 px-3 rounded-m text-lg mb-3"
        disabled={fetching}
        onClick={getAdvice}
      >
        Get advice!
      </button>
      <Message count={adviceCount}></Message>
    </div>
  );
}

function Message(props) {
  return (
    <p className="text-gray-600 text-sm">
      You have read <strong>{props.count}</strong> pieces of advice:)
    </p>
  );
}

export default App;
