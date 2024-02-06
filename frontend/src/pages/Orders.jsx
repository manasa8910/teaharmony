import React, { useContext } from "react";
import { ShopContext } from "../Context/ShopContext";

function Orders() {
  const { fetchTotalCartSum } = useContext(ShopContext); //
  useEffect(() => {
    fetchTotalCartSum();
  }, []);
  return <div className="bg-blue-400 h-[100vh] mt-[7vh]">Orders</div>;
}

export default Orders;
