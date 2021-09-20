export const shuffle = <T>(array: T[]): T[] => {
  const sequence = [...array];

  let last = sequence.length,
    pick,
    temp;

  while (last) {
    pick = Math.floor(Math.random() * last--);

    temp = sequence[pick];
    sequence[pick] = sequence[last];
    sequence[last] = temp;
  }

  return sequence;
};
