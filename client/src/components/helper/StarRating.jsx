import { BsStar, BsStarHalf, BsStarFill } from "react-icons/bs";

const StarRating = ({ stars }) => {
  const ratingArray = Array.from({ length: 5 }, (value, index) => {
    let num = index + 0.5;
    return (
      <span key={index} className="ratingStars">
        {stars >= index + 1 ? (
          <BsStarFill />
        ) : stars > num ? (
          <BsStarHalf />
        ) : (
          <BsStar />
        )}
      </span>
    );
  });

  return (
    <div style={{ display: "inline-block", padding: "0.3rem 0" }}>
      {ratingArray}
    </div>
  );
};

export default StarRating;
