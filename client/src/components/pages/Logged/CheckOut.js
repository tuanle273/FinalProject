import React, { useContext, useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-hot-toast";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import { BookingContext } from "../../../contexts/BookingContext";
import { VehicleContext } from "../../../contexts/VehicleContext";
const CheckOut = () => {
  const {
    authState: { user },
  } = useContext(AuthContext);
  const [vehicles, setVehicle] = useState(null);
  const { createBooking } = useContext(BookingContext);
  const { getDetailVehicle } = useContext(VehicleContext);
  const [startDate, setStartDate] = useState(new Date());

  const [endDate, setEndDate] = useState(new Date());

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

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await createBooking(formData);

    if (response.success) {
      toast.success(response.message);
    } else {
      toast.error(response.message);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <div className="h-screen bg-gray-100 pt-10">
        <h1 className="mb-10 text-center text-2xl font-bold">Check Out</h1>
        <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
          <div className="rounded-lg md:w-2/3">
            <div className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
              <img
                src={vehicles.imageUrl}
                alt="product-image"
                className="w-full rounded-lg sm:w-40"
              />
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
                <div className="mt-5 sm:mt-0">
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
            </div>
            <div className="flex justify-between">
              <p className="text-gray-700">SubTotal</p>
              <p className="text-gray-700">${vehicles.price * diffDays}</p>
            </div>
            <div className="mb-2 flex justify-between">
              {" "}
              <input
                type="text"
                name=""
                id=""
                placeholder="Discount Code"
                className="bg-white p-2 rounded mt-1 border-2 border-grey cursor-pointer hover:bg-grey-lighter"
              />
            </div>{" "}
            <button
              type="button"
              class="text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2 text-center mr-1 mb-2"
            >
              Apply
            </button>
            <hr className="my-4" />
            <div className="flex justify-between">
              <p className="text-lg font-bold">Bonus</p>
            </div>{" "}
            <div className="mb-2 flex justify-between">
              {" "}
              <textarea
                className="bg-white p-2 rounded mt-1 border-2 border-grey cursor-pointer hover:bg-grey-lighter"
                placeholder="Bio"
              ></textarea>
            </div>
            <hr className="my-4" />
            <div className="flex justify-between">
              <p className="text-lg font-bold">Total</p>
              <div className="">
                <p className="mb-1 text-lg font-bold"></p>
                <p className="text-sm text-gray-700">including VAT</p>
              </div>
            </div>
            <button
              type="submit"
              className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600"
            >
              Check out
            </button>
          </div>
        </div>
      </div>
    </Form>
  );
};

export default CheckOut;
