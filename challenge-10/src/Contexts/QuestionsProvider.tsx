// import { API_URL } from "./Config";
import { useEffect, useReducer } from "react";
import { QuestionsContext } from "./QuestionsContext";

export type TQuestion = {
  question: string;
  options: string[];
  correctOption: number;
  points: number;
};

type TState = {
  questions: TQuestion[];
  status: "loading" | "error" | "ready" | "active" | "finished";
  questionIdx: number;
  answerIdx: number | null;
  points: number;
  highScore: number;
  secondsRemaining: number;
};

export type TAction = {
  type: string;
  payload?: any;
};

const SECONDS_PER_QUESTION = 15;

const initialState: TState = {
  questions: [],
  status: "loading",
  questionIdx: 0,
  answerIdx: null,
  points: 0,
  highScore: 0,
  secondsRemaining: 0,
};

const quizData = {
  questions: [
    {
      question: "Which is the most popular JavaScript framework?",
      options: ["Angular", "React", "Svelte", "Vue"],
      correctOption: 1,
      points: 10,
    },
    {
      question: "Which company invented React?",
      options: ["Google", "Apple", "Netflix", "Facebook"],
      correctOption: 3,
      points: 10,
    },
    {
      question: "What's the fundamental building block of React apps?",
      options: ["Components", "Blocks", "Elements", "Effects"],
      correctOption: 0,
      points: 10,
    },
    {
      question:
        "What's the name of the syntax we use to describe the UI in React components?",
      options: ["FBJ", "Babel", "JSX", "ES2015"],
      correctOption: 2,
      points: 10,
    },
    {
      question: "How does data flow naturally in React apps?",
      options: [
        "From parents to children",
        "From children to parents",
        "Both ways",
        "The developers decides",
      ],
      correctOption: 0,
      points: 10,
    },
    {
      question: "How to pass data into a child component?",
      options: ["State", "Props", "PropTypes", "Parameters"],
      correctOption: 1,
      points: 10,
    },
    {
      question: "When to use derived state?",
      options: [
        "Whenever the state should not trigger a re-render",
        "Whenever the state can be synchronized with an effect",
        "Whenever the state should be accessible to all components",
        "Whenever the state can be computed from another state variable",
      ],
      correctOption: 3,
      points: 30,
    },
    {
      question: "What triggers a UI re-render in React?",
      options: [
        "Running an effect",
        "Passing props",
        "Updating state",
        "Adding event listeners to DOM elements",
      ],
      correctOption: 2,
      points: 20,
    },
    {
      question: 'When do we directly "touch" the DOM in React?',
      options: [
        "When we need to listen to an event",
        "When we need to change the UI",
        "When we need to add styles",
        "Almost never",
      ],
      correctOption: 3,
      points: 20,
    },
    {
      question: "In what situation do we use a callback to update state?",
      options: [
        "When updating the state will be slow",
        "When the updated state is very data-intensive",
        "When the state update should happen faster",
        "When the new state depends on the previous state",
      ],
      correctOption: 3,
      points: 30,
    },
    {
      question:
        "If we pass a function to useState, when will that function be called?",
      options: [
        "On each re-render",
        "Each time we update the state",
        "Only on the initial render",
        "The first time we update the state",
      ],
      correctOption: 2,
      points: 30,
    },
    {
      question:
        "Which hook to use for an API request on the component's initial render?",
      options: ["useState", "useEffect", "useRef", "useReducer"],
      correctOption: 1,
      points: 10,
    },
    {
      question:
        "Which variables should go into the useEffect dependency array?",
      options: [
        "Usually none",
        "All our state variables",
        "All state and props referenced in the effect",
        "All variables needed for clean up",
      ],
      correctOption: 2,
      points: 30,
    },
    {
      question: "An effect will always run on the initial render.",
      options: [
        "True",
        "It depends on the dependency array",
        "False",
        "In depends on the code in the effect",
      ],
      correctOption: 0,
      points: 30,
    },
    {
      question:
        "When will an effect run if it doesn't have a dependency array?",
      options: [
        "Only when the component mounts",
        "Only when the component unmounts",
        "The first time the component re-renders",
        "Each time the component is re-rendered",
      ],
      correctOption: 3,
      points: 20,
    },
  ],
};

function reducer(state: TState, action: TAction): TState {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFetchingFailed":
      return { ...state, status: "error" };
    case "startQuiz":
      return {
        ...state,
        status: "active",
        secondsRemaining: state.questions.length * SECONDS_PER_QUESTION,
      };
    case "newAnswer":
      const question = state.questions.at(state.questionIdx);
      return question
        ? {
            ...state,
            answerIdx: action.payload,
            points:
              question.correctOption === action.payload
                ? state.points + question.points
                : state.points,
          }
        : state;
    case "nextQuestion":
      return {
        ...state,
        questionIdx: state.questionIdx + 1,
        answerIdx: null,
      };
    case "finishQuiz":
      return {
        ...state,
        status: "finished",
        highScore:
          state.points > state.highScore ? state.points : state.highScore,
      };
    case "reset":
      return {
        ...initialState,
        highScore: state.highScore,
        questions: state.questions,
        status: "ready",
      };
    case "updateTimer":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining <= 0 ? "finished" : state.status,
      };
    default:
      return state;
  }
}

function QuestionsProvider({ children }: { children: React.ReactNode }) {
  const [
    {
      questions,
      status,
      questionIdx,
      answerIdx,
      points,
      highScore,
      secondsRemaining,
    },
    dispatch,
  ] = useReducer(reducer, initialState);
  const questionsQty = questions.length;
  const maxPossiblePoints = questions.reduce(
    (acc, question) => acc + question.points,
    0,
  );

  useEffect(function () {
    dispatch({ type: "dataReceived", payload: quizData.questions });
  }, []);

  return (
    <QuestionsContext.Provider
      value={{
        questions,
        status,
        questionIdx,
        answerIdx,
        points,
        highScore,
        secondsRemaining,
        questionsQty,
        maxPossiblePoints,
        dispatch,
      }}
    >
      {children}
    </QuestionsContext.Provider>
  );
}

export default QuestionsProvider;

// useEffect(function () {
//   async function fetchQuestions() {
//     try {
//       const res = await fetch(API_URL);
//       if (!res.ok)
//         throw new Error("Error fetching questions, try again later :(");
//       const data = await res.json();
//       // console.log(data);
//       dispatch({ type: "dataReceived", payload: data });
//     } catch (error) {
//       if (error instanceof Error)
//         dispatch({ type: "dataFetchingFailed", payload: error.message });
//       else console.error(`Unexpected error ${error} 💥💥💥`);
//     }
//   }
//   fetchQuestions();
// }, []);
