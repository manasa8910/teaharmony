import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar as solidStar,
  faStarHalfAlt as halfStar,
  faStar as emptyStar,
} from "@fortawesome/free-solid-svg-icons";

const StarRating = ({ rating, totalStars = 5 }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  const renderStars = (count, type) => {
    return [...Array(count)].map((_, index) => (
      <FontAwesomeIcon key={index} icon={type} className="star" />
    ));
  };

  return (
    <div className="flex items-center">
      <div className="star-container text-gray-300">
        {renderStars(totalStars - fullStars - (hasHalfStar ? 1 : 0), emptyStar)}
      </div>
      <div className="star-container text-yellow-400">
        {renderStars(fullStars, solidStar)}
        {hasHalfStar && <FontAwesomeIcon icon={halfStar} className="star" />}
      </div>
    </div>
  );
};

export default StarRating;
