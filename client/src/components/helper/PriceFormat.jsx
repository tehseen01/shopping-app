const PriceFormat = ({ price }) => {
  return Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 0,
    style: "currency",
    currency: "INR",
  }).format(price);
};

export default PriceFormat;
