import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function keyHandler(
  obj: Record<string, (e: React.KeyboardEvent<HTMLInputElement>) => void>,
) {
  const handlers = Object.entries(obj);

  return (e: React.KeyboardEvent<HTMLInputElement>) => {
    for (const [key, handler] of handlers) {
      if (e.key === key) {
        handler(e);
      }
    }
  };
}

export function randomEntry<T>(arr: T[]): T | undefined {
  if (arr.length === 0) return undefined;
  return arr[Math.floor(Math.random() * arr.length)];
}
