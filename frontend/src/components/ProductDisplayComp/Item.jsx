import React from "react";
import StarRating from "../StarRating";
import { Link } from "react-router-dom";

function Item(props) {
  return (
    <Link to={`/product/${props.id}`}>
      <div className="">
        <div className="w-[320px] p-2 shadow-md rounded-xl mb-4 min-h-[470px] hover:bg-gray-100 hover:scale-105 transform duration-100 ease-in-out cursor-pointer ">
          <img
            src={props.image}
            alt={props.name}
            className="h-[300px] w-full mb-2 object-cover rounded-xl "
          />
          <h3 className="text-lg font-semibold">{props.name}</h3>
          <p className="text-gray-500">{props.category}</p>
          <div className="flex items-center">
            <span className="text-yellow-500">
              <StarRating rating={props.rating} />
            </span>
            <span className="ml-2">₹ {props.price}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default Item;
