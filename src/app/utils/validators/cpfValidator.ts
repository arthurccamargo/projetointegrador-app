export function isValidCPF(value: string): boolean {
  const doc = value.replace(/\D/g, "");
  if (doc.length !== 11) return false;

  // evita CPFs repetidos como 111.111.111-11
  if (/^(\d)\1{10}$/.test(doc)) return false;

  const cpfDigits = doc.split("").map(Number);

  const calcCheckDigit = (count: number): number => {
    const sum = cpfDigits
      .slice(0, count - 1)
      .reduce((acc, curr, index) => acc + curr * (count - index), 0);
    const rest = (sum * 10) % 11;
    return rest === 10 ? 0 : rest;
  };

  return (
    calcCheckDigit(10) === cpfDigits[9] &&
    calcCheckDigit(11) === cpfDigits[10]
  );
}
