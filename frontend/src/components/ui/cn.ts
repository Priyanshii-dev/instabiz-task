/** Tiny classnames joiner - avoids pulling in a dependency for this alone. */
export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(' ');
}
