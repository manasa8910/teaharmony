import React, {
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../Context/ShopContext";
import Carousel from "../components/ProductComp/Carousel";
import StarRating from "../components/StarRating";
import { FaPlus, FaMinus } from "react-icons/fa6";
import gsap from "gsap";

function Product() {
  const { all_product, loading, updateCart, togglePopup } =
    useContext(ShopContext);
  const { productId } = useParams();
  const [quantity, setQuantity] = useState(0);
  const isLogin = !!localStorage.getItem("auth-token"); // Check if auth token is present
  const addToCartBtn = useRef(null);
  const incDecBtn = useRef(null);

  const comp = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.body.style.overflow = "auto";
  }, []);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(".stagger", {
        opacity: 0,
        x: "50",
        stagger: 0.1,
        onComplete: () => {
          gsap.set(".stagger", { clearProps: "all" });
        },
      });
    }, comp);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    // Fetch cart data for the current product when component mounts
    const fetchCartData = async () => {
      try {
        const authToken = localStorage.getItem("auth-token");
        if (authToken) {
          const response = await fetch(
            `https://tea-harmony.onrender.com/cart/${productId}`,
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

  const images =
    product.type === "Teaware"
      ? [product.img1, product.img2, product.img3]
      : [product.img2, product.img3];

  return (
    <div
      ref={comp}
      className="flex lg:ml-7 mt-[7vh] justify-center min-h-[100vh] h-full"
    >
      <div className="flex flex-col lg:flex-row">
        {/* Left Section - Images */}
        <div className="min-w-[60%] lg:mt-1 lg:h-[91.5vh]">
          <Carousel images={images} />
        </div>

        {/* Right Section - Product Information */}
        <div className="flex-2 bg-white mt-2 lg:mt-10 mx-3 lg:ml-10">
          <h2 className="text-2xl lg:text-4xl font-bold lg:mr-20 stagger">
            {product.name}
          </h2>
          <div className="flex items-center"></div>

          <div className="flex gap-1 stagger">
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
            <span className="text-sm lg:text-base font-semibold">
              ({product.rating.length})
            </span>
          </div>

          <p className=" lg:text-xl text-gray-600 mb-2 font-semibold mt-2 stagger">
            Category: {product.category}
          </p>

          <p className="lg:text-2xl font-bold mb-2 stagger">
            ₹ {product.price}
          </p>
          {/* Conditional rendering based on the presence of auth token */}
          {isLogin ? (
            quantity === 0 ? (
              <button
                ref={addToCartBtn}
                onClick={() => {
                  setQuantity((prevQty) => prevQty + 1);
                  updateCart(product.id, "inc");
                }}
                className={`bg-[#05B3A4] font-bold px-2 lg:px-5 w-32 rounded-2xl py-1 lg:py-2 stagger`}
              >
                Add to Cart
              </button>
            ) : (
              <div
                ref={incDecBtn}
                className={`flex bg-[#05B3A4] font-bold px-2 lg:px-5 rounded-2xl py-1 lg:py-2 w-32 gap-5 items-center justify-center stagger`}
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
                className={`bg-[#05B3A4] font-bold px-2 lg:px-5 w-32 rounded-2xl py-1 lg:py-2 stagger`}
              >
                Add to Cart
              </button>
            </div>
          )}
          {/* Product Description */}
          <div className="mt-4 lg:mr-20">
            <p className="text-gray-700 font-semibold lg:text-2xl stagger">
              {product.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;
