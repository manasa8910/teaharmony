import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home1 from "./pages/Home1";

import AboutUs from "./pages/AboutUs";
import Product from "./pages/Product";

import Footer from "./components/Footer";
import Header1 from "./pages/Header1";
import Cart from "./pages/Cart";
import ProductDisplay from "./pages/ProductDisplay";
import Orders from "./pages/Orders";

const Loader = () => {
  return (
    <div className="bg-black h-[100vh] w-[100vw] flex justify-center items-center font-sans font-bold text-white text-4xl">
      Loading...
    </div>
  );
};
function App() {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(false);
  });
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <BrowserRouter>
            <Header1 />
            {/* <Header /> */}

            <Routes>
              <Route exact path="/" element={<Home1 />} />
              {/* <Route exact path="/" element={<Home />} /> */}
              <Route exact path="/about" element={<AboutUs />} />
              <Route exact path="/orders" element={<Orders />} />

              <Route
                exact
                path="/tea"
                element={<ProductDisplay type="Tea" />}
              />
              <Route
                exact
                path="/teaware"
                element={<ProductDisplay type="Teaware" />}
              />
              <Route exact path="/cart" element={<Cart />} />

              <Route path="product" element={<Product />}>
                <Route path=":productId" element={<Product />}></Route>
              </Route>
            </Routes>

            <Footer />
          </BrowserRouter>
        </div>
      )}
    </>
  );
}

export default App;
