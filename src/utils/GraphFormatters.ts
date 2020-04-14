export function prependDollar(value: number): string {
  if (value) {
    return "$" + value.toFixed(2);
  } else {
    return "$0";
  }
}

export function appendPercent(value: number): string {
  if (value) {
    return value + "%";
  } else {
    return "0%";
  }
}
