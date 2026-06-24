import React, { useState } from "react";

export default function App() {
  return (
    <main className="p-3 rounded-xl bg-slate-100 px-4 py-10 text-slate-800">
      <div className="mx-auto flex max-w-3xl flex-col gap-6">
        <h1 className="text-center text-3xl font-bold text-slate-900">
          Text Expander
        </h1>

        <TextExpander>
          Space travel is the ultimate adventure! Imagine soaring past the stars
          and exploring new worlds. It's the stuff of dreams and science
          fiction, but believe it or not, space travel is a real thing. Humans
          and robots are constantly venturing out into the cosmos to uncover its
          secrets and push the boundaries of what's possible.
        </TextExpander>

        <TextExpander
          collapsedNumWords={20}
          expandButtonText="Show text"
          collapseButtonText="Collapse text"
          buttonColor="#ff6622"
        >
          Space travel requires some seriously amazing technology and
          collaboration between countries, private companies, and international
          space organizations. And while it's not always easy (or cheap), the
          results are out of this world. Think about the first time humans
          stepped foot on the moon or when rovers were sent to roam around on
          Mars.
        </TextExpander>

        <TextExpander expanded={true} className="border-blue-200 bg-blue-50">
          Space missions have given us incredible insights into our universe and
          have inspired future generations to keep reaching for the stars. Space
          travel is a pretty cool thing to think about. Who knows what we'll
          discover next!
        </TextExpander>
      </div>
    </main>
  );
}

function TextExpander({
  children,
  expanded = false,
  buttonColor = "hsl(220, 80%, 70%)",
  expandButtonText = "Show more",
  collapseButtonText = "Show less",
  collapsedNumWords = 10,
  className = "",
}: {
  children: React.ReactNode;
  expanded?: boolean;
  buttonColor?: string;
  collapsedNumWords?: number;
  collapseButtonText?: string;
  expandButtonText?: string;
  className?: string;
}) {
  const [isExpanded, setIsExpanded] = useState(expanded);

  function handleClick() {
    setIsExpanded((prev) => !prev);
  }

  const text =
    typeof children === "string"
      ? children
      : React.Children.toArray(children).join("");

  const textToShow = isExpanded
    ? text
    : text.split(" ").slice(0, collapsedNumWords).join(" ") + "...";

  return (
    <div
      className={`rounded-2xl border border-slate-200 bg-white p-6 text-lg leading-8 shadow-sm transition hover:shadow-md ${className}`}
    >
      <p>
        {textToShow}
        <button
          onClick={handleClick}
          className="ml-1 font-semibold transition hover:opacity-70 focus:outline-none focus:ring-2 focus:ring-slate-300 focus:ring-offset-2"
          style={{ color: buttonColor }}
        >
          {isExpanded ? collapseButtonText : expandButtonText}
        </button>
      </p>
    </div>
  );
}
