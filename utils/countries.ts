export function countryCodeToEmoji(code: string = '') {
  if (!code || code.length !== 2) return "";
  const A = 0x1f1e6; // regional indicator 'A'
  const first = A + code.toUpperCase().charCodeAt(0) - 65;
  const second = A + code.toUpperCase().charCodeAt(1) - 65;
  return String.fromCodePoint(first, second);
}