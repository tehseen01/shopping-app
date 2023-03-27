import "./counter.scss";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";

const Counter = ({ quantity, inc, dec, stock }) => {
  return (
    <div className="counter">
      <button onClick={dec} disabled={quantity <= 1} className="dec">
        <AiOutlineMinus />
      </button>
      <span>{quantity}</span>
      <button onClick={inc} disabled={quantity >= stock} className="inc">
        <AiOutlinePlus />
      </button>
    </div>
  );
};

export default Counter;
