export function sentenceCase(value: string) {
  if (!value) {
    return value;
  }

  return value.slice(0, 1).toUpperCase() + value.slice(1).toLowerCase();
}
