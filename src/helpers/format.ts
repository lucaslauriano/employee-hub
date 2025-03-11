export function getInitials(name: string): string {
  const nameParts = name.split(' ');
  let initials = '';

  for (const part of nameParts) {
    if (part) {
      initials += part[0];
    }
  }
  return initials;
}
