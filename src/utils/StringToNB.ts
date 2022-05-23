const StringToBN = (number: string, decimals: number) => {
  if (!number) return "";
  const afterDot = number.split(".")[1];
  const beforeDot = number.split(".")[0];
  if (!number.includes(".")) {
    return beforeDot + Array.from(new Array(decimals + 1)).join("0");
  }
  if (afterDot.length > decimals) {
    return (
      beforeDot +
      afterDot.slice(0, decimals) +
      "." +
      afterDot.slice(decimals, afterDot.length)
    );
  }
  return (
    beforeDot +
    afterDot +
    Array.from(new Array(decimals - afterDot.length + 1)).join("0")
  );
};
export default StringToBN;
