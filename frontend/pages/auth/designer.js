import React, { useState } from "react";
import { BsCheckCircleFill } from "react-icons/bs";
import logoLight from "../../public/logo.png";
import Link from "next/link";
import Image from "next/image";
import { FcGoogle } from "react-icons/fc";
import Wrapper from "@/components/Wrapper";

const Designer = () => {
  // ============= Initial State Start here =============
  const [clientName, setClientName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [age, setage] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [zip, setZip] = useState("");
  const [checked, setChecked] = useState(false);
  // ============= Initial State End here ===============
  // ============= Error Msg Start here =================
  const [errClientName, setErrClientName] = useState("");
  const [errEmail, setErrEmail] = useState("");
  const [errPhone, setErrPhone] = useState("");
  const [errage, setErrage] = useState("");
  const [errAddress, setErrAddress] = useState("");
  const [errCity, setErrCity] = useState("");
  const [errCountry, setErrCountry] = useState("");
  const [errZip, setErrZip] = useState("");
  // ============= Error Msg End here ===================
  const [successMsg, setSuccessMsg] = useState("");
  // ============= Event Handler Start here =============
  const handleName = (e) => {
    setClientName(e.target.value);
    setErrClientName("");
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
    setErrEmail("");
  };
  const handlePhone = (e) => {
    setPhone(e.target.value);
    setErrPhone("");
  };
  const handleage = (e) => {
    setage(e.target.value);
    setErrage("");
  };
  const handleAddress = (e) => {
    setAddress(e.target.value);
    setErrAddress("");
  };
  const handleCity = (e) => {
    setCity(e.target.value);
    setErrCity("");
  };
  const handleCountry = (e) => {
    setCountry(e.target.value);
    setErrCountry("");
  };
  const handleZip = (e) => {
    setZip(e.target.value);
    setErrZip("");
  };

  console.log(age);
  // ============= Event Handler End here ===============
  // ================= Email Validation start here =============
  const EmailValidation = (email) => {
    return String(email)
      .toLowerCase()
      .match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i);
  };
  // ================= Email Validation End here ===============

  const handleSignUp = (e) => {
    e.preventDefault();
    if (checked) {
      if (!clientName) {
        setErrClientName("Enter your name");
      }
      if (!email) {
        setErrEmail("Enter your email");
      } else {
        if (!EmailValidation(email)) {
          setErrEmail("Enter a Valid email");
        }
      }
      if (!phone) {
        setErrPhone("Enter your phone number");
      }
      if (!age) {
        setErrage("Enter your Age");
      } else {
        const currentDate = new Date();
        const [year, month, day] = age.split("-").map(Number);
        const ageObject = new Date(year, month - 1, day);
       
        const Age = currentDate - ageObject;
        const ageInYears = Age / (1000 * 60 * 60 * 24 * 365.25);

        console.log(ageInYears);
        if (ageInYears < 18) {
          setErrage("Age should be greater than 18");
        }
      }
      if (!address) {
        setErrAddress("Enter your address");
      }
      if (!city) {
        setErrCity("Enter your city name");
      }
      if (!country) {
        setErrCountry("Enter the country you are residing");
      }
      if (!zip) {
        setErrZip("Enter the zip code of your area");
      }
      // ============== Getting the value ==============
      if (
        clientName &&
        email &&
        EmailValidation(email) &&
        age &&
        address &&
        city &&
        country &&
        zip
      ) {
        setSuccessMsg(
          `Hello dear ${clientName}, Welcome you to Eye Tee Admin panel. We received your Sign up request. We are processing to validate your access. Till then stay connected and additional assistance will be sent to you by your mail at ${email}`
        );
        setClientName("");
        setEmail("");
        setPhone("");
        setage("");
        setAddress("");
        setCity("");
        setCountry("");
        setZip("");
      }
    }
  };
  return (
    <Wrapper>
      <div className="w-full h-screen flex items-center justify-start my-5">
        <div className="w-1/2  lgl:inline-flex h-full text-white bg-black">
          <div className="w-[450px] h-full bg-primeColor px-10 flex flex-col gap-6 justify-center">
            <Link href={"/"}>
              <Image src={logoLight} alt="logoImg" className="w-28" />
            </Link>
            <div className="flex flex-col gap-1 -mt-1">
              <h1 className="font-titleFont text-xl font-medium">
                Get started for free
              </h1>
              <p className="text-base">Create your account to access more</p>
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
              <p className="text-sm font-titleFont font-semibold text-gray-300 hover:text-white cursor-pointer duration-300">
                © Eye Tee
              </p>
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
        <div className="w-full lgl:w-[500px] h-full flex flex-col justify-center">
          {false ? (
            <div className="w-[500px]">
              <p className="w-full px-4 py-10 text-green-500 font-medium font-titleFont">
                {successMsg}
              </p>
              <Link href={"/auth/login"}>
                <button
                  className="w-full h-10 bg-primeColor rounded-md text-base font-titleFont font-semibold 
            tracking-wide hover:bg-black border-2 border-black hover:text-white duration-300"
                >
                  Sign in
                </button>
              </Link>
            </div>
          ) : (
            <form className="w-full  h-screen flex items-center justify-center">
              <div className="px-6 py-4 w-[500px] h-[96%] flex flex-col justify-start overflow-y-scroll scrollbar-thin scrollbar-thumb-primeColor">
                <h1 className="font-titleFont underline underline-offset-4 decoration-[1px] font-semibold text-2xl mdl:text-3xl mb-4">
                  Register as Designer
                </h1>
                <div className="flex flex-col gap-3">
                  {/* client name */}
                  <div className="flex flex-col gap-.5">
                    <p className="font-titleFont text-base font-semibold text-gray-600">
                      Ful Name
                    </p>
                    <input
                      onChange={handleName}
                      value={clientName}
                      className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                      type="text"
                      placeholder="eg. John Doe"
                    />
                    {errClientName && (
                      <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                        <span className="font-bold italic mr-1">!</span>
                        {errClientName}
                      </p>
                    )}
                  </div>

                  {/* {Artist} */}
                  <div className="flex flex-col gap-.5">
                    <p className="font-titleFont text-base font-semibold text-gray-600">
                      Artist Name
                    </p>
                    <input
                      onChange={handleName}
                      value={clientName}
                      className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                      type="text"
                      placeholder="eg. John Doe"
                    />
                    {errClientName && (
                      <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                        <span className="font-bold italic mr-1">!</span>
                        {errClientName}
                      </p>
                    )}
                  </div>
                  {/* {Bio} */}

                  <div className="flex flex-col gap-.5">
                    <p className="font-titleFont text-base font-semibold text-gray-600">
                      Bio
                    </p>
                    <input
                      onChange={handleName}
                      value={clientName}
                      className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                      type="text"
                      placeholder="eg. John Doe"
                    />
                    {errClientName && (
                      <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                        <span className="font-bold italic mr-1">!</span>
                        {errClientName}
                      </p>
                    )}
                  </div>
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
                  {/* Phone Number */}
                  <div className="flex flex-col gap-.5">
                    <p className="font-titleFont text-base font-semibold text-gray-600">
                      Phone Number
                    </p>
                    <input
                      onChange={handlePhone}
                      value={phone}
                      className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                      type="text"
                      placeholder="008801234567891"
                    />
                    {errPhone && (
                      <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                        <span className="font-bold italic mr-1">!</span>
                        {errPhone}
                      </p>
                    )}
                  </div>
                  {/* age */}
                  <div className="flex flex-col gap-.5">
                    <p className="font-titleFont text-base font-semibold text-gray-600">
                      Date of Birth
                    </p>
                    <input
                      onChange={handleage}
                      value={age}
                      className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none text-gray-600 font-titleFont"
                      type="date"
                      placeholder="Create age"
                    />
                    {errage && (
                      <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                        <span className="font-bold italic mr-1">!</span>
                        {errage}
                      </p>
                    )}
                  </div>
                  {/* Address */}
                  <div className="flex flex-col gap-.5">
                    <p className="font-titleFont text-base font-semibold text-gray-600">
                      Address
                    </p>
                    <input
                      onChange={handleAddress}
                      value={address}
                      className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                      type="text"
                      placeholder="road-001, house-115, example area"
                    />
                    {errAddress && (
                      <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                        <span className="font-bold italic mr-1">!</span>
                        {errAddress}
                      </p>
                    )}
                  </div>
                  {/* City */}
                  <div className="flex flex-col gap-.5">
                    <p className="font-titleFont text-base font-semibold text-gray-600">
                      City
                    </p>
                    <input
                      onChange={handleCity}
                      value={city}
                      className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                      type="text"
                      placeholder="Your city"
                    />
                    {errCity && (
                      <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                        <span className="font-bold italic mr-1">!</span>
                        {errCity}
                      </p>
                    )}
                  </div>
                  {/* Country */}
                  <div className="flex flex-col gap-.5">
                    <p className="font-titleFont text-base font-semibold text-gray-600">
                      Country
                    </p>
                    <input
                      onChange={handleCountry}
                      value={country}
                      className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                      type="text"
                      placeholder="Your country"
                    />
                    {errCountry && (
                      <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                        <span className="font-bold italic mr-1">!</span>
                        {errCountry}
                      </p>
                    )}
                  </div>
                  {/* Zip code */}
                  <div className="flex flex-col gap-.5">
                    <p className="font-titleFont text-base font-semibold text-gray-600">
                      Zip/Postal code
                    </p>
                    <input
                      onChange={handleZip}
                      value={zip}
                      className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                      type="text"
                      placeholder="Your country"
                    />
                    {errZip && (
                      <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                        <span className="font-bold italic mr-1">!</span>
                        {errZip}
                      </p>
                    )}
                  </div>
                  {/* Checkbox */}
                  <div className="flex items-start mdl:items-center gap-2">
                    <input
                      onChange={() => setChecked(!checked)}
                      className="w-4 h-4 mt-1 mdl:mt-0 cursor-pointer"
                      type="checkbox"
                    />
                    <p className="text-sm text-primeColor">
                      I agree to the Eye Tee{" "}
                      <span className="text-blue-500">Terms of Service </span>
                      and <span className="text-blue-500">Privacy Policy</span>.
                    </p>
                  </div>

                  <div className="flex justify-center items-center w-full">
                    <button
                      onClick={handleSignUp}
                      className={`${
                        checked
                          ? "bg-primeColor hover:bg-black hover:text-white text-black cursor-pointer"
                          : "   cursor-none"
                      } w-[59%] text-black  text-base font-medium h-10 border-2 border-black   rounded-full hover:text-white hover:bg-black duration-300`}
                    >
                      Create Account
                    </button>
                  </div>
                  <p className="text-sm text-center font-titleFont font-medium">
                    {" "}
                    Dont have an Account?
                    <Link href={"/auth/login"}>
                      <span className="hover:text-blue-600 duration-300">
                        Sign in
                      </span>
                    </Link>
                  </p>

                  <div className="text-center w-full ">
                    <p>or</p>
                  </div>

                  <div className="flex justify-center items-center  ">
                    <span className="text-2xl border-2 border-r-0 border-black p-1 pl-5 rounded-l-full">
                      <FcGoogle />
                    </span>
                    <button className=" text-md font-[550] gap-2 border-2 border-black border-l-0 pl-1 p-1 pr-5 rounded-r-full">
                      Continue with google{" "}
                    </button>
                  </div>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </Wrapper>
  );
};

export default Designer;