import React, { useContext, useState } from "react";
import { ShopContext } from "../Context/ShopContext";
import { IoCloseSharp, IoPersonOutline } from "react-icons/io5";
import { NavLink } from "react-router-dom";

const AuthPopup = () => {
  const {
    isPopupVisible,
    togglePopup,
    toggleForm,
    login,
    signup,
    formData,
    changeHandler,
    isLogin,
  } = useContext(ShopContext);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const handleButtonClick = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  return (
    <div className="text-lg text-black ">
      {localStorage.getItem("auth-token") ? (
        <>
          <div className="relative hidden md:block">
            <IoPersonOutline
              className="cursor-pointer scale-[1.8] text-white"
              onClick={handleButtonClick}
            />
            {isDropdownVisible && (
              <div className=" absolute top-10 p-1 px-4 bg-white text-black font-bold text-[20px] rounded shadow-lg">
                <NavLink onClick={handleButtonClick} to="/orders">
                  <p
                    className="hover:text-green 
                  hover:scale-110 duration-150"
                  >
                    Orders
                  </p>
                </NavLink>
                <hr />
                <p
                  onClick={() => {
                    localStorage.removeItem("auth-token");
                    window.location.replace("/");
                  }}
                  className="hover:text-green cursor-pointer
                  hover:scale-110 duration-150"
                >
                  Logout
                </p>
              </div>
            )}
          </div>
          <div
            onClick={() => {
              localStorage.removeItem("auth-token");
              window.location.replace("/");
            }}
            className="md:hidden text-white"
          >
            Logout
          </div>
        </>
      ) : (
        <button
          onClick={togglePopup}
          className="w-[10vh] h-[4vh] outline-none border-white md:border-[1px] text-white text-lg cursor-pointer rounded-[75px] md:sweepRight"
        >
          Login
        </button>
      )}

      {isPopupVisible && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-gray-50 p-8 rounded shadow-md">
            <div className="flex justify-end">
              <button
                onClick={togglePopup}
                className="text-gray-700 font-bold hover:text-red-500"
              >
                <IoCloseSharp />
              </button>
            </div>

            {isLogin ? (
              <>
                <h2 className="text-2xl font-bold mb-4">Login</h2>
                <div>
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="email"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      className="w-full p-2 border rounded"
                      placeholder="Enter your email"
                      name="email"
                      value={formData.email}
                      onChange={changeHandler}
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="password"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      className="w-full p-2 border rounded"
                      placeholder="Enter your password"
                      name="password"
                      value={formData.password}
                      onChange={changeHandler}
                    />
                  </div>
                  <button
                    onClick={() => {
                      isLogin ? login() : signup();
                    }}
                    className="bg-[#05B3A4] px-4 py-2 rounded"
                  >
                    Login
                  </button>
                </div>
                <p className="mt-4  cursor-pointer">
                  Don't have an account?
                  <span onClick={toggleForm} className="text-[#05B3A4]">
                    &nbsp; Create one
                  </span>
                </p>
              </>
            ) : (
              <>
                <h2 className="text-2xl font-bold mb-4">Sign up</h2>
                <div>
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="username"
                    >
                      Username
                    </label>
                    <input
                      type="text"
                      className="w-full p-2 border rounded"
                      placeholder="Enter your username"
                      name="username"
                      value={formData.username}
                      onChange={changeHandler}
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="email"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      className="w-full p-2 border rounded"
                      placeholder="Enter your email"
                      name="email"
                      value={formData.email}
                      onChange={changeHandler}
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="password"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      className="w-full p-2 border rounded"
                      placeholder="Enter your password"
                      name="password"
                      value={formData.password}
                      onChange={changeHandler}
                    />
                  </div>
                  <button
                    // type="submit"
                    onClick={() => {
                      isLogin ? login() : signup();
                    }}
                    className="bg-[#05B3A4] px-4 py-2 rounded"
                  >
                    Sign up
                  </button>
                  <p className="mt-4  cursor-pointer">
                    Already have an account?
                    <span onClick={toggleForm} className="text-[#05B3A4]">
                      &nbsp; Login
                    </span>
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AuthPopup;
