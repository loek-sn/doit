import { useEffect, useState } from "react";
import SuperJSON from "superjson";

export function useLocalStorage<T>(key: string, initialState: T) {
  const noWindow = typeof window === "undefined";
  const [state, setState] = useState<T>(() => {
    if (noWindow) return initialState;
    const value = window.localStorage.getItem(key);
    return value ? SuperJSON.parse(value) : initialState;
  });
  useEffect(() => {
    if (noWindow) {
      return;
    }
    const value = window.localStorage.getItem(key);
    if (!value) {
      window.localStorage.setItem(key, SuperJSON.stringify(initialState));
    }
  }, [key, initialState, noWindow]);
  useEffect(() => {
    if (noWindow) return;
    window.localStorage.setItem(key, SuperJSON.stringify(state));
  }, [state, key, noWindow]);
  const clear = () => {
    if (noWindow) return;
    window.localStorage.removeItem(key);
  };

  return [state, setState, clear] as const;
}
