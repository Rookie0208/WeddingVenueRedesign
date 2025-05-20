import "./navbar.css";
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaUser, FaBell, FaBars, FaTimes } from "react-icons/fa";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { FaEnvelope, FaEdit } from "react-icons/fa";
import ReviewModal from "./ReviewModal";

import Logo from "../../public/abdul/sitelogo3_squared.png";
import MiniLogo from "../../public/W.png";

const NavBar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const role = useSelector((state: RootState) => state?.auth?.user?.role);
  const location = useLocation();
  const currentPath = location.pathname;
  // const [opacity, setOpacity] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleModalOpen = () => setIsModalOpen(true);
  const handleModalClose = () => setIsModalOpen(false);

  let url = "/";
  if (role === "vendor") url = "/vendorProfilePage";
  if (role === "venue") url = "/venueProfilePage";
  if (role === "user") url = "/userProfilePage";
  if (role === "admin") url = "/adminDashboard";

  useEffect(() => {
    const handleScroll = () => {
      if (currentPath === "/") {
        if (window.scrollY > 50 && window.scrollY < 750) {
          // desired scroll threshold
          // setOpacity(0.9); // Set to full opacity after scrolling
        } else {
          // setOpacity(1); // Default opacity
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [currentPath]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const getActiveClass = (path: string) =>
    currentPath === path ? "active-link" : "";

  return (
    <nav
      className="bg-[#1b1b1b] py-2 pl-2 pr-4 font-roboto relative z-10 m-0 sticky top-0 "
    >
      <div className="bg-[#161616] text-white pl-2 pr-4 flex justify-between items-center pt-2 pb-2 rounded-md shadow-sm">
        {/* Contact Details (Left-aligned) */}
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-8">
          <a
            href="mailto:Weddingzvenue.in@gmail.com"
            className="flex items-center space-x-2 hover:text-gray-100 transition-colors duration-200"
          >
            <FaEnvelope className="text-white text-lg" />
            <span className="text-sm font-medium sm:text-base">
              Weddingzvenue.in@gmail.com
            </span>
          </a>
          {/* <a
            href="tel:+918076207112"
            className="flex items-center space-x-2 hover:text-gray-100 transition-colors duration-200"
          > */}
            {/* <FaPhone className="text-white text-lg" />
            <span className="text-sm font-medium sm:text-base">
              +91 8076207112
            </span> */}
          {/* </a> */}
        </div>

        {/* Write a Review Button (Right-aligned) */}
        <button
          onClick={handleModalOpen}
          className="flex items-center space-x-2 hover:text-gray-100 transition-colors duration-200"
        >
          <FaEdit className="text-white text-lg" />
          <span className="text-sm font-medium sm:text-base">Write a Review</span>
        </button>
      </div>

      <div className="container mx-0 flex md:justify-left justify-between items-center">
        <div className="nav-links mx-0 pt-1 flex md:justify-left justify-between items-center ">


          <Link to="/" className="flex items-center">
            <img src={Logo} alt="Logo" className="w-24 h-16 items-stretch my-0" />
          </Link>

          <div className="options ">
            <ul className="hidden md:flex justify-center items-center space-x-8 flex-grow static top-0 ml-1">
              <li className="relative">
                <Link to="/" className={`${getActiveClass("/")} link-effect`}>
                  Home
                </Link>
              </li>
              <li className="relative">
                <Link
                  to="/venuelist"
                  className={`${getActiveClass("/venuelist")} link-effect`}
                >
                  Venues
                </Link>
              </li>
              <li className="relative">
                <Link
                  to="/vendor/AllVendors"
                  className={`${getActiveClass(
                    "/vendor/AllVendors"
                  )} link-effect`}
                >
                  Vendors
                </Link>
              </li>
              <li>
                <Link
                  to="/photos"
                  className={`${getActiveClass("/photos")} link-effect`}
                >
                  Photos
                </Link>
              </li>
              <li>
                <Link
                  to="/blogs"
                  className={`${getActiveClass("/blogs")} link-effect`}
                >
                  Blogs
                </Link>
              </li>
              <li>
                <Link
                  to="/realWedding"
                  className={`${getActiveClass("/realWedding")} link-effect`}
                >
                  Real Weddings
                </Link>
              </li>
              <li>
                <Link
                  to="/aboutus1"
                  className={`${getActiveClass("/aboutus1")} link-effect`}
                >
                  Why Us
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex items-center space-x-4 ml-auto">
  <ul className="flex items-center space-x-4">
    {isLoggedIn && role != 'user' && (
      <li className="relative hidden md:block rounded-full py-1 px-4">
        <Link
          to="/notification"
          className="text-light-blue hover:text-gray-200"
        >
          <FaBell />
        </Link>
      </li>
    )}
  </ul>

  <ul className="flex items-center space-x-4">
    {!isLoggedIn && (
      <li className="bg-white relative hidden md:block rounded-full py-1 px-4">
        <Link
          to="/login"
          className="text-light-blue-300 hover:text-black"
        >
          Login
          <span className="shine-strip"></span>
        </Link>
      </li>
    )}
    {isLoggedIn && (
      <li className="relative hidden md:block">
        <Link to={url} className="text-light-blue hover:text-gray-200">
          <FaUser />
        </Link>
      </li>
    )}
  </ul>
</div>

        <div className="md:hidden">
          <button onClick={toggleMobileMenu} className="text-black">
            {mobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-white text-black flex flex-col items-center justify-center space-y-4 z-15 transition-transform duration-300">
          <div className="absolute top-8">
            <img src={MiniLogo} alt="Logo" className="w-24 h-16 items-stretch" />
          </div>
          <button
            onClick={toggleMobileMenu}
            className="absolute top-4 right-4 text-light-blue"
          >
            <FaTimes size={24} />
          </button>
          <ul className="flex flex-col items-center space-y-4">
            <li>
              <Link
                to="/"
                className={`${getActiveClass(
                  "/"
                )} text-2xl hover:border-b-2 hover:border-gray-200`}
                onClick={toggleMobileMenu}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/venuelist"
                className={`${getActiveClass(
                  "/venuelist"
                )} text-2xl hover:border-b-2 hover:border-gray-200`}
                onClick={toggleMobileMenu}
              >
                Venues
              </Link>
            </li>
            <li>
              <Link
                to="/vendor/AllVendors"
                className={`${getActiveClass(
                  "/vendor/AllVendors"
                )} text-2xl hover:border-b-2 hover:border-gray-200`}
                onClick={toggleMobileMenu}
              >
                Vendors
              </Link>
            </li>
            <li>
              <Link
                to="/blogs"
                className={`${getActiveClass(
                  "/blogs"
                )} text-2xl hover:border-b-2 hover:border-gray-200`}
                onClick={toggleMobileMenu}
              >
                Blogs
              </Link>
            </li>
            <li>
              <Link
                to="/realWedding"
                className={`${getActiveClass(
                  "/realWedding"
                )} text-2xl hover:border-b-2 hover:border-gray-200`}
                onClick={toggleMobileMenu}
              >
                Real Weddings
              </Link>
            </li>
            <li>
              <Link
                to="/aboutus1"
                className={`${getActiveClass(
                  "/aboutus1"
                )} text-2xl hover:border-b-2 hover:border-gray-200`}
                onClick={toggleMobileMenu}
              >
                Why Us
              </Link>
            </li>

            {!isLoggedIn && (
              <li>
                <Link
                  to="/login"
                  className="text-2xl text-black hover:text-gray-200"
                  onClick={toggleMobileMenu}
                >
                  Login
                </Link>
              </li>
            )}
            {isLoggedIn && (
              <li>
                <Link
                  to={url}
                  className="text-2xl text-black hover:text-gray-200"
                  onClick={toggleMobileMenu}
                >
                  <FaUser />
                </Link>
              </li>
            )}
          </ul>
        </div>
      )}
      {/* Review Modal */}
      {isModalOpen && <ReviewModal onClose={handleModalClose} />}
    </nav>
  );
};

export default NavBar;