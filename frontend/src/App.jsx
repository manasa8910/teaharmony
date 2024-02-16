import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

import Footer from "./components/Footer";
import Header from "./components/Header";
const Home = lazy(() => import("./pages/Home"));
const AboutUs = lazy(() => import("./pages/AboutUs"));
const Orders = lazy(() => import("./pages/Orders"));
const ProductDisplay = lazy(() => import("./pages/ProductDisplay"));
const Cart = lazy(() => import("./pages/Cart"));
const Product = lazy(() => import("./pages/Product"));

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Suspense
          fallback={
            <div className="bg-black h-[100vh] w-[100vw] flex items-center justify-center text-white font-bold text-lg">
              Loading...
            </div>
          }
        >
          <div className="bg-black">
            <Routes>
              <Route exact path="/" element={<Home />} />
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

              <Route path="/product" element={<Product />}>
                <Route path=":productId" element={<Product />}></Route>
              </Route>
            </Routes>
          </div>
        </Suspense>

        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
