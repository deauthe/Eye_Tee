import Wrapper from "@/components/Wrapper";
import React, { useState } from "react";
import { BsCheckCircleFill } from "react-icons/bs";
import logoLight from "../../public/logo.png";
import Link from "next/link";
import Image from "next/image";
import { FcGoogle } from "react-icons/fc";
const designer = () => {
  // react states =>  value
  const [clientName, setClientName] = useState("");
  const [artistName, setArtistName] = useState("");
  const [clientdescription, setClientdescription] = useState("");
  const [phone, setPhone] = useState(null);
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState(null);
  const [addressType, setAddressType] = useState("");
  const [state, setState] = useState("");
  const [panCardNumber, setPanCardNumber] = useState(null);
  const [portfolioLinks, setPortfolioLinks] = useState("");
  const [cvLinks, setCvLinks] = useState("");
  const [CoverPhoto, setCoverPhoto] = useState({});
  const [ProfilePhoto, setProfilePhoto] = useState({});
  const [country, setCountry] = useState("");
console.log(CoverPhoto, ProfilePhoto);
  // react state => errors
  const [errClientName, setErrClientName] = useState("");
  const [errArtistName, setErrArtistName] = useState("");
  const [errdescription, setErrdescription] = useState("");
  const [errPhone, setErrPhone] = useState("");
  const [errAddressLine1, setErrAddressLine1] = useState("");
  const [errAddressLine2, setErrAddressLine2] = useState("");
  const [errCity, setErrCity] = useState("");
  const [errPostalCode, setErrPostalCode] = useState("");
  const [errAddressType, setErrAddressType] = useState("");
  const [errState, setErrState] = useState("");
  const [errPanCardNumber, setErrPanCardNumber] = useState("");
  const [errPortfolioLinks, setErrPortfolioLinks] = useState("");
  const [errCvLinks, setErrCvLinks] = useState("");
  const [errCoverPhoto, setErrCoverPhoto] = useState("");
  const [errProfilePhoto, setErrProfilePhoto] = useState(null);
  const [errCountry, setErrCountry] = useState("");
  // handle functions
  const handleName = (e) => {
    setClientName(e.target.value);
    setErrClientName("");
  };
  const handleArtist = (e) => {
    setArtistName(e.target.value);
    setErrArtistName("");
  };
  const handledescription = (e) => {
    setClientdescription(e.target.value);
    setErrdescription("");
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
    setErrEmail("");
  };
  const handlePhone = (e) => {
    setPhone(e.target.value);
    setErrPhone("");
  };

  const handleCity = (e) => {
    setCity(e.target.value);
    setErrCity("");
  };
  const handleAddressLine1 = (e) => {
    setAddressLine1(e.target.value);
    setErrAddressLine1("");
  };
  const handleAddressLine2 = (e) => {
    setAddressLine2(e.target.value);
    setErrAddressLine2("");
  };
  const handlePostalCode = (e) => {
    setPostalCode(e.target.value);
    setErrPostalCode("");
  };
  const handleaddressType = (e) => {
    setAddressType(e.target.value);
    setErrAddressType("");
  };
  const handleState = (e) => {
    setState(e.target.value);
    setErrState("");
  };
  const handlePanCardNumber = (e) => {
    setPanCardNumber(e.target.value);
    setErrPanCardNumber("");
  };
  const handlePortfolioLinks = (e) => {
    setPortfolioLinks(e.target.value);
    setErrPortfolioLinks("");
  };
  const handlecvLinks = (e) => {
    setCvLinks(e.target.value);
    setErrCvLinks("");
  };
  const handleCountry =(e)=>{
    setCountry(e.target.value);
    setErrCountry();
  }
  const handleCoverPhoto = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    if (CoverPhoto && CoverPhoto.objectURL) {
      URL.revokeObjectURL(CoverPhoto.objectURL);
    }
    const objectURL = URL.createObjectURL(file);
    setCoverPhoto({
      file
    });
    setErrCoverPhoto("");
  };
  const handleProfilePhoto = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    if (ProfilePhoto && ProfilePhoto.objectURL) {
      URL.revokeObjectURL(ProfilePhoto.objectURL);
    }
    const profileURL = URL.createObjectURL(file);
    setProfilePhoto({
      file
    });
    setErrProfilePhoto("");
  };

  let userId;
  // fetch userId from the cookie
  if (typeof sessionStorage !== "undefined") {
    userId = sessionStorage.getItem("userID");
  } else {
    console.error("sessionStorage is not supported in this environment.");
  }

  const convertImageToBase64 = (image) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const base64Image = event.target.result;
      return base64Image;
    };
  
    reader.readAsDataURL(image);
  };
  

  const handleNextAuth = async () => {
    try {
      const apiUrl = "http://localhost:8080/api/designer/request";
      const apiKey = "token";

      const formData = new FormData();
      formData.append('file', CoverPhoto);

      const requestData = {
        userId,
        fullname: clientName,
        artistName: artistName,
        portfolioLinks,
        cvLinks,
        address_line1: addressLine1,
        address_line2: addressLine2,
        city,
        phone,
        postal_code: postalCode,
        country,
        address_type: addressType,
        state,
        description: clientdescription,
        panCardNumber,
        image: formData, 
      };
      const boundary = formData.getBoundary();
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "content-type":  `multipart/form-data; boundary=${boundary}`,
          "x-api-key": apiKey,
        },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Request submitted successfully:", result);
      } else {
        console.error("Request failed with status:", response.status);
      }
    } catch (error) {}
  };


  return (
    <Wrapper>
      <div className="w-full h-screen flex items-center justify-start my-5">
        {/*  this is the black section */}
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
        {/* black section ends here */}

        {/* this is the begin of the first part of design section */}

        <div className="w-full lgl:w-[500px] h-full flex flex-col justify-center">
          <div className=" w-full  h-screen flex items-center justify-center">
            <div className="px-6 py-4 w-[500px] h-[96%] flex flex-col justify-start overflow-y-scroll scrollbar-thin scrollbar-thumb-primeColor">
              <h1 className="font-titleFont underline underline-offset-4 decoration-[1px] font-semibold text-2xl mdl:text-3xl mb-4">
                Register as Designer
              </h1>

              {/* { true ? ( */}
              <div className="flex flex-col gap-3 ">
                {/* <div className="flex flex-col gap-.5">
                  <p className="font-titleFont text-base font-semibold text-gray-600">
                    UserId
                  </p>
                  <input
                    value={userId}
                    className="w-full h-8 px-4 text-base font-medium rounded-md border-[1px] border-gray-400 outline-none"
                    type="text"
                    readOnly
                    placeholder="User ID"
                  />
                </div> */}

                {/* Full Name */}
                <div className="flex flex-col gap-.5">
                  <p className="font-titleFont text-base font-semibold text-gray-600">
                    Full Name
                  </p>
                  <input
                    onChange={handleName}
                    value={clientName}
                    className="w-full h-8 px-4 text-base font-medium rounded-md border-[1px] border-gray-400 outline-none"
                    type="text"
                    placeholder="e.g., John Doe"
                  />
                  {errClientName && (
                    <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                      <span className="font-bold italic mr-1">!</span>
                      {errClientName}
                    </p>
                  )}
                </div>

                {/* Artist Name */}
                <div className="flex flex-col gap-.5">
                  <p className="font-titleFont text-base font-semibold text-gray-600">
                    Artist Name
                  </p>
                  <input
                    onChange={handleArtist}
                    value={artistName}
                    className="w-full h-8 px-4 text-base font-medium rounded-md border-[1px] border-gray-400 outline-none"
                    type="text"
                    placeholder="e.g., John Doe"
                  />
                  {errArtistName && (
                    <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                      <span className="font-bold italic mr-1">!</span>
                      {errArtistName}
                    </p>
                  )}
                </div>

                {/* description */}
                <div className="flex flex-col gap-.5">
                  <p className="font-titleFont text-base font-semibold text-gray-600">
                    description
                  </p>
                  <input
                    onChange={handledescription}
                    value={clientdescription}
                    className="w-full h-8 px-4 text-base font-medium rounded-md border-[1px] border-gray-400 outline-none"
                    type="text"
                    placeholder="e.g., Artist description"
                  />
                  {errdescription && (
                    <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                      <span className="font-bold italic mr-1">!</span>
                      {errdescription}
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
                    className="w-full h-8 px-4 text-base font-medium rounded-md border-[1px] border-gray-400 outline-none"
                    type="number"
                    placeholder="e.g., 008801234567891"
                  />
                  {errPhone && (
                    <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                      <span className="font-bold italic mr-1">!</span>
                      {errPhone}
                    </p>
                  )}
                </div>

                {/* {address_type} */}
                <div className="flex flex-col gap-.5">
                  <p className="font-titleFont text-base font-semibold text-gray-600">
                    addressType
                  </p>
                  <input
                    onChange={handleaddressType}
                    value={addressType}
                    className="w-full h-8 px-4 text-base font-medium rounded-md border-[1px] border-gray-400 outline-none"
                    type="text"
                    placeholder="Your addressType"
                  />
                  {errAddressType && (
                    <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                      <span className="font-bold italic mr-1">!</span>
                      {errAddressType}
                    </p>
                  )}
                </div>

                {/* Address Line 1 */}
                <div className="flex flex-col gap-.5">
                  <p className="font-titleFont text-base font-semibold text-gray-600">
                    Address Line 1
                  </p>
                  <input
                    onChange={handleAddressLine1}
                    value={addressLine1}
                    className="w-full h-8 px-4 text-base font-medium rounded-md border-[1px] border-gray-400 outline-none"
                    type="text"
                    placeholder="e.g., road-001, house-115, example area"
                  />
                  {errAddressLine1 && (
                    <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                      <span className="font-bold italic mr-1">!</span>
                      {errAddressLine1}
                    </p>
                  )}
                </div>

                {/* Address Line 2 */}
                <div className="flex flex-col gap-.5">
                  <p className="font-titleFont text-base font-semibold text-gray-600">
                    Address Line 2
                  </p>
                  <input
                    onChange={handleAddressLine2}
                    value={addressLine2}
                    className="w-full h-8 px-4 text-base font-medium rounded-md border-[1px] border-gray-400 outline-none"
                    type="text"
                    placeholder="e.g., Apartment, Floor, etc."
                  />
                  {errAddressLine2 && (
                    <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                      <span className="font-bold italic mr-1">!</span>
                      {errAddressLine2}
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
                    className="w-full h-8 px-4 text-base font-medium rounded-md border-[1px] border-gray-400 outline-none"
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

                {/* Postal Code */}
                <div className="flex flex-col gap-.5">
                  <p className="font-titleFont text-base font-semibold text-gray-600">
                    Postal Code
                  </p>
                  <input
                    onChange={handlePostalCode}
                    value={postalCode}
                    className="w-full h-8 px-4 text-base font-medium rounded-md border-[1px] border-gray-400 outline-none"
                    type="number"
                    placeholder="Your postal code"
                  />
                  {errPostalCode && (
                    <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                      <span className="font-bold italic mr-1">!</span>
                      {errPostalCode}
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
                    className="w-full h-8 px-4 text-base font-medium rounded-md border-[1px] border-gray-400 outline-none"
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

                {/* State  */}
                <div className="flex flex-col gap-.5">
                  <p className="font-titleFont text-base font-semibold text-gray-600">
                    State
                  </p>
                  <input
                    onChange={handleState}
                    value={state}
                    className="w-full h-8 px-4 text-base font-medium rounded-md border-[1px] border-gray-400 outline-none"
                    type="text"
                    placeholder="Your State"
                  />
                  {errState && (
                    <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                      <span className="font-bold italic mr-1">!</span>
                      {errState}
                    </p>
                  )}
                </div>

                {/* Pan Card Number */}

                <div className="flex flex-col gap-.5">
                  <p className="font-titleFont text-base font-semibold text-gray-600">
                    PanCardNumber
                  </p>
                  <input
                    onChange={handlePanCardNumber}
                    value={panCardNumber}
                    className="w-full h-8 px-4 text-base font-medium rounded-md border-[1px] border-gray-400 outline-none"
                    type="number"
                    placeholder="Your PanCardNumber"
                  />
                  {errPanCardNumber && (
                    <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                      <span className="font-bold italic mr-1">!</span>
                      {errPanCardNumber}
                    </p>
                  )}
                </div>

                {/* {Portfoliolinks} */}
                <div className="flex flex-col gap-.5">
                  <p className="font-titleFont text-base font-semibold text-gray-600">
                    PortfolioLinks
                  </p>
                  <input
                    onChange={handlePortfolioLinks}
                    value={portfolioLinks}
                    className="w-full h-8 px-4 text-base font-medium rounded-md border-[1px] border-gray-400 outline-none"
                    type="text"
                    placeholder="Your PortfolioLinks"
                  />
                  {errPortfolioLinks && (
                    <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                      <span className="font-bold italic mr-1">!</span>
                      {errPortfolioLinks}
                    </p>
                  )}
                </div>

                {/* {cvLinks} */}
                <div className="flex flex-col gap-.5">
                  <p className="font-titleFont text-base font-semibold text-gray-600">
                    cvLinks
                  </p>
                  <input
                    onChange={handlecvLinks}
                    value={cvLinks}
                    className="w-full h-8 px-4 text-base font-medium rounded-md border-[1px] border-gray-400 outline-none"
                    type="text"
                    placeholder="Your cvLinks"
                  />
                  {errCvLinks && (
                    <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                      <span className="font-bold italic mr-1">!</span>
                      {errcvLinks}
                    </p>
                  )}
                </div>

                {/* CoverPhoto */}
                <div className="flex flex-col gap-.5">
                  <p className="font-titleFont text-base font-semibold text-gray-600">
                    CoverPhoto
                  </p>
                  <input
                    onChange={handleCoverPhoto}
                    value={CoverPhoto.name}
                    className="w-full h-8 px-4 text-base font-medium rounded-md border-[1px] border-gray-400 outline-none"
                    type="file"
                    placeholder="Your CoverPhoto"
                  />
                  {errCoverPhoto && (
                    <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                      <span className="font-bold italic mr-1">!</span>
                      {"d"}
                    </p>
                  )}
                </div>

                {/* ProfilePhoto */}
                <div className="flex flex-col gap-.5">
                  <p className="font-titleFont text-base font-semibold text-gray-600">
                    ProfilePhoto
                  </p>
                  <input
                    onChange={handleProfilePhoto}
                    value={ProfilePhoto.name}
                    className="w-full h-8 px-4 text-base font-medium rounded-md border-[1px] border-gray-400 outline-none"
                    type="file"
                    placeholder="Your ProfilePhoto"
                  />
                  {errProfilePhoto && (
                    <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                      <span className="font-bold italic mr-1">!</span>
                      {errProfilePhoto}
                    </p>
                  )}
                </div>

                <div className="flex justify-center items-center w-full">
                  <button
                    onClick={handleNextAuth}
                    className={`
                         "bg-primeColor hover:bg-black hover:text-white text-black cursor-pointer"
                      w-[59%] text-black  text-base font-medium h-10 border-2 border-black   rounded-full hover:text-white hover:bg-black duration-300`}
                  >
                    Next
                  </button>
                </div>

                {/* ) : ( */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default designer;
