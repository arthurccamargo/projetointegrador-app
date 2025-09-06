export function isValidCNPJ(value: string): boolean {
  if (!value) return false;

  // Remove caracteres não numéricos
  const cnpj = value.replace(/\D/g, "");

  // CNPJ precisa ter 14 dígitos
  if (cnpj.length !== 14) return false;

  // Elimina CNPJs com todos os dígitos iguais (ex.: 11111111111111)
  if (/^(\d)\1{13}$/.test(cnpj)) return false;

  // Converte em array de números
  const cnpjDigits = cnpj.split("").map(Number);

  // Pesos usados no cálculo dos dígitos verificadores
  const calcCheckDigit = (length: number): number => {
    const weights =
      length === 12
        ? [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
        : [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

    const sum = cnpjDigits
      .slice(0, length)
      .reduce((acc, digit, index) => acc + digit * weights[index], 0);

    const rest = sum % 11;
    return rest < 2 ? 0 : 11 - rest;
  };

  // Calcula e compara os dois dígitos verificadores
  const digit1 = calcCheckDigit(12);
  const digit2 = calcCheckDigit(13);

  return digit1 === cnpjDigits[12] && digit2 === cnpjDigits[13];
}
