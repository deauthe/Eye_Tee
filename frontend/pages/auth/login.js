import React, { useState } from "react";
import { BsCheckCircleFill } from "react-icons/bs";
import Link from "next/link";
import logo from "../../public/logo.png";
import Image from "next/image";
import Wrapper from "@/components/Wrapper";
import { FcGoogle } from "react-icons/fc";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Login = () => {

  const toastify = (messge, res) => {
    if (res) {
      toast.success(messge);
    } else {
      toast.error(messge);
    }
  };



  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // ============= Initial State End here ===============
  // ============= Error Msg Start here =================
  const [errEmail, setErrEmail] = useState("");
  const [errPassword, setErrPassword] = useState("");

  // ============= Error Msg End here ===================
  const [successMsg, setSuccessMsg] = useState("");
  // ============= Event Handler Start here =============
  const handleEmail = (e) => {
    setEmail(e.target.value);
    setErrEmail("");
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
    setErrPassword("");
  };
  // ============= Event Handler End here ===============





  const handleSignIn = async () => {
    const apiUrl = "https://eye-eye-tee.onrender.com/api/user/login";

    const requestBody = JSON.stringify({
      email: email,
      password: password,
    });


    const headers = {
      "Content-Type": "application/json",
      "x-api-key": "token",
    };

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: headers,
        body: requestBody,
      });

      if (response.ok) {
        const responseData = await response.json();
        toastify(responseData.message, response.ok);
       
        
      } else {
        console.error("API call failed with status:", response.status);
        return null;
      }
    } catch (error) {
      console.error("An error occurred while making the API call:", error);
      return null;
    }
  };




 
  return (
    <Wrapper>
      <div className="w-full h-screen flex items-center justify-center my-5">
        <div className="w-1/2  lgl:inline-flex h-full text-white bg-black">
          <div className="w-[450px] h-full bg-primeColor px-10 flex flex-col gap-6 justify-center">
            {/* <Link to="/"> */}
            <Link href={"/"}>
              <Image src={logo} alt="logoImg" className="w-28" />
            </Link>
            {/* </Link> */}
            <div className="flex flex-col gap-1 -mt-1">
              <h1 className="font-titleFont text-xl font-medium">
                Stay sign in for more
              </h1>
              <p className="text-base">When you sign in, you are with us!</p>
            </div>
            <div className="w-[300px] flex items-start gap-3">
              <span className="text-green-500 mt-1">
                <BsCheckCircleFill />
              </span>
              <p className="text-base text-gray-300">
                <span className="text-white font-semibold font-titleFont">
                  Get started fast with Eye Tee
                </span>
                <br />
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ab
                omnis nisi dolor recusandae consectetur!
              </p>
            </div>
            <div className="w-[300px] flex items-start gap-3">
              <span className="text-green-500 mt-1">
                <BsCheckCircleFill />
              </span>
              <p className="text-base text-gray-300">
                <span className="text-white font-semibold font-titleFont">
                  Access all Eye Tee services
                </span>
                <br />
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ab
                omnis nisi dolor recusandae consectetur!
              </p>
            </div>
            <div className="w-[300px] flex items-start gap-3">
              <span className="text-green-500 mt-1">
                <BsCheckCircleFill />
              </span>
              <p className="text-base text-gray-300">
                <span className="text-white font-semibold font-titleFont">
                  Trusted by online Shoppers
                </span>
                <br />
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ab
                omnis nisi dolor recusandae consectetur!
              </p>
            </div>
            <div className="flex items-center justify-between mt-10">
              {/* <Link to="/"> */}
              <Link href={"/"}>
                <p className="text-sm font-titleFont font-semibold text-gray-300 hover:text-white cursor-pointer duration-300">
                  © Eye Tee
                </p>
              </Link>
              {/* </Link> */}
              <p className="text-sm font-titleFont font-semibold text-gray-300 hover:text-white cursor-pointer duration-300">
                Terms
              </p>
              <p className="text-sm font-titleFont font-semibold text-gray-300 hover:text-white cursor-pointer duration-300">
                Privacy
              </p>
              <p className="text-sm font-titleFont font-semibold text-gray-300 hover:text-white cursor-pointer duration-300">
                Security
              </p>
            </div>
          </div>
        </div>
        <div className="w-full lgl:w-1/2 h-full">
          {successMsg ? (
            <div className="w-full lgl:w-[500px] h-full flex flex-col justify-center">
              <p className="w-full px-4 py-10 text-green-500 font-medium font-titleFont">
                {successMsg}
              </p>
              {/* <Link to="/signup"> */}

              <Link href={"/auth/signup"}>
                <button
                  className="w-full h-10 bg-primeColor text-black rounded-md text-base font-titleFont font-semibold 
            tracking-wide hover:bg-black hover:text-white duration-300"
                >
                  Sign Up
                </button>
              </Link>
              {/* </Link> */}
            </div>
          ) : (
            <div className="w-full  h-screen flex items-center justify-center">
              <div className=" px-6 py-4 w-[500px] h-[90%] flex flex-col justify-center overflow-y-scroll scrollbar-thin scrollbar-thumb-primeColor">
                <h1 className="font-titleFont underline underline-offset-4 decoration-[1px] font-semibold text-3xl mdl:text-4xl mb-4">
                  Sign in
                </h1>
                <div className="flex flex-col gap-3">
                  {/* Email */}
                  <div className="flex flex-col gap-.5">
                    <p className="font-titleFont text-base font-semibold text-gray-600">
                      Work Email
                    </p>
                    <input
                      onChange={handleEmail}
                      value={email}
                      className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                      type="email"
                      placeholder="john@workemail.com"
                    />
                    {errEmail && (
                      <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                        <span className="font-bold italic mr-1">!</span>
                        {errEmail}
                      </p>
                    )}
                  </div>

                  {/* Password */}
                  <div className="flex flex-col gap-.5">
                    <p className="font-titleFont text-base font-semibold text-gray-600">
                      Password
                    </p>
                    <input
                      onChange={handlePassword}
                      value={password}
                      className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                      type="password"
                      placeholder="Create password"
                    />
                    {errPassword && (
                      <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                        <span className="font-bold italic mr-1">!</span>
                        {errPassword}
                      </p>
                    )}
                  </div>

                  <div className="w-full flex items-center justify-center">
                    <button
                      onClick={handleSignIn}
                      className="bg-primeColor w-[40%] hover:bg-black text-black border-2 border-black hover:text-white cursor-pointer  text-base font-medium h-10 rounded-full  duration-300"
                    >
                      Sign In
                    </button>
                  </div>
                  <p className="text-sm text-center font-titleFont font-medium">
                    Dont have an Account? {/* <Link href={"/"}> */}
                    <Link href={"/auth/signup"}>
                      <span className="hover:text-blue-600 duration-300">
                        Sign up
                      </span>
                    </Link>
                    {/* </Link> */}
                    {/* {Google Auth} */}
                  </p>
                  <div className="text-center w-full ">
                    <p>or</p>
                  </div>

                  <div className="flex justify-center items-center  ">
                    <span className="text-2xl border-2 border-r-0 border-black p-1 pl-5 rounded-l-full">
                      <FcGoogle />
                    </span>
                    <button
                      // onClick={}
                      className=" text-md font-[550] gap-2 border-2 border-black border-l-0 pl-1 p-1 pr-5 rounded-r-full"
                    >
                      Continue with google{" "}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
          <ToastContainer/>
        </div>
      </div>
    </Wrapper>
  );
};

export default Login;
