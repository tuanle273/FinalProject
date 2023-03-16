import React, { useContext, useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
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
  const { vehicleId, startDate, endDate } = useParams();
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
              <p className="text-gray-700">
                {startDate} {endDate}
              </p>
            </div>
            <div className="flex justify-between">
              <p className="text-gray-700">SubTotal</p>
              <p className="text-gray-700"></p>
            </div>
            <div className="flex justify-between">
              <p className="text-gray-700">Discount Code</p>{" "}
            </div>
            <div className="mb-2 flex justify-between">
              {" "}
              <input
                type="text"
                name=""
                id=""
                placeholder="Discount Code"
                className="border rounded"
              />
            </div>
            <button>Apply</button>
            <hr className="my-4" />
            <div className="flex justify-between">
              <p className="text-lg font-bold">Bonus</p>
            </div>{" "}
            <div className="mb-2 flex justify-between">
              {" "}
              <textarea
                name=""
                id=""
                cols="10"
                rows="3"
                placeholder="Note"
                class="border p-2 mt-3 w-full"
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
