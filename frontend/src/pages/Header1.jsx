import gsap from "gsap";
import React, {
  useLayoutEffect,
  useRef,
  useContext,
  useState,
  useEffect,
} from "react";
import { BsBasket } from "react-icons/bs";
import { NavLink } from "react-router-dom";
import AuthPopup from "../components/AuthPopup";
import { ShopContext } from "../Context/ShopContext";

function Header1() {
  const [isLogin, setIsLogin] = useState(!!localStorage.getItem("auth-token")); // Check if auth token is present

  useEffect(() => {
    // Example: Fetch login status from an API
    const fetchLoginStatus = async () => {
      // Set isLogin based on the presence of auth token
      setIsLogin(!!localStorage.getItem("auth-token"));
    };
    // Call the function to fetch login status
    fetchLoginStatus();
  }, []);

  const { totalCartSum } = useContext(ShopContext); // Access totalCartSum and authToken from the context

  const img1 = useRef();
  const img2 = useRef();
  const img3 = useRef();
  const img4 = useRef();
  const login = useRef();
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

  const comp = useRef(null);

  useEffect(() => {}, [totalCartSum]);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline();
      tl.from(
        ["#logo", "#brand-name", ".login", "#cart-icon", "#hamburgerMenu"],
        {
          opacity: 0,
          y: "-=30",
          stagger: 0.1,
          onComplete: () => {
            gsap.set(
              [
                "#logo",
                "#brand-name",
                ".login",
                "#cart-icon",
                "#hamburgerMenu",
              ],
              { clearProps: "all" }
            );
          },
        }
      );
    }, comp);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <div
        ref={comp}
        className="h-[7vh] flex justify-between text-white fixed w-full top-0 font-bold shadow-xl bg-black px-3 z-20"
      >
        <div className="flex items-center gap-5">
          <img
            id="logo"
            className="h-[6vh] rounded-[50%] cursor-pointer"
            src="/assets/logo.png"
            alt="logo"
          />
          <div id="brand-name" className="text-2xl">
            TEA HARMONY
          </div>
        </div>
        <div className="flex items-center text-4xl gap-5">
          <div ref={login} className="login">
            <AuthPopup />
          </div>

          {isLogin && (
            <NavLink to="/cart">
              <div className="relative">
                <BsBasket className=" cursor-pointer h-[4vh]" id="cart-icon" />
                <div className=" text-base absolute top-0 right-0 bg-[#05B3A4] font-mono mr-[-12px] mt-[-5px] h-6 w-6 text-black text-center rounded-[50%]">
                  {totalCartSum}
                </div>
              </div>
            </NavLink>
          )}
          <div onClick={handleButtonEvent} ref={menuBtnRef} id="hamburgerMenu">
            <div></div>
          </div>
        </div>
      </div>

      {/* nav menu */}
      <div
        ref={navigationMenu}
        className="h-[93vh] w-[100vw]   overflow-hidden bg-green fixed bottom-0 z-50  left-[100vw]  transform  ease-in-out duration-500"
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
              <NavLink to="/teaware">
                <div className=" block w-min">
                  <div className="tag font-bold italic">Teaware</div>
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

export default Header1;
