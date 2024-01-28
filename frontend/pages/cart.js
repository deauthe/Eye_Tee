import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Wrapper from "@/components/Wrapper";
import CartItem from "@/components/CartItem";
import { useSelector } from "react-redux";
import { IoCartOutline } from "react-icons/io5";
import { FiPlusCircle } from "react-icons/fi";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";

const Cart = () => {
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");
  const [addressType, setAddressType] = useState("");

  const [formErrors, setFormErrors] = useState({});

  var userID;
  useEffect(() => {
    if (typeof window !== "undefined") {
      userID = sessionStorage.getItem("userID");

      if (userID) {
        console.log("userID:", userID);
      } else {
        console.log("userID not found in sessionStorage");
      }
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation logic
    const errors = {};
    if (!addressLine1) errors.addressLine1 = "This field cannot be empty.";
    if (!addressLine2) errors.addressLine2 = "This field cannot be empty.";
    if (!city) errors.city = "This field cannot be empty.";
    if (!state) errors.state = "This field cannot be empty.";
    if (!postalCode) errors.postalCode = "This field cannot be empty.";
    if (!country) errors.country = "This field cannot be empty.";
    if (!addressType) errors.addressType = "Please select an Address Type.";

    setFormErrors(errors);

    // if (Object.keys(errors).length === 0) {
      // Form is valid, you can proceed with submission or other actions
      const formFields = {
        address_line1: addressLine1,
        addressLine2: addressLine2,
        city,
        state,
        postal_code: postalCode,
        country,
        address_type: addressType,
        user_id: userID,
      };
      // console.log("Form submitted:", formFields);
    // }

    try {
      const url = "http://localhost:8080/api/user/addAddress";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "x-api-key": "token",
        },
        body: JSON.stringify(formFields),
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch. Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("API response:", data);
    } catch (error) {
      console.error("API error:", error.message);
    }
  };

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [loading, setLoading] = useState(false);
  const { cartItems } = useSelector((state) => state.cart);
  const { address, setAddress } = useState({});
  console.log(cartItems);

  // const subTotal = useMemo(() => {
  //     return cartItems.reduce(
  //         (total, val) => total + val.attributes.price,
  //         0
  //     );
  // }, [cartItems]);

  const ddress = [
    {
      _id: "65b55cb9d424b0fa0bfd16dc",
      address_line1: "Near Adm Residence",
      address_line2: "Gandhi Nagar",
      city: "Kullu",
      state: "Himachal Pradesh",
      postal_code: "175001",
      country: "India",
      address_type: "Home",
      user_id: "6500a06d58a6a67722bf27fe",
      __v: 0,
    },
    {
      _id: "65b55cb9d424b0fa0bfd16dd",
      address_line1: "Downtown Street",
      address_line2: "Central District",
      city: "Metropolis",
      state: "California",
      postal_code: "12345",
      country: "USA",
      address_type: "Work",
      user_id: "6500a06d58a6a67722bf27fe",
      __v: 0,
    },
  ];

  const getAddress = async () => {
    const url = `http://localhost:8080/api/user/address/${userID}?type=${addressType}`;

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "x-api-token": "token",
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch. Status: ${response.status}`);
      }

      const data = await response.json();
      setAddress(data);
    } catch (error) {
      console.error(error);
      alert("Can't able to get Addresses. Please try again.");
    }
  };

  // useEffect(() => {
  //   getAddress();
  // }, []);

  return (
    <div className="w-full md:py-20">
      <Wrapper>
        {cartItems.length > 0 && (
          <>
            {/* HEADING AND PARAGRAPH START */}
            <div className="text-center max-w-[800px] mx-auto mt-9 md:mt-0">
              <div className="text-[28px] md:text-[34px] mb-5 font-semibold leading-tight">
                Shopping Cart
              </div>
            </div>
            {/* HEADING AND PARAGRAPH END */}

            {/* CART CONTENT START */}
            <div className="flex flex-col lg:flex-row gap-12 py-10">
              {/* Address seciton  */}

              {/* CART ITEMS START */}
              <div className="flex-[2] ">
                <div className="text-lg font-bold ">
                  Select Your Delivery Address
                </div>

                <div className="bg-black/[0.05] rounded-md p-2 px-3 mt-5 py-3 pb-4">
                  <div className="relative inline-block  ">
                    <button
                      onClick={onOpen}
                      className="text-md text-white rounded-full p-2 px-4 active:scale-95 duration-200 transition-all  bg-black  font-normal flex gap-1 items-center  mt-1 "
                    >
                      Add new Address
                      <span className="-mt-[2px]">
                        <FiPlusCircle />
                      </span>
                    </button>

                    <div className="flex flex-col md:flex-row  text-center mt-6 gap-2 ">
                      {ddress.map((e, index) => (
                        <div className="relative border border-dashed border-black/30 p-2 px-5 rounded-md  ">
                          <div className="my-2 ">
                            <span className="text-gray-500 ">
                              {e.address_type}
                            </span>
                          </div>
                          <div className="flex flex-col gap-2">
                            <div className="text-sm">
                              <span>{e.address_line1}, </span>
                              <span>{e.address_line2} </span>
                            </div>
                            <div className="text-gray-600 text-sm">
                              <span>{e.city} </span>
                              <span> &#40;{e.postal_code}&#41;, </span>
                              <span>{e.state}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="text-lg font-bold mt-5 ">Cart Items</div>
                <div className="bg-black/[0.05] rounded-md p-2 px-3 mt-3">
                  {cartItems.map((item) => (
                    <CartItem key={item.id} data={item} />
                  ))}
                </div>
              </div>
              {/* CART ITEMS END */}

              {/* SUMMARY START */}
              <div className="flex-[1]">
                <div className="text-lg font-bold">Summary</div>

                <div className="p-5 my-5 bg-black/[0.05] rounded-xl">
                  <div className="flex justify-between">
                    <div className="uppercase text-md md:text-lg font-medium text-black">
                      Subtotal
                    </div>
                    <div className="text-md md:text-lg font-medium text-black">
                      &#8377;34
                    </div>
                  </div>
                  <div className="text-sm md:text-md py-5 border-t mt-5">
                    The subtotal reflects the total price of your order,
                    including duties and taxes, before any applicable discounts.
                    It does not include delivery costs and international
                    transaction fees.
                  </div>
                </div>

                {/* BUTTON START */}
                <button
                  className=" w-full py-4 rounded-full bg-black text-white text-lg font-medium transition-transform active:scale-95 mb-3 hover:opacity-75 flex items-center gap-2 justify-center"
                  onClick={() => {}}
                >
                  Proceed To Checkout{" "}
                  <span className="text-2xl -mt-2">
                    {" "}
                    <IoCartOutline />
                  </span>
                  {loading && <img src="/spinner.svg" />}
                </button>
                {/* BUTTON END */}
              </div>
              {/* SUMMARY END */}
            </div>
            {/* CART CONTENT END */}
          </>
        )}

        {/* This is empty screen */}
        {cartItems.length < 1 && (
          <div className="flex-[2] flex flex-col items-center pb-[50px] md:-mt-14">
            <Image
              src="/empty-cart.png"
              width={300}
              height={300}
              className="w-[300px] md:w-[400px]"
            />
            <span className="text-xl font-bold">Your cart is empty</span>
            <span className="text-center mt-4">
              Looks like you have not added anything in your cart.
              <br />
              Go ahead and explore top categories.
            </span>
            <Link
              href="/"
              className="py-4 px-8 rounded-full bg-black text-white text-lg font-medium transition-transform active:scale-95 mb-3 hover:opacity-75 mt-8"
            >
              Continue Shopping
            </Link>
          </div>
        )}
      </Wrapper>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Enter Your address Details
              </ModalHeader>
              <ModalBody>
                <div className="flex flex-col text-gray-600 gap-2 unded-md">
                  <div className="flex flex-col gap-1 mt-2">
                    <label>Address Line 1:</label>
                    <input
                      type="text"
                      value={addressLine1}
                      onChange={(e) => setAddressLine1(e.target.value)}
                      className="border-2 border-gray-500 px-3 text-sm py-[7px] items-center justify-center rounded-md"
                    />
                    {formErrors.addressLine1 && (
                      <div className="text-red-500 text-sm">
                        {formErrors.addressLine1}
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col gap-2">
                    <label>Address Line 2:</label>
                    <input
                      type="text"
                      value={addressLine2}
                      onChange={(e) => setAddressLine2(e.target.value)}
                      className="border-2 border-gray-500 px-3 text-sm py-[7px] items-center justify-center rounded-md"
                    />
                    {formErrors.addressLine2 && (
                      <div className="text-red-500 text-sm">
                        {formErrors.addressLine2}
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col gap-2">
                    <label>City:</label>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="border-2 border-gray-500 px-3 text-sm py-[7px] items-center justify-center rounded-md"
                    />
                    {formErrors.city && (
                      <div className="text-red-500 text-sm">
                        {formErrors.city}
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col gap-2">
                    <label>State:</label>
                    <input
                      type="text"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      className="border-2 border-gray-500 px-3 text-sm py-[7px] items-center justify-center rounded-md"
                    />
                    {formErrors.state && (
                      <div className="text-red-500 text-sm">
                        {formErrors.state}
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col gap-2">
                    <label>Postal Code:</label>
                    <input
                      type="text"
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                      className="border-2 border-gray-500 px-3 text-sm py-[7px] items-center justify-center rounded-md"
                    />
                    {formErrors.postalCode && (
                      <div className="text-red-500 text-sm">
                        {formErrors.postalCode}
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col gap-2">
                    <label>Country:</label>
                    <input
                      type="text"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="border-2 border-gray-500 px-3 text-sm py-[7px] items-center justify-center rounded-md"
                    />
                    {formErrors.country && (
                      <div className="text-red-500 text-sm">
                        {formErrors.country}
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col gap-2">
                    <label>Address Type:</label>
                    <select
                      value={addressType}
                      onChange={(e) => setAddressType(e.target.value)}
                      className="border-2 border-gray-500 px-3 text-sm py-[7px] items-center justify-center rounded-md"
                    >
                      <option value="">Select</option>
                      <option value="Home">Home</option>
                      <option value="Work">Work</option>
                    </select>
                    {formErrors.addressType && (
                      <div className="text-red-500 text-sm">
                        {formErrors.addressType}
                      </div>
                    )}
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <button
                  onClick={handleSubmit}
                  className=" bg-blue-500 text-white p-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:border-blue-300"
                >
                  Submit
                </button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default Cart;
