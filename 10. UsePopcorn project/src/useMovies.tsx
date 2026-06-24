import * as Config from "./config";
import { useState, useEffect } from "react";

export type MovieSearchResponseT = {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
  Type: string;
};

export function useMovies(query: string, handleCloseMovie: () => void) {
  const [movies, setMovies] = useState<MovieSearchResponseT[]>([]);
  const [isLoaded, setIsLoaded] = useState(true);
  const [error, setError] = useState("");

  useEffect(
    function () {
      const controller = new AbortController();
      async function fetchMovies() {
        try {
          setIsLoaded(false);
          const res = await fetch(`${Config.API_URL}s=${query}`, {
            signal: controller.signal,
          });
          if (!res.ok)
            throw new Error("Something went wrong when fetching movies");
          const data = await res.json();
          if (data.Response === "False") throw new Error("Movie not found");
          setMovies(data.Search);
        } catch (error) {
          if (error instanceof Error) {
            if (error.name !== "AbortError") setError(error.message);
          } else console.log(`Unexpected Error 💥💥💥: ${error}`);
        } finally {
          setIsLoaded(true);
        }
      }

      setMovies([]);
      setError("");
      handleCloseMovie();
      if (!query.length) return;

      fetchMovies();

      return function () {
        controller.abort();
      };
    },
    [query],
  );
  return [movies, isLoaded, error] as const;
}
