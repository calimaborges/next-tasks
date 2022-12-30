import { first, lastCharCode } from "./constants";

export default function nextOrder(current?: string): string {
  if (!current) return first;

  const lastIndex = current.length - 1;
  const currentCharCode = current.charCodeAt(lastIndex);
  if (currentCharCode >= lastCharCode) return `${current}${first}`;

  return String.fromCharCode(currentCharCode + 1);
}
