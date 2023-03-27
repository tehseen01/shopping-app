import { useSelector } from "react-redux";

const useUnique = () => {
  const { products } = useSelector((state) => state.products);

  const uniqueValue = (data, index) => {
    let value = data.map((product) => product?.[index]);

    if (index === "category") {
      value = ["all", ...new Set(value)];
    }

    return (value = [...new Set(value)]);
  };

  const brands = uniqueValue(products, "company");
  const category = uniqueValue(products, "category");
  return { brands, category };
};

export default useUnique;
