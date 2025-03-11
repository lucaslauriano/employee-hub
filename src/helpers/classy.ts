export function classy(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}
