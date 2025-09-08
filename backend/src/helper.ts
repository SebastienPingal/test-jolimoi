export const decimalToRoman = (decimal: number) => {
  const valueToNumeral: Array<[number, string]> = [
    [100, 'C'],
    [90, 'XC'],
    [50, 'L'],
    [40, 'XL'],
    [10, 'X'],
    [9, 'IX'],
    [5, 'V'],
    [4, 'IV'],
    [1, 'I']
  ]

  let remaining = decimal
  let result = ''

  for (const [value, numeral] of valueToNumeral) {
    while (remaining >= value) {
      result += numeral
      remaining -= value
    }
  }

  return result
}
