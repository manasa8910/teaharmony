import React, { useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import AuthPopup from "./AuthPopup";
function Header() {
  const img1 = useRef();
  const img2 = useRef();
  const img3 = useRef();
  const img4 = useRef();
  let menuOpen = false;
  const navigationMenu = useRef();
  const menuBtnRef = useRef();

  function handleButtonEvent() {
    const menuBtn = menuBtnRef.current;

    if (!menuOpen) {
      menuBtn.classList.add("open");
      menuOpen = true;
      navigationMenu.current.classList.remove("left-[100vw]");
      navigationMenu.current.classList.add("left-[0vw]");
      navigationMenu.current.classList.remove("delay-300");
      img1.current.classList.add("rotate-x-[-5deg]", "delay-500");
      img2.current.classList.add(
        "translate-y-[100px]",
        "scale-110",
        "rotate-x-[-6deg]",
        "delay-500"
      );
      img3.current.classList.add(
        "translate-y-[200px]",
        "scale-[1.2]",
        "rotate-x-[-7deg]",
        "delay-500"
      );
      img4.current.classList.add(
        "translate-y-[300px]",
        "scale-[1.3]",
        "rotate-x-[-8deg]",
        "delay-500"
      );
    } else {
      menuBtn.classList.remove("open");
      menuOpen = false;
      navigationMenu.current.classList.remove("left-[0vw]");
      navigationMenu.current.classList.add("left-[100vw]");
      navigationMenu.current.classList.add("delay-300");
      img1.current.classList.remove("rotate-x-[-5deg]", "delay-500");
      img2.current.classList.remove(
        "translate-y-[100px]",
        "scale-110",
        "rotate-x-[-6deg]",
        "delay-500"
      );
      img3.current.classList.remove(
        "translate-y-[200px]",
        "scale-[1.2]",
        "rotate-x-[-7deg]",
        "delay-500"
      );
      img4.current.classList.remove(
        "translate-y-[300px]",
        "scale-[1.3]",
        "rotate-x-[-8deg]",
        "delay-500"
      );
    }
  }
  const [isLoggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    // Perform authentication logic here
    // For simplicity, we'll just set isLoggedIn to true
    console.log("Logged in with user data:", userData);
    setLoggedIn(true);
  };

  const handleLogout = () => {
    // Perform logout logic here
    // For simplicity, we'll just set isLoggedIn to false
    setLoggedIn(false);
    // setUserData(null);
  };
  return (
    <>
      {/*Header Element*/}
      <div className=" flex justify-between items-center gap fixed top-0 z-50 h-16  w-full px-3 bg-white shadow-[0_20px_10px_-25px_rgba(0,0,0,0.3)]">
        <div className="flex gap-4 items-center">
          <img className="h-[60px] w-[60px] " src="../../assets/logo.png" />
          <div className="text-4xl font-bold   text-green">TEA HARMONY</div>
        </div>
        <div className="flex gap-3">
          <AuthPopup />
          {/* {isLoggedIn ? (
            <div>
              <button
                onClick={handleLogout}
                className="bg-green text-white font-bold h-min self-center px-8 py-1 text-lg rounded-3xl"
              >
                Logout
              </button>
            </div>
          ) : (
            <div>
              <AuthPopup onLogin={handleLogin} />
            </div>
          )} */}

          <div className="flex">
            <img className="h-[50px]" src="../../assets/cart.png" alt="" />
            <div className="bg-red-600 h-min rounded-2xl  w-6 text-center text-white font-bold mx-[-10px]">
              2
            </div>
          </div>
          {/*nav icon*/}
          <div
            onClick={handleButtonEvent}
            ref={menuBtnRef}
            className="menu-btn"
          >
            <div className="menu-btn__burger"></div>
          </div>
        </div>
      </div>

      {/* nav menu */}
      <div
        ref={navigationMenu}
        className="h-[91.5vh] w-[100vw]   overflow-hidden bg-green fixed bottom-0 z-50  left-[100vw]  transform  ease-in-out duration-500"
      >
        <div className="overflow-hidden w-full h-full mt-4">
          <div className=" m-auto w-1/2  relative perspective-[200px]">
            <div
              onClick={handleButtonEvent}
              ref={img1}
              className=" absolute transform transform-style-3d   duration-500  "
            >
              <NavLink to="/">
                <div className=" block w-min">
                  <div className="tag font-bold italic">Home</div>
                </div>
                <img
                  className=" h-[500px] w-[800px] object-cover"
                  src="../../assets/navImages/OIG.jpeg"
                  alt=""
                />
              </NavLink>
            </div>

            <div
              ref={img2}
              onClick={handleButtonEvent}
              className=" absolute transform transform-style-3d    duration-500   "
            >
              <NavLink to="/tea">
                <div className=" block w-min">
                  <div className="tag font-bold italic">Tea Collections</div>
                </div>
                <img
                  className=" h-[500px] w-[800px] object-cover"
                  src="../../assets/navImages/OIG.jpeg"
                  alt=""
                />
              </NavLink>
            </div>
            <div
              ref={img3}
              onClick={handleButtonEvent}
              className=" absolute transform transform-style-3d  
             duration-500  "
            >
              <NavLink to="/accessories">
                <div className=" block w-min">
                  <div className="tag font-bold italic">Accessories</div>
                </div>
                <img
                  className=" h-[500px] w-[800px] object-cover"
                  src="../../assets/navImages/OIG.jpeg"
                  alt=""
                />
              </NavLink>
            </div>
            <div
              ref={img4}
              onClick={handleButtonEvent}
              className=" absolute transform transform-style-3d  duration-500    "
            >
              <NavLink to="/about">
                <div className=" block w-min">
                  <div className="tag font-bold italic">About Us</div>
                </div>
                <img
                  className=" h-[500px] w-[800px] object-cover"
                  src="../../assets/navImages/OIG.jpeg"
                  alt=""
                />
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
