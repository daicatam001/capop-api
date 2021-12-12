const toCurrency = (number) => {
  return (
    number.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }) + "đ"
  );
};

module.exports = {
  toCurrency,
};
