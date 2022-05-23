const BNToString = (number: string, decimals: number) => {
  // "1000"
  // 4
  // --
  // 0.1
  if (number === "") return "";
  if (number === "0") return "0";
  const afterDot = number.substr(
    decimals > number.length ? 0 : number.length - decimals,
    number.length
  );
  const btwDot =
    decimals - number.length > 0
      ? Array.from(new Array(decimals - number.length + 1)).join("0")
      : "";
  const beforeDot =
    decimals - number.length >= 0
      ? "0"
      : number.substring(0, Math.abs(decimals - number.length));

  const lastZeros = afterDot.split("").reverse();
  let lastZI = 0;
  for (let i of lastZeros) {
    if (i === "0") lastZI += 1;
    else break;
  }
  if (!btwDot && !afterDot.slice(0, -1 * lastZI) && lastZI !== 0)
    return beforeDot;
  return `${beforeDot}.${btwDot}${
    lastZI === 0 ? afterDot : afterDot.slice(0, -1 * lastZI)
  }`;
};

export default BNToString;
