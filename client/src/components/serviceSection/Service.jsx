import { CiDiscount1, CiGift } from "react-icons/ci";
import {
  MdPayment,
  MdOutlineHeadsetMic,
  MdOutlineLocalShipping,
} from "react-icons/md";
import { TbDiscount2 } from "react-icons/tb";
import "./service.scss";

const Service = () => {
  return (
    <div className="serviceSection">
      <ul>
        <li>
          <MdOutlineLocalShipping />
          <p>Free shipping</p>
          <span>From all orders $100</span>
        </li>
        <li>
          <CiGift />
          <p>Daily surprise offers</p>
          <span>Save upto 25% off</span>
        </li>
        <li>
          <MdOutlineHeadsetMic />
          <p>Support 24/7</p>
          <span>Shop with an export</span>
        </li>
        <li>
          <TbDiscount2 />
          <p>Affordable price</p>
          <span>Get factory direct price</span>
        </li>
        <li>
          <MdPayment />
          <p>Secure payments</p>
          <span>100% protected payments</span>
        </li>
      </ul>
    </div>
  );
};

export default Service;
