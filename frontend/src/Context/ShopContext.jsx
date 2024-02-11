import React, { useState, createContext, useEffect } from "react";

export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {
  const [all_product, setAll_Product] = useState([]);
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [isLogin, setLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
  });
  const [loading, setLoading] = useState(true);
  const [totalCartSum, setTotalCartSum] = useState(0);
  const authToken = localStorage.getItem("auth-token");

  useEffect(() => {
    fetch("https://tea-harmony.onrender.com/allproducts").then((response) => {
      response.json().then((data) => {
        console.log("fetched");
        setAll_Product(data);
        setLoading(false);
      });
    });
  }, []);

  const fetchTotalCartSum = async () => {
    if (authToken) {
      try {
        const response = await fetch("https://tea-harmony.onrender.com/user", {
          method: "GET",
          headers: {
            Accept: "application/json",
            "auth-token": authToken,
          },
        });

        if (response.ok) {
          const userData = await response.json();
          const cartData = userData.cartData || {};
          const sum = Object.values(cartData).reduce(
            (accumulator, currentValue) => accumulator + currentValue,
            0
          );
          setTotalCartSum(sum);
        } else {
          console.error("Failed to fetch user data");
        }
      } catch (error) {
        console.error("Error fetching total cart sum:", error);
      }
    } else {
      // Reset totalCartSum to 0 when user logs out
      setTotalCartSum(0);
    }
  };

  const fetchCartValues = async () => {
    if (authToken) {
      try {
        const response = await fetch("https://tea-harmony.onrender.com/user", {
          method: "GET",
          headers: {
            Accept: "application/json",
            "auth-token": authToken,
          },
        });

        if (response.ok) {
          const userData = await response.json();
          const cartData = userData.cartData || {};
          //loop through cart data
          return Object.entries(cartData)
            .filter(([key, value]) => value > 0)
            .map(([key, value]) => ({ key, value }));
        } else {
          console.error("Failed to fetch user data");
        }
      } catch (error) {
        console.error("Error fetching  cart Values:", error);
      }
    } else {
      prompt("please Sign in");
    }
  };

  const fetchOrderValues = async () => {
    if (authToken) {
      try {
        const response = await fetch("https://tea-harmony.onrender.com/user", {
          method: "GET",
          headers: {
            Accept: "application/json",
            "auth-token": authToken,
          },
        });

        if (response.ok) {
          const userData = await response.json();
          return userData.orderData || {};
          //loop through cart data
        } else {
          console.error("Failed to fetch order data");
        }
      } catch (error) {
        console.error("Error fetching  order Values:", error);
      }
    } else {
      prompt("please Sign in");
    }
  };

  useEffect(() => {
    fetchTotalCartSum();
  }, [authToken]);

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const login = async () => {
    console.log("login", formData);
    let responseData;
    await fetch("https://tea-harmony.onrender.com/login", {
      method: "POST",
      headers: {
        Accept: "application/form-data",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => (responseData = data));

    if (responseData.success) {
      localStorage.setItem("auth-token", responseData.token);
      console.log("logged in");
      window.location.replace(window.location.pathname);
    } else alert(responseData.errors);
  };

  const signup = async () => {
    console.log("signup", formData);
    let responseData;
    await fetch("https://tea-harmony.onrender.com/signup", {
      method: "POST",
      headers: {
        Accept: "application/form-data",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => (responseData = data));

    if (responseData.success) {
      localStorage.setItem("auth-token", responseData.token);
      window.location.replace(window.location.pathname);
    } else alert(responseData.errors);
  };

  const togglePopup = () => {
    setPopupVisible(!isPopupVisible);
  };

  const toggleForm = () => {
    setLogin(!isLogin);
  };

  const updateCart = async (itemId, operation) => {
    if (localStorage.getItem("auth-token")) {
      try {
        const response = await fetch("https://tea-harmony.onrender.com/cart", {
          method: "POST",
          headers: {
            Accept: "application/form-data",
            "auth-token": `${localStorage.getItem("auth-token")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ itemId, operation }),
        });

        if (response.ok) {
          const data = await response.json();
          console.log(data);
          // Call fetchTotalCartSum after the updateCart operation is completed
          fetchTotalCartSum();
        } else {
          console.error("Failed to update cart");
        }
      } catch (error) {
        console.error("Error updating cart:", error);
      }
    }
  };

  const fetchCartData = async (productId) => {
    try {
      const response = await fetch(
        `https://tea-harmony.onrender.com/cart/${productId}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "auth-token": localStorage.getItem("auth-token"),
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        console.error("Failed to fetch cart data");
        return { quantity: 0 };
      }
    } catch (error) {
      console.error("Error fetching cart data:", error);
      return { quantity: 0 };
    }
  };

  const clearCartData = async () => {
    try {
      const response = await fetch(
        "https://tea-harmony.onrender.com/clear-cart",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("auth-token"),
          },
        }
      );

      if (response.ok) {
        console.log("Cart data cleared successfully");
        x;
      } else {
        console.error("Failed to clear cart data");
      }
    } catch (error) {
      console.error("Error clearing cart data:", error);
    }
  };

  const contextValue = {
    all_product,
    updateCart,
    isPopupVisible,
    togglePopup,
    toggleForm,
    fetchCartData,
    login,
    signup,
    formData,
    changeHandler,
    isLogin,
    loading,
    totalCartSum, // Add totalCartSum to the context value
    fetchCartValues,
    fetchOrderValues,
    clearCartData,
    fetchTotalCartSum,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
