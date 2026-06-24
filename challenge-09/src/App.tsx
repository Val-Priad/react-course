import { useReducer } from "react";

type TAccount = {
  balance: number;
  loan: number;
};

type TState = {
  account: TAccount;
  status: "accountIsOpen" | "accountIsClosed";
};

type TAction = {
  type: string;
  payload?: any;
};

const INITIAL_STATE: TState = {
  account: { balance: 0, loan: 0 },
  status: "accountIsClosed",
};

function reducer(state: TState, action: TAction): TState {
  switch (action.type) {
    case "openAccount":
      return {
        ...state,
        status: "accountIsOpen",
        account: {
          ...state.account,
          balance: 500,
        },
      };

    case "deposit":
      return {
        ...state,
        account: {
          ...state.account,
          balance: state.account.balance + 150,
        },
      };

    case "withdraw":
      if (state.account.balance - 50 < 0) {
        alert("Can't withdraw money");
        return state;
      }

      return {
        ...state,
        account: {
          ...state.account,
          balance: state.account.balance - 50,
        },
      };

    case "requestLoan":
      if (state.account.loan > 0) {
        alert("Can't request another loan while current is active");
        return state;
      }

      return {
        ...state,
        account: {
          ...state.account,
          balance: state.account.balance + 5000,
          loan: state.account.loan + 5000,
        },
      };

    case "payLoan":
      if (state.account.loan === 0) {
        alert("You don't have a loan");
        return state;
      }

      if (state.account.loan > state.account.balance) {
        alert("No money to pay off the loan");
        return state;
      }

      return {
        ...state,
        account: {
          ...state.account,
          balance: state.account.balance - 5000,
          loan: 0,
        },
      };

    case "closeAccount":
      return INITIAL_STATE;

    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const accountIsClosed = state.status === "accountIsClosed";

  const buttonBase =
    "w-full rounded-xl px-5 py-3 font-semibold transition disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400 disabled:shadow-none";

  return (
    <main className="p-3 rounded-xl bg-slate-950 px-4 py-10 text-slate-100">
      <section className="mx-auto max-w-md rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-2xl shadow-black/30">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/10 text-3xl">
            🏦
          </div>

          <h1 className="text-3xl font-bold tracking-tight">
            useReducer Bank Account
          </h1>

          <p className="mt-2 text-sm text-slate-400">
            Manage your balance, loan and account status
          </p>
        </div>

        <div className="mb-6 grid grid-cols-2 gap-4">
          <div className="rounded-2xl bg-slate-800 p-4">
            <p className="text-sm text-slate-400">Balance</p>
            <p className="mt-1 text-2xl font-bold text-emerald-400">
              ${state.account.balance}
            </p>
          </div>

          <div className="rounded-2xl bg-slate-800 p-4">
            <p className="text-sm text-slate-400">Loan</p>
            <p className="mt-1 text-2xl font-bold text-amber-400">
              ${state.account.loan}
            </p>
          </div>
        </div>

        <div
          className={`mb-6 rounded-2xl px-4 py-3 text-center text-sm font-medium ${
            accountIsClosed
              ? "bg-rose-500/10 text-rose-300"
              : "bg-emerald-500/10 text-emerald-300"
          }`}
        >
          {accountIsClosed ? "Account is closed" : "Account is open"}
        </div>

        <div className="space-y-3">
          <button
            onClick={() => dispatch({ type: "openAccount" })}
            disabled={!accountIsClosed}
            className={`${buttonBase} bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20 hover:bg-emerald-400`}
          >
            Open account
          </button>

          <button
            onClick={() => dispatch({ type: "deposit" })}
            disabled={accountIsClosed}
            className={`${buttonBase} bg-sky-500 text-white shadow-lg shadow-sky-500/20 hover:bg-sky-400`}
          >
            Deposit 150
          </button>

          <button
            onClick={() => dispatch({ type: "withdraw" })}
            disabled={accountIsClosed}
            className={`${buttonBase} bg-indigo-500 text-white shadow-lg shadow-indigo-500/20 hover:bg-indigo-400`}
          >
            Withdraw 50
          </button>

          <button
            onClick={() => dispatch({ type: "requestLoan" })}
            disabled={accountIsClosed}
            className={`${buttonBase} bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20 hover:bg-amber-400`}
          >
            Request a loan of 5000
          </button>

          <button
            onClick={() => dispatch({ type: "payLoan" })}
            disabled={accountIsClosed}
            className={`${buttonBase} bg-purple-500 text-white shadow-lg shadow-purple-500/20 hover:bg-purple-400`}
          >
            Pay loan
          </button>

          <button
            onClick={() => dispatch({ type: "closeAccount" })}
            disabled={accountIsClosed}
            className={`${buttonBase} bg-rose-500 text-white shadow-lg shadow-rose-500/20 hover:bg-rose-400`}
          >
            Close account
          </button>
        </div>
      </section>
    </main>
  );
}

export default App;
