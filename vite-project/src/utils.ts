export type Domino = [number, number];

export const countDoubleNumber = (dominoes: Domino[]): number => {
  return dominoes.filter((domino) => domino[0] === domino[1]).length;
};

export type SortDirection = "asc" | "desc";
export const sort = (
  dominoes: Domino[],
  direction: SortDirection
): Domino[] => {
  const sorted = [...dominoes];
  sorted.sort((a, b) => {
    const sumA = a[0] + a[1];
    const sumB = b[0] + b[1];

    if (sumA !== sumB) {
      return direction === "asc" ? sumA - sumB : sumB - sumA;
    }

    if (a[0] !== b[0]) {
      return direction === "asc" ? a[0] - b[0] : b[0] - a[0];
    }

    return direction === "asc" ? a[1] - b[1] : b[1] - a[1];
  });
  return sorted;
};

export const removeDuplicates = (dominoes: Domino[]): Domino[] => {
  const countMap = new Map<string, number>();

  // First pass: count normalized dominoes
  dominoes.forEach((domino: Domino) => {
    const normalized: string = [...domino]
      .sort((a: number, b: number) => a - b)
      .join("-");
    countMap.set(normalized, (countMap.get(normalized) || 0) + 1);
  });

  // Second pass: filter unique dominoes
  return dominoes.filter((domino: Domino) => {
    const normalized: string = [...domino]
      .sort((a: number, b: number) => a - b)
      .join("-");
    return countMap.get(normalized) === 1;
  });
};

export const removeByTotal = (
  dominoes: Domino[],
  total: number | string
): Domino[] => {
  const targetSum = Number(total);
  return dominoes.filter((domino) => domino[0] + domino[1] !== targetSum);
};
