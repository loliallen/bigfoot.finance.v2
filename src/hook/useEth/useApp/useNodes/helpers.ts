const COUNT = 100;

export const getCurrentNodesPrice = (created: number) => {
  const delta = Math.floor(created / COUNT);

  const left = COUNT - (created % 100);
  const price = (delta + 1) * COUNT;
  return [left, price];
};
