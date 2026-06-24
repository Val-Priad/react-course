import { useState } from "react";

type TPosition = {
  lat: number;
  lng: number;
};

function useGeolocation(): [
  TPosition | null,
  () => void,
  boolean,
  string | null,
] {
  const [isLoading, setIsLoading] = useState(false);
  const [position, setPosition] = useState<TPosition | null>(null);
  const [error, setError] = useState<string | null>(null);

  function getPosition() {
    if (!navigator.geolocation) {
      return setError("Your browser does not support geolocation");
    }

    setIsLoading(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
        setIsLoading(false);
      },
      (error) => {
        setError(error.message);
        setIsLoading(false);
      },
    );
  }

  return [position, getPosition, isLoading, error];
}

export default function App() {
  const [countClicks, setCountClicks] = useState(0);
  const [position, getPosition, isLoading, error] = useGeolocation();

  const lat = position?.lat;
  const lng = position?.lng;

  function handleClick() {
    setCountClicks((count) => count + 1);
    getPosition();
  }

  return (
    <main className="flex p-3 rounded-xl items-center justify-center bg-slate-100 px-4">
      <section className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-slate-900">Geolocation App</h1>
          <p className="mt-2 text-sm text-slate-500">
            Click the button to get your current GPS position
          </p>
        </div>

        <button
          onClick={handleClick}
          disabled={isLoading}
          className="w-full rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-400"
        >
          {isLoading ? "Getting position..." : "Get my position"}
        </button>

        <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-4">
          {isLoading && (
            <p className="text-center text-sm font-medium text-blue-600">
              Loading position...
            </p>
          )}

          {error && (
            <p className="rounded-lg bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
              {error}
            </p>
          )}

          {!isLoading && !error && lat && lng && (
            <div className="text-center">
              <p className="mb-2 text-sm text-slate-500">Your GPS position:</p>

              <a
                target="_blank"
                rel="noreferrer"
                href={`https://www.openstreetmap.org/?mlat=${lat}&mlon=${lng}#map=16/${lat}/${lng}`}
                className="font-semibold text-blue-600 underline underline-offset-4 hover:text-blue-800"
              >
                {lat}, {lng}
              </a>
            </div>
          )}

          {!isLoading && !error && !position && (
            <p className="text-center text-sm text-slate-500">
              No position requested yet
            </p>
          )}
        </div>

        <p className="mt-6 text-center text-sm text-slate-500">
          You requested position{" "}
          <span className="font-semibold text-slate-900">{countClicks}</span>{" "}
          times
        </p>
      </section>
    </main>
  );
}
