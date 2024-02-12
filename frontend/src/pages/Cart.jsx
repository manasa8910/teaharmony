import React, {
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { ShopContext } from "../Context/ShopContext";
import { MdClear } from "react-icons/md";
import { FaPlus, FaMinus } from "react-icons/fa6";
import { NavLink } from "react-router-dom";
import { IoCaretForwardCircleSharp } from "react-icons/io5";

function Cart() {
  const { fetchCartValues, updateCart, clearCartData, all_product } =
    useContext(ShopContext);
  const [cartValues, setCartValues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [rzpAmount, setRzpAmount] = useState(0);
  const [orderData, setOrderData] = useState({
    orderId: "OTQEZ" + Math.round(Math.random() * 100000000),
    date: formatDateTime(new Date()),
    cartValues: [],
    full_address: "",
    pincode: "",
    total: 0,
  });
  const comp = useRef(null);
  const audio = new Audio("./assets/bill/billAudio.mp3");
  let cartTotal = 0;

  function formatDateTime(date) {
    const options = {
      month: "long",
      year: "numeric",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
      date
    );

    return formattedDate;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const values = await fetchCartValues();
        setCartValues(values);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching cart values:", error);
        setLoading(false);
        setError("Error fetching cart values");
      }
    };

    fetchData();
  }, [fetchCartValues]);

  useEffect(() => {
    let total = 0;
    const localCartValues = [];
    cartValues.forEach((item) => {
      const product = all_product.find((prod) => prod.id === Number(item.key));
      if (product) {
        total += product.price * item.value;
        localCartValues.push(`${product.name} X ${item.value}`);
      }
    });
    setRzpAmount(total);
    setOrderData((prevOrderData) => ({
      ...prevOrderData,
      cartValues: localCartValues,
      total: total,
    }));
  }, [cartValues, all_product]);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.body.style.overflow = "auto";
  }, []);

  const changeHandler = (e) => {
    setOrderData({ ...orderData, [e.target.name]: e.target.value });
  };

  // Function to send order data
  function sendOrderData() {
    fetch("https://tea-harmony.onrender.com/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("auth-token"),
      },
      body: JSON.stringify({ order: orderData }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          console.log("Order placed successfully");
        } else {
          console.error("Failed to place order:", data.error);
        }
      })
      .catch((error) => {
        console.error("Error placing order:", error);
      });
  }

  // Function to open Razorpay payment gateway
  function razorpayOpen(e) {
    if (
      !orderData.full_address ||
      !orderData.pincode ||
      !/^\d{6}$/.test(orderData.pincode)
    ) {
      setError("Please enter a valid full address and a 6-digit pincode.");
      return;
    }
    setError("");

    let options = {
      key: "rzp_test_LyC1wKuL5Kr9Cz",
      amount: rzpAmount * 100,
      currency: "INR",
      name: "Tea Harmony",
      description: "Order Payment",
      image: "./assets/logo.png",
      handler: function (response) {
        console.log("success");
        sendOrderData();
        showReceipt();
      },
      prefill: {
        name: "test",
        email: "test@email.com",
        contact: "7569878965",
      },
      notes: {
        address: "",
      },
      theme: {
        color: "#05B3A4",
      },
    };

    let rzp = new Razorpay(options);
    rzp.open();
    e.preventDefault();
    clearCartData();
  }

  // Function to show receipt animation
  function showReceipt() {
    document.getElementById("animateBill").style.display = "flex";
    audio.play();
    scrollTo(0, 0);
  }

  return (
    <>
      {/* Cart */}
      <div ref={comp} className="mt-[7vh] md:max-w-[65vw] m-auto">
        <div className="font-bold text-xl md:text-4xl px-1 pt-5 ">
          Order Summary
        </div>
        <div
          className=" font-bold md:text-lg flex flex-col gap-3 min-h-[93vh] max-h-full
     items-center "
        >
          {!loading && cartValues.length !== 0 && (
            <div className="flex mt-2 py-2 bg-gray-200 w-full items-center px-1 md:justify-around mb-3">
              <p className="min-w-[15vh] ">Product</p>
              <p className="w-[500px] ml-[-5vh] md:ml-[-7vh]">Name</p>
              <p className="hidden md:block min-w-[80px] md:ml-[-3vh]">
                Quantity
              </p>
              <p className="min-w-[60px] mr-[7vh]">Price</p>
              <p className="hidden md:block">Clear</p>
            </div>
          )}
          {loading && <p className="pt-[3vh]">Loading...</p>}

          {!loading && cartValues.length === 0 && (
            <div className="text-center mt-5">No items in your cart</div>
          )}

          {!loading &&
            cartValues.map((item) => {
              const product = all_product.find(
                (prod) => prod.id === Number(item.key)
              );
              cartTotal += product.price * item.value;

              // Conditional rendering based on product existence
              return (
                product && (
                  <div
                    className="flex justify-around w-full md:items-center gap-1 md:gap-3"
                    key={item.key}
                  >
                    <img
                      className="h-[10vh] min-w-[10vh] md:h-[15vh] rounded-md md:w-[15vh] object-contain"
                      src={product.img1}
                      alt="product img"
                    />
                    <p className="text-sm  md:text-lg w-[500px]">
                      {product.name}
                    </p>
                    {/* Quantity */}
                    <div className="flex flex-col md:flex-row md:justify-center gap-1 md:gap-[4vw] md:items-center">
                      <div className="flex rounded-md px-[10px] py-1 items-center justify-between gap-2 bg-[#05B3A4] min-w-[80px]">
                        <FaMinus
                          className=" cursor-pointer text-sm hover:scale-125 duration-200"
                          onClick={() => {
                            updateCart(product.id, "dec");
                          }}
                        />
                        <span>{item.value}</span>
                        <FaPlus
                          className=" cursor-pointer text-sm hover:scale-125 duration-200"
                          onClick={() => {
                            updateCart(product.id, "inc");
                          }}
                        />
                      </div>
                      <p className="min-w-[60px] text-sm md:text-lg">
                        ₹ {product.price * item.value}
                      </p>
                    </div>

                    <MdClear
                      className="cursor-pointer w-24 hover:text-red-700 hover:scale-125 duration-200
                      "
                      onClick={() => {
                        updateCart(product.id, "clear");
                      }}
                    />
                  </div>
                )
              );
            })}

          {cartValues.length !== 0 && (
            <>
              <div className="border-t-[1px] border-gray-400 w-full"></div>

              <div className="flex mt-2  justify-around w-full items-center gap-3">
                <p className="w-[15vh] px-1">Total</p>
                <p className="w-[500px]  px-2"></p>

                <p className="min-w-[80px] px-2"></p>
                <p className="min-w-[80px] mr-[4vh] md:ml-[-10vh]  px-2">
                  ₹ {cartTotal}
                </p>
                <p></p>
              </div>

              <div className="border-t-[1px] border-gray-400 w-full"></div>
            </>
          )}

          {cartValues.length !== 0 && (
            <div className="w-full flex flex-col items-end gap-5 mb-20 mt-5 px-1 ">
              <input
                className="w-full md:w-1/2 p-2 border rounded"
                placeholder="Enter Full Address"
                name="full_address"
                value={orderData.full_address}
                onChange={changeHandler}
              />

              <input
                className="w-full md:w-1/2 p-2 border rounded"
                placeholder="Enter Pincode"
                name="pincode"
                value={orderData.pincode}
                onChange={changeHandler}
              />
              {error && (
                <div className=" w-1/2 text-center text-red-500 mt-2">
                  {error}
                </div>
              )}
              <button
                // onClick={showReciept}
                // onClick={sendOrderData}
                onClick={razorpayOpen}
                className="w-full md:w-1/2 rounded-md py-2 bg-[#05B3A4] text-xl flex justify-center items-center gap-2"
              >
                Buy now
                <span className="arrow">
                  <IoCaretForwardCircleSharp />
                </span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Bill animation */}
      <div
        id="animateBill"
        className=" hidden fixed top-0  z-30 bg-black text-white bg-opacity-90 w-[100vw] h-[100vh]  justify-center items-center"
      >
        <img
          className=" w-[320px] md:w-[600px]  absolute bottom-0"
          src="./assets/bill/bill.png"
          alt=""
        />

        <div
          className=" 
           absolute bottom-[168px] md:bottom-[315px]  h-[50vh] overflow-hidden bg-pink- w-[19vh]  md:w-[31vh] flex justify-center items-center mr-[85.5px] md:mr-[163px] "
        >
          <img
            src="./assets/bill/billfront.png"
            className=" absolute w-full  z-30 opacity-70 bottom-[-1px] "
          />
          <div
            id="bill"
            className="bottom-[-292px] h-[38vh] md:h-[36vh] w-[125px] md:w-[200px] absolute text-black  transition-transform duration-1000 delay-1000 ease-in-out"
          >
            <img className="mb-[-1px]" src="./assets/bill/billtop.png" alt="" />
            <div className="font-sans h-full flex flex-col items-center w-full bg-white  text-[12px]">
              <p className=" font-bold text-[15px] md:text-[22px] text-center mt-2">
                TEA HARMONY
              </p>
              <p className="md:hidden">* * * * * * * * * * * * * *</p>
              <p className="hidden md:block">
                * * * * * * * * * * * * * * * * * * * *
              </p>
              <p>CASH RECEIPT</p>
              <p className="md:hidden">* * * * * * * * * * * * * *</p>
              <p className="hidden md:block">
                * * * * * * * * * * * * * * * * * * * *
              </p>
              <NavLink to="/">
                <div className="hover:underline hover:scale-[1.15] duration-300 cursor-pointer my-1 font-bold">
                  Back to Home
                </div>
              </NavLink>
              <NavLink to="/orders">
                <div className="hover:underline hover:scale-[1.15] duration-300 cursor-pointer my-1 font-bold">
                  Go to Orders
                </div>
              </NavLink>
              <p className="md:hidden">* * * * * * * * * * * * * *</p>
              <p className="hidden md:block">
                * * * * * * * * * * * * * * * * * * * *
              </p>{" "}
              <div className="md:hidden">
                Total &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; ₹
                {cartTotal}
              </div>
              <div className="hidden md:block">
                Total &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; ₹ {cartTotal}
              </div>
              <p className="md:hidden">* * * * * * * * * * * * * *</p>
              <p className="hidden md:block">
                * * * * * * * * * * * * * * * * * * * *
              </p>
              <p>THANK YOU</p>
              <img className="w-[120px] mt-2" src="./assets/bill/barcode.png" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cart;
