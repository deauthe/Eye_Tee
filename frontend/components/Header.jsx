import React, { useState, useEffect } from "react";
import Wrapper from "./Wrapper";

import Link from "next/link";
import Menu from "./Menu";
import MenuMobile from "./MenuMobile";
import { CgProfile } from "react-icons/cg";
import { MdLabelImportant, MdLogout } from "react-icons/md";
import { MdOutlineLogin } from "react-icons/md";
import { IoMdHeartEmpty } from "react-icons/io";
import { BsCart } from "react-icons/bs";
import { BiMenuAltRight } from "react-icons/bi";
import { VscChromeClose } from "react-icons/vsc";
// import { fetchDataFromApi } from "@/utils/api";
import { useSelector } from "react-redux";
import logo from "../public/logo.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Router, { useRouter } from "next/router";
import designer from "@/pages/auth/designer";
const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [showCatMenu, setShowCatMenu] = useState(false);
  const [show, setShow] = useState("translate-y-0");
  const [lastScrollY, setLastScrollY] = useState(0);
  // const [categories, setCategories] = useState(null);

  const router = useRouter();

  const categories = [
    { id: 1, name: "T-Shirts", url: "/" },
    { id: 2, name: "Hoodies", url: "/about" },
    { id: 3, name: "Mugs", url: "/" },
  ];
  const { cartItems } = useSelector((state) => state.cart);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleMouseEvents = () => {
    setIsHovered(!isHovered);
  };

  const controlNavbar = () => {
    if (window.scrollY > 200) {
      if (window.scrollY > lastScrollY && !mobileMenu) {
        setShow("-translate-y-[80px]");
      } else {
        setShow("shadow-sm");
      }
    } else {
      setShow("translate-y-0");
    }
    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);
    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  }, [lastScrollY]);

  // const fetchCategories = async () => {
  //     const { data } = await fetchDataFromApi("/api/categories?populate=*");
  //     setCategories(data);
  // };

  // handle function for sell your art

  const handleSellArtButton = async () => {
    if (typeof sessionStorage !== "undefined") {
      const userId = sessionStorage.getItem("userID");
      const isDesigner = sessionStorage.getItem("isDesigner");

<<<<<<< HEAD
     }else{
      toast.error("First Login or Create Account to Sell Designer");

      router.push({
        pathname:'./login',
      })
     }
=======
      if (userId && isDesigner) {
        // User is logged in and is a designer
        router.push({
          pathname: "/profile/DesignerProfile",
        });
      } else if (userId) {
        // User is logged in but not a designer
        toast.error("Register as a Designer First");
        router.push({
          pathname: "/auth/designer",
        });
      } else {
        // User is not logged in
        toast.error("Please login to sell your art");
        router.push({
          pathname: "/auth/login",
        });
      }
>>>>>>> 887675ba4cf74d936cf7edf193a729a58af7c190
    } else {
      console.log("Session storage not supported");
    }
  };
  const handleLogOut = async () => {
    // sessionStorage.setItem("idDesigner", designer);
    // sessionStorage.setItem("userID", userID);

    // if(!designer || !userID){
    //   alert("You are alredy logout")
    // }

    try {
      const response = await fetch("http://localhost:8080/api/logout", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": "token",
        },
      });

      if (response.ok) {
        alert("You are successfully logged out");
      } else {
        alert("Error, Try Again");
      }
    } catch (error) {
      // Handle error if necessary
      console.error("An error occurred:", error);
    }
  };

  return (
    <header
      className={`w-full h-[50px] md:h-[80px] bg-white flex items-center justify-between z-20 sticky top-0 transition-transform duration-300 ${show}`}
    >
      <Wrapper className="h-[60px] flex justify-between items-center">
        <div className="flex gap-2">
          <Link href="/">
            <img src="/logo.png" className="w-[40px] md:w-[50px]" />
          </Link>

          <Menu
            showCatMenu={showCatMenu}
            setShowCatMenu={setShowCatMenu}
            categories={categories}
          />

          {mobileMenu && (
            <MenuMobile
              showCatMenu={showCatMenu}
              setShowCatMenu={setShowCatMenu}
              setMobileMenu={setMobileMenu}
              categories={categories}
            />
          )}

          {/* {Search button} */}
          <div class="input-container ml-2 ">
            <input
              type="text"
              name="text"
              class="input"
              placeholder="search..."
            />
            <span class="icon">
              <svg
                width="19px"
                height="19px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <path
                    opacity="1"
                    d="M14 5H20"
                    stroke="#000"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>{" "}
                  <path
                    opacity="1"
                    d="M14 8H17"
                    stroke="#000"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>{" "}
                  <path
                    d="M21 11.5C21 16.75 16.75 21 11.5 21C6.25 21 2 16.75 2 11.5C2 6.25 6.25 2 11.5 2"
                    stroke="#000"
                    stroke-width="2.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>{" "}
                  <path
                    opacity="1"
                    d="M22 22L20 20"
                    stroke="#000"
                    stroke-width="3.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>{" "}
                </g>
              </svg>
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-black">
          {/* {Button } */}
          <button onClick={handleSellArtButton}>
            <a class="fancy " href="#">
              <span class="top-key"></span>
              <span class="text">Sell Your Art</span>
              <span class="bottom-key-1"></span>
              <span class="bottom-key-2"></span>
            </a>
          </button>

          {/* Icon start */}
          <div className="w-8 md:w-12 h-8 md:h-12 rounded-full flex justify-center items-center hover:bg-black/[0.05] cursor-pointer relative">
            <IoMdHeartEmpty className="text-[19px] md:text-[24px]" />
            <div className="h-[14px] md:h-[18px] min-w-[14px] md:min-w-[18px] rounded-full bg-red-600 absolute top-1 left-5 md:left-7 text-white text-[10px] md:text-[12px] flex justify-center items-center px-[2px] md:px-[5px]">
              51
            </div>
          </div>
          {/* Icon end */}

          {/* Icon start */}
          <Link href="/cart">
            <div className="w-8 md:w-12 h-8 md:h-12 rounded-full flex justify-center items-center hover:bg-black/[0.05] cursor-pointer relative">
              <BsCart className="text-[15px] md:text-[20px]" />
              {cartItems.length > 0 && (
                <div className="h-[14px] md:h-[18px] min-w-[14px] md:min-w-[18px] rounded-full bg-red-600 absolute top-1 left-5 md:left-7 text-white text-[10px] md:text-[12px] flex justify-center items-center px-[2px] md:px-[5px]">
                  {cartItems.length}
                </div>
              )}
            </div>
          </Link>

          {/* profile  dropdown section  */}

          <div className="relative inline-block text-left">
            <div onClick={toggleDropdown} onMouseOver={handleMouseEvents}>
              <div className="w-8 md:w-12 h-8 md:h-12 rounded-full flex justify-center items-center hover:bg-black/[0.05] cursor-pointer relative">
                <CgProfile className="text-[17px] md:text-[25px]" />
              </div>
            </div>

            {isOpen && (
              <ul className="absolute z-10 right-0 mt-2 w-36 bg-white border rounded-lg shadow-lg">
                <li>
                  <Link href="/auth/login">
                    <p className=" flex gap-2 items-center block px-4 py-2 text-gray-800 hover:bg-gray-200">
                      login <MdOutlineLogin />
                    </p>
                  </Link>
                </li>
                <li>
                  <button onClick={handleLogOut}>
                    <p className="block  flex gap-2 items-center px-4 py-2 text-gray-800 hover:bg-gray-200">
                      logout <MdLogout />
                    </p>
                  </button>
                </li>
                {/* <li>
                  <Link href="/">
                    <p className="block px-4 py-2 text-gray-800 hover-bg-gray-200  hover:bg-gray-200">
                      Graphic Design
                    </p>
                  </Link>
                </li> */}
              </ul>
            )}
          </div>

          {/* Icon end */}

          {/* Mobile icon start */}
          <div className="w-8 md:w-12 h-8 md:h-12 rounded-full flex md:hidden justify-center items-center hover:bg-black/[0.05] cursor-pointer relative -mr-2">
            {mobileMenu ? (
              <VscChromeClose
                className="text-[16px]"
                onClick={() => setMobileMenu(false)}
              />
            ) : (
              <BiMenuAltRight
                className="text-[20px]"
                onClick={() => setMobileMenu(true)}
              />
            )}
          </div>
          {/* Mobile icon end */}
        </div>

        <ToastContainer />
      </Wrapper>
    </header>
  );
};

export default Header;
