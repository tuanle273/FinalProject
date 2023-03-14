import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { VehicleContext } from "../../../contexts/VehicleContext";

const CheckOut = () => {
  const [vehicles, setVehicle] = useState(null);
  const { getDetailVehicle } = useContext(VehicleContext);
  const { vehicleId, diffDays } = useParams();
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

  return (
    <div>
      <div className="h-screen bg-gray-100 pt-20">
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
                    {vehicles.model}
                    {vehicles.title}{" "}
                  </h2>
                  <p className="mt-1 text-xs text-gray-700">36EU - 4US</p>
                </div>
                <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6"></div>
              </div>
            </div>
          </div>

          <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
            <div className="mb-2 flex justify-between">
              <p className="text-gray-700">Rental price per day</p>
              <p className="text-gray-700">${vehicles.price}</p>
            </div>
            <div className="mb-2 flex justify-between">
              <p className="text-gray-700">Rent Day</p>
              <p className="text-gray-700">{diffDays}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-gray-700">SubTotal</p>
              <p className="text-gray-700">${vehicles.price * diffDays}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-gray-700">Discount Code</p>
              <input className="text-gray-700"></input>
              <button>Apply</button>
            </div>
            <hr className="my-4" />
            <div className="flex justify-between">
              <p className="text-lg font-bold">Total</p>
              <div className="">
                <p className="mb-1 text-lg font-bold">
                  ${vehicles.price * diffDays}
                </p>
                <p className="text-sm text-gray-700">including VAT</p>
              </div>
            </div>
            <button className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600">
              Check out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
