import React, { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../Context/ShopContext";
import Carousel from "../components/Carousel";
import StarRating from "../components/StarRating";
import { FaPlus, FaMinus } from "react-icons/fa6";

function Product() {
  const { all_product, loading, updateCart, togglePopup } =
    useContext(ShopContext);
  const { productId } = useParams();
  const [quantity, setQuantity] = useState(0);
  const isLogin = !!localStorage.getItem("auth-token"); // Check if auth token is present
  const addToCartBtn = useRef(null);
  const incDecBtn = useRef(null);
  const { totalCartSum } = useContext(ShopContext);

  useEffect(() => {
    // Fetch cart data for the current product when component mounts
    const fetchCartData = async () => {
      try {
        const authToken = localStorage.getItem("auth-token");
        if (authToken) {
          const response = await fetch(
            `http://localhost:4000/cart/${productId}`,
            {
              method: "GET",
              headers: {
                Accept: "application/json",
                "auth-token": authToken,
              },
            }
          );

          if (response.ok) {
            const data = await response.json();
            setQuantity(data.quantity);
          } else {
            console.error("Failed to fetch cart data");
          }
        }
      } catch (error) {
        console.error("Error fetching cart data:", error);
      }
    };

    if (isLogin) {
      fetchCartData();
    }
  }, [productId, isLogin]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const product = all_product.find((e) => e.id === Number(productId));
  const images = [product.img1, product.img2, product.img3];

  return (
    <div className="flex mt-[7vh] justify-center h-screen">
      <div className="flex">
        {/* Left Section - Images */}
        <div className="min-w-[60%] h-[91.5vh]">
          <Carousel images={images} />
        </div>
        {/* Right Section - Product Information */}
        <div className="flex-2 p-4 bg-white ml-10">
          <h2 className="text-2xl font-bold mr-20">{product.name}</h2>
          <div className="flex items-center"></div>

          <div className="flex gap-1">
            <StarRating
              rating={
                Math.round(
                  (product.rating.reduce(
                    (acc, currValue) => acc + currValue,
                    0
                  ) /
                    product.rating.length) *
                    100
                ) / 100
              }
            />
            <span className="text-sm font-semibold">
              ({product.rating.length})
            </span>
          </div>

          <p className="text-gray-600 mb-2 font-semibold mt-2">
            Category: {product.category}
          </p>

          <p className="text-lg font-bold text-green mb-2">₹ {product.price}</p>
          {/* Conditional rendering based on the presence of auth token */}
          {isLogin ? (
            quantity === 0 ? (
              <button
                ref={addToCartBtn}
                onClick={() => {
                  setQuantity((prevQty) => prevQty + 1);
                  updateCart(product.id, "inc");
                }}
                className={`bg-green text-white px-5 w-32 rounded-2xl py-2`}
              >
                Add to Cart
              </button>
            ) : (
              <div
                ref={incDecBtn}
                className={`flex bg-green text-white px-5 rounded-2xl py-2 w-32 gap-5 items-center justify-center`}
              >
                <FaMinus
                  className=" cursor-pointer"
                  onClick={() => {
                    setQuantity((prevQty) => prevQty - 1);
                    updateCart(product.id, "dec");
                  }}
                />
                <span>{quantity}</span>
                <FaPlus
                  className=" cursor-pointer"
                  onClick={() => {
                    setQuantity((prevQty) => prevQty + 1);
                    updateCart(product.id, "inc");
                  }}
                />
              </div>
            )
          ) : (
            <div>
              <button
                onClick={() => togglePopup(true)}
                className="bg-green text-white px-5 w-32 rounded-2xl py-2"
              >
                Add to Cart
              </button>
            </div>
          )}
          {/* Product Description */}
          <div className="mt-4 mr-20">
            <p className="text-gray-700 font-semibold text-lg">
              {product.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;
