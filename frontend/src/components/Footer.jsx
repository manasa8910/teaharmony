import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
  FaYoutube,
  FaEnvelope,
  FaPhone,
} from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";

function Footer() {
  return (
    <footer className="font-semibold relative w-full h-full bg-[#05b3a4] mt-28  p-4 sm:p-8 text-black  z-20">
      <div className="waves">
        <div className="wave" id="wave1"></div>
        <div className="wave" id="wave2"></div>
        <div className="wave" id="wave3"></div>
        <div className="wave" id="wave4"></div>
      </div>

      <div className="container mx-auto flex flex-col sm:grid sm:grid-cols-4 gap-4">
        <div className="mb-4 sm:mb-0">
          <h3 className="text-lg font-bold mb-2">Contact Us</h3>
          <div className="flex items-center mb-2">
            <FaLocationDot className="mr-2 text-green" />
            <p>TEA HARMONY, Sky Lane, Bangalore</p>
          </div>
          <div className="flex items-center mb-2">
            <FaPhone className="mr-2" />
            <p>(800) 973-1546</p>
          </div>
          <div className="flex items-center">
            <FaEnvelope className="mr-2" />
            <p>info@teaharmony.com</p>
          </div>
        </div>

        <div className="mb-4 sm:mb-0">
          <h3 className="text-lg font-bold mb-2">Quick Links</h3>
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/tea">Tea</a>
            </li>
            <li>
              <a href="/accessories">Accessories</a>
            </li>
            <li>
              <a href="/about">About Us</a>
            </li>
          </ul>
        </div>

        <div className="mb-4 sm:mb-0">
          <h3 className="text-lg font-bold mb-2">Connect With Us</h3>
          <div className="flex space-x-4">
            <a href="#" target="_blank" rel="noopener noreferrer">
              <FaFacebook className="hover:scale-150 cursor-pointer transform duration-500 ease-in-out" />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <FaInstagram className="hover:scale-150 cursor-pointer transform duration-500 ease-in-out" />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <FaTwitter className="hover:scale-150 cursor-pointer transform duration-500 ease-in-out" />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <FaYoutube className="hover:scale-150 cursor-pointer transform duration-500 ease-in-out" />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <FaLinkedin className="hover:scale-150 cursor-pointer transform duration-500 ease-in-out" />
            </a>
          </div>
        </div>

        <div className="mb-4 sm:mb-0">
          <h3 className="text-lg font-bold mb-2">Newsletter Signup</h3>
          <form>
            <input
              type="email"
              placeholder="Your Email"
              className="w-full h-8 p-2 border rounded mb-2"
            />
            <button
              type="submit"
              className="bg-green h-8 text-white px-2  rounded hover:bg-red-800 w-full sm:w-auto"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className="mt-4 text-center">
        <p>
          <span className="text-lg font-bold">&copy;</span> 2023 Tea Harmony.
          All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
