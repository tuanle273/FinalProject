import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Toaster, toast } from "react-hot-toast";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import { BookingContext } from "../../../contexts/BookingContext";
import { DiscountContext } from "../../../contexts/DiscountContext";
import { VehicleContext } from "../../../contexts/VehicleContext";
const CheckOut = () => {
  const {
    authState: { user },
  } = useContext(AuthContext);
  const [vehicles, setVehicle] = useState(null);
  const { createBooking } = useContext(BookingContext);
  const { getDetailVehicle } = useContext(VehicleContext);
  const { checkDiscount } = useContext(DiscountContext);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [code, setCode] = useState("");
  const [discount, setDiscount] = useState(null);
  const [payment, setPayment] = useState("later_money");

  const handleStripe = async () => {
    const sessionId = await createPayment();
    console.log(
      "🚀 ~ file: CheckOut.js:27 ~ handleStripe ~ sessionId:",
      sessionId
    );
  };
  const createPayment = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/payment/stripe"
      );
      const { sessionId } = response.data;
      window.location.href = `https://checkout.stripe.com/pay/${sessionId}`;
    } catch (error) {
      console.error(error);
    }
  };

  const handleApplyDiscount = async (event) => {
    event.preventDefault();
    try {
      const response = await checkDiscount(code);
      const discount = response.data;
      setDiscount(discount.amount);
      toast.success(
        `Discount found: ${discount.name} (${discount.amount * 100}% off)`
      );
    } catch (error) {
      setDiscount(null);
      toast.error("Discount code not found.");
    }
  };
  const { vehicleId } = useParams();
  const today = new Date();
  const [formData, setFormData] = useState({
    userId: user._id,
    vehicleId: vehicleId,
    totalCost: "10000",
  });

  useEffect(() => {
    const getVehicle = async () => {
      const respone = await getDetailVehicle(vehicleId);

      setVehicle(respone.data);
    };

    getVehicle();
  }, [vehicleId]);
  if (!vehicles) {
    return <div>Loading...</div>;
  }

  const start = new Date(startDate);
  const end = new Date(endDate);
  const timeDiff = Math.abs(end.getTime() - start.getTime());
  const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
  const amount = discount;

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await createBooking(formData);

    if (response.success) {
      toast.success(response.message);
    } else {
      toast.error(response.message);
    }
  };

  const handlePayment = (e) => {
    setPayment(e.target.value);
  };
  const subTotal = vehicles.price * diffDays;
  const Total = amount ? subTotal * amount : subTotal;
  return (
    <div>
      {" "}
      <Toaster />
      <div className="h-screen bg-gray-100 pt-10">
        <h1 className="mb-10 text-center text-2xl font-bold">Check Out</h1>
        <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
          <div className="rounded-lg md:w-3/3">
            <div className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
              <div className="overflow-hidden rounded-lg  bg-gray-50 border border-gray-200">
                <img
                  src={vehicles.imageUrl}
                  alt="product-image"
                  className="w-full rounded-lg sm:w-70"
                />
              </div>

              <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                <div className="mt-5 sm:mt-0">
                  <h2 className="text-lg font-bold text-gray-900">
                    {vehicles.model} - {vehicles.title}{" "}
                  </h2>
                  <p className="mt-1 text-xs text-gray-700">
                    ${vehicles.price} per Day
                  </p>
                </div>
                <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6"></div>
              </div>
              <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                <div className="mb-6 pb-6 border-b border-gray-200">
                  <label>Start date:</label>
                  <DatePicker
                    className="bg-white p-2 rounded mt-1 border-2 border-grey cursor-pointer hover:bg-grey-lighter"
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    showTimeSelect
                    minDate={today}
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    dateFormat="yyyy-MM-dd'T'HH:mm:ss.SSS'Z'"
                  />
                  <label>End date:</label>
                  <DatePicker
                    selected={endDate}
                    className="bg-white p-2 rounded mt-1 border-2 border-grey cursor-pointer hover:bg-grey-lighter"
                    onChange={(date) => setEndDate(date)}
                    showTimeSelect
                    minDate={today}
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    dateFormat="yyyy-MM-dd'T'HH:mm:ss.SSS'Z'"
                  />
                </div>
                <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6"></div>
              </div>
            </div>

            <div className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
              {" "}
              <div
                className="w-full mx-auto rounded-lg bg-white border border-gray-200 text-gray-800 font-light mb-6"
                onChange={handlePayment}
                value={payment}
              >
                <div className="w-full p-3 border-b border-gray-200">
                  <div className="mb-1">
                    <label
                      htmlFor="type1"
                      className="flex items-center cursor-pointer"
                    >
                      <input
                        type="radio"
                        className="form-radio h-5 w-5 text-indigo-500"
                        name="type"
                        id="type1"
                        value="later_money"
                        defaultChecked
                      />
                      <span className="text-gray-600 font-semibold text-sm ml-4">
                        Pay when car delivery
                      </span>
                    </label>
                  </div>
                </div>
                <div className="w-full p-3 border-b border-gray-200">
                  <label
                    htmlFor="type2"
                    className="flex items-center cursor-pointer"
                  >
                    <input
                      type="radio"
                      className="form-radio h-5 w-5 text-indigo-500"
                      name="type"
                      id="type2"
                      value="paypal"
                    />
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg"
                      width="80"
                      className="ml-3"
                    />
                  </label>
                </div>
                <div className="w-full p-3 border-b border-gray-200">
                  <label
                    htmlFor="type3"
                    className="flex items-center cursor-pointer"
                  >
                    <input
                      type="radio"
                      className="form-radio h-5 w-5 text-indigo-500"
                      name="type"
                      id="type3"
                      value="stripe"
                    />
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Stripe_Logo%2C_revised_2016.svg/2560px-Stripe_Logo%2C_revised_2016.svg.png"
                      width="60"
                      className="ml-3"
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
            <div className="flex justify-between">
              <p className="text-lg font-bold">Bill</p>
            </div>{" "}
            <div className="mb-2 flex justify-between">
              <p className="text-gray-700">Rental price per day</p>
              <p className="text-gray-700">${vehicles.price}</p>
            </div>
            <div className="mb-2 flex justify-between">
              <p className="text-gray-700">Time</p>
              <p className="text-gray-700">{diffDays}</p>
            </div>{" "}
            <div className="flex justify-between">
              <p className="text-gray-700">Discount</p>
              <p className="text-gray-700">
                {" "}
                {amount ? (
                  <button
                    onClick={setCode === null}
                    className="text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2 text-center mr-1 mb-2"
                  >
                    Cancel
                  </button>
                ) : (
                  ""
                )}
                %{amount * 100}
              </p>
            </div>{" "}
            <div className="flex justify-between">
              <p className="text-gray-700">SubTotal</p>
              <p className="text-gray-700">${subTotal}</p>
            </div>{" "}
            <hr className="my-4" />
            <div className="flex justify-between">
              <p className="text-lg font-bold">Bonus</p>
            </div>
            <div className="mb-2 flex justify-between">
              <textarea
                className="bg-white p-2 rounded mt-1 border-2 border-grey cursor-pointer hover:bg-grey-lighter"
                placeholder="Note"
              ></textarea>
            </div>
            <div className="flex justify-between">
              {" "}
              <div>
                <label htmlFor="discount-code">Discount code:</label>
                <input
                  type="text"
                  id="discount-code"
                  className="bg-white p-2 rounded mt-1 border-2 border-grey cursor-pointer hover:bg-grey-lighter"
                  value={code}
                  autoCapitalize="characters"
                  onChange={(event) => setCode(event.target.value)}
                />
              </div>{" "}
            </div>{" "}
            <div className="px-1">
              <button
                type="button"
                className="text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2 text-center mr-1 mb-2"
                onClick={handleApplyDiscount}
              >
                Apply
              </button>{" "}
            </div>
            <hr className="my-4" />
            <div className="flex justify-between">
              <p className="text-lg font-bold">Total</p>
              <div className="">
                <p className="mb-1 text-lg font-bold">${Total}</p>
                <p className="text-sm text-gray-700">including VAT</p>
              </div>
            </div>
            {payment === "later_money" ? (
              <button
                type="submit"
                className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600"
              >
                Pay Later
              </button>
            ) : (
              <button
                type="submit"
                onClick={handleStripe}
                className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600"
              >
                Pay with Stripe
              </button>
            )}
          </div>
        </div>{" "}
      </div>{" "}
    </div>
  );
};

export default CheckOut;
