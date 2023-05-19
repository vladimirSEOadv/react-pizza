export const calculatePrice = ({
  currentType,
  currentSize,
  basePrice,
  sizes,
}) => {
  let newPrice = basePrice;
  if (currentType === "традиционное") {
    newPrice += basePrice * 0.2;
  }
  if (currentSize !== sizes[0]) {
    const costOfOneCentimeter = basePrice / sizes[0];
    const difference = currentSize - sizes[0];
    newPrice += Math.round(costOfOneCentimeter * difference);
  }
  return newPrice;
};
