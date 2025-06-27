import { useState } from "react";

export function useToggle(initialState: boolean = false) {
  const [state, setState] = useState(initialState);
  return [state, () => setState((prev) => !prev)] as const;
}
