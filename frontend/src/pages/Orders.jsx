import React, { useContext, useEffect, useRef, useState } from "react";
import { ShopContext } from "../Context/ShopContext";

function Orders() {
  const comp = useRef(null);
  const { fetchTotalCartSum, fetchOrderValues } = useContext(ShopContext);
  const [orderValues, setOrderValues] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.body.style.overflow = "auto";

    fetchTotalCartSum();
  }, []);

  useEffect(() => {
    const getOrderValues = async () => {
      try {
        const values = await fetchOrderValues();
        setOrderValues(values.reverse());
        setLoading(false);
      } catch (error) {
        console.error("Error fetching cart values:", error);
        setLoading(false);
      }
    };
    getOrderValues();
  }, []);

  return (
    <div
      ref={comp}
      className="mt-[7vh] md:max-w-[65vw] m-auto min-h-[100vh] pb-[10vh]"
    >
      <div className="text-3xl md:text-4xl py-5 px-2 font-bold">Orders</div>

      {loading && <p className="w-full text-center font-bold">Loading...</p>}

      {!loading && orderValues.length === 0 && (
        <div className="text-center mt-5">No orders placed yet</div>
      )}

      <div className="flex flex-col gap-5 font-semibold md:text-lg mx-1">
        {!loading &&
          orderValues.map((order, index) => {
            return (
              <div className="bg-gray-100 p-3 rounded-lg">
                <div className="flex justify-between">
                  <div className="text-lg md:text-xl">
                    Order ID: {order.orderId}
                  </div>
                  <div className="text-sm md:text-base">{order.date}</div>
                </div>
                <div
                  className={`${
                    index == 0 ? "text-red-500" : "text-green-600"
                  }`}
                >
                  Status: {index == 0 ? "Out for delivery" : "Delivered"}
                </div>
                <div className="bg-gray-200 py-1 px-3 rounded-lg">
                  {order.cartValues.map((cartItem) => {
                    return <div>{cartItem}</div>;
                  })}
                </div>
                <div className="text-sm md:text-base text-gray-700">
                  Shipping Address: {order.full_address}, {order.pincode}
                </div>
                <div className="text-sm md:text-base text-gray-700">
                  Order Total: ₹ {order.total}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default Orders;
