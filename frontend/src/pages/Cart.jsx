import React, { useContext, useEffect, useRef, useState } from "react";
import { ShopContext } from "../Context/ShopContext";
import { MdClear } from "react-icons/md";
import { FaPlus, FaMinus } from "react-icons/fa6";
import { NavLink } from "react-router-dom";

function Cart() {
  const { fetchCartValues, updateCart, clearCartData, all_product } =
    useContext(ShopContext);
  const [cartValues, setCartValues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  let cartTotal = 0;
  const audio = new Audio("./assets/bill/billAudio.mp3");
  const [rzpAmount, setRzpAmount] = useState(0);
  const [orderData, setOrderData] = useState({
    orderId: "OTQEZ" + Math.round(Math.random() * 100000000),
    date: formatDateTime(new Date()),
    cartValues: [],
    full_address: "",
    pincode: "",
    total: 0,
  });

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

  function sendOrderData() {
    fetch("http://localhost:4000/order", {
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
  useEffect(() => {
    let total = 0;
    const localCartValues = [];
    cartValues.forEach((item) => {
      const product = all_product.find((prod) => prod.id === Number(item.key));
      total += product.price * item.value;
      localCartValues.push(`${product.name} X ${item.value}`);
    });
    setRzpAmount(total);
    setOrderData((prevOrderData) => ({
      ...prevOrderData,
      cartValues: localCartValues,
      total: total,
    }));
  }, [cartValues]);

  const changeHandler = (e) => {
    setOrderData({ ...orderData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const getCartValues = async () => {
      try {
        const values = await fetchCartValues();
        setCartValues(values);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching cart values:", error);
        setLoading(false); // Ensure loading state is updated even in case of error
      }
    };
    //   const values = await fetchCartValues();
    //   setCartValues(values);
    //   setLoading(false);
    // };
    getCartValues();
  }, [fetchCartValues]);

  function showReciept() {
    document.getElementById("animateBill").style.display = "flex";
    audio.play();
    scrollTo(0, 0);
  }

  let options = {
    key: "rzp_test_LyC1wKuL5Kr9Cz", // Enter the Key ID generated from the Dashboard
    amount: rzpAmount * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    currency: "INR",
    name: "Tea Harmony", //your business name
    description: "Order Payment",
    image: "./assets/logo.png",
    handler: function (response) {
      console.log("success");
      sendOrderData();
      showReciept();
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
  let rzp1 = new Razorpay(options);
  rzp1.on("payment.failed", function (response) {
    alert(response.error.code);
    alert(response.error.description);
    alert(response.error.source);
    alert(response.error.step);
    alert(response.error.reason);
    alert(response.error.metadata.order_id);
    alert(response.error.metadata.payment_id);
  });

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

    rzp1.open();
    e.preventDefault();
    clearCartData();
  }

  return (
    <>
      {/* Cart */}
      <div className="mt-[7vh] max-w-[65vw] m-auto">
        <div className="font-bold text-4xl pt-5 ">Order Summary</div>
        <div
          className=" font-bold text-lg flex flex-col gap-3 min-h-[93vh] max-h-full
     items-center "
        >
          <div className="flex mt-2 py-2 bg-gray-200 justify-around w-full items-center gap-3">
            <p className="w-[15vh]">Product</p>
            <p className="w-[500px]  px-2">Name</p>
            <p className="min-w-[80px] px-2">Quantity</p>
            <p className="min-w-[80px]  px-2">Price</p>
            <p>Clear</p>
          </div>

          {loading && <p>Loading...</p>}
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
                    className="flex justify-around w-full items-center gap-3"
                    key={item.key}
                  >
                    <img
                      className="h-[15vh] rounded-md w-[15vh]"
                      src={product.img1}
                      alt="product img"
                    />
                    <p className="w-[500px]">{product.name}</p>
                    {/* Quantity */}
                    <div className="flex rounded-md px-[10px] py-1 items-center justify-between gap-2 bg-[#05B3A4] min-w-[80px]">
                      <FaMinus
                        className=" cursor-pointer text-sm"
                        onClick={() => {
                          updateCart(product.id, "dec");
                        }}
                      />
                      <span>{item.value}</span>
                      <FaPlus
                        className=" cursor-pointer text-sm"
                        onClick={() => {
                          updateCart(product.id, "inc");
                        }}
                      />
                    </div>

                    <p className="min-w-[80px]">{product.price * item.value}</p>
                    <MdClear
                      className="cursor-pointer text-xl"
                      onClick={() => {
                        updateCart(product.id, "clear");
                      }}
                    />
                  </div>
                )
              );
            })}
          <div className="border-t-[1px] border-gray-400 w-full"></div>

          <div className="flex mt-2  justify-around w-full items-center gap-3">
            <p className="w-[15vh]">Total</p>
            <p className="w-[500px]  px-2"></p>
            <p className="min-w-[80px] px-2"></p>
            <p className="min-w-[80px] ml-[-10vh]  px-2">₹ {cartTotal}</p>
            <p></p>
          </div>

          <div className="border-t-[1px] border-gray-400 w-full"></div>

          <input
            className="w-full p-2 border rounded"
            placeholder="Enter Full Address"
            name="full_address"
            value={orderData.full_address}
            onChange={changeHandler}
          />

          <input
            className="w-full p-2 border rounded"
            placeholder="Enter Pincode"
            name="pincode"
            value={orderData.pincode}
            onChange={changeHandler}
          />
          {error && <div className="text-red-500 mt-2">{error}</div>}
          <button
            // onClick={showReciept}
            // onClick={sendOrderData}
            onClick={razorpayOpen}
            className="bg-[#05B3A4]"
          >
            Buy now
          </button>
        </div>
      </div>

      {/* Bill animation */}
      <div
        id="animateBill"
        className=" hidden fixed top-0  z-20 bg-black text-white bg-opacity-90 w-[100vw] h-[100vh]  justify-center items-center"
      >
        <img
          className="w-[600px]  absolute bottom-0"
          src="./assets/bill/bill.png"
          alt=""
        />

        <div
          className=" 
           absolute  bottom-[315px]  h-[50vh] overflow-hidden  w-[31vh] flex justify-center items-center  mr-[163px] "
        >
          <img
            src="./assets/bill/billfront.png"
            className=" absolute w-full  z-30 opacity-70 bottom-[-1px] "
          />
          <div
            id="bill"
            className="bottom-[-292px] h-[36vh] w-[200px] absolute text-black  transition-transform duration-1000 delay-1000 ease-in-out"
          >
            <img className="mb-[-1px]" src="./assets/bill/billtop.png" alt="" />
            <div className="font-sans h-full flex flex-col items-center w-full bg-white text-[12px]">
              <p className=" font-bold text-[22px] text-center mt-2">
                TEA HARMONY
              </p>
              <p>* * * * * * * * * * * * * * * * * * * *</p>
              <p>CASH RECEIPT</p>
              <p>* * * * * * * * * * * * * * * * * * * *</p>
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

              <p>* * * * * * * * * * * * * * * * * * * *</p>
              <div>
                Total &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; ₹ {cartTotal}
              </div>
              <p>* * * * * * * * * * * * * * * * * * * *</p>
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
