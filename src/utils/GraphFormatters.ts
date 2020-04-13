export function prependDollar(value: number): string {
  return "$" + value.toFixed(2);
}

export function appendPercent(value: number): string {
  return value + "%";
}
