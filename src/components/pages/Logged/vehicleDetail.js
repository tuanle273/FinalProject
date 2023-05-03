import { useContext, useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { Toaster } from "react-hot-toast";
import { FaTruckLoading } from "react-icons/fa";
import { GrSettingsOption } from "react-icons/gr";
import {
  IoCalendarNumberOutline,
  IoCarOutline,
  IoColorPaletteOutline,
} from "react-icons/io5";
import { Link, useParams } from "react-router-dom";
import { VehicleContext } from "../../../contexts/VehicleContext";
const VehicleDetail = () => {
  const { vehicleId } = useParams();
  const [vehicles, setVehicle] = useState(null);
  const { getDetailVehicle } = useContext(VehicleContext);

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
      <div>
        <div className="container px-5 py-24 mx-auto">
          <Toaster />
          <div className="lg:w-4/5 mx-auto flex flex-wrap bg-white shadow-2xl p-6 rounded-2xl border-2 border-gray-50">
            <img
              alt="ecommerce"
              className="lg:w-1/2 w-full object-cover object-center rounded border border-gray-200"
              src={vehicles.imageUrl}
            />
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h2 className="text-sm title-font text-gray-500 tracking-widest">
                {vehicles.model}
              </h2>
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                {vehicles.title}
              </h1>
              <div className="flex mb-4">
                <span className="flex items-center">
                  <svg
                    fill="currentColor"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-4 h-4 text-red-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg
                    fill="currentColor"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-4 h-4 text-red-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg
                    fill="currentColor"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-4 h-4 text-red-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg
                    fill="currentColor"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-4 h-4 text-red-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-4 h-4 text-red-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <span className="text-gray-600 ml-3">4 Reviews</span>
                </span>
                <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200">
                  <a className="text-gray-500">
                    <svg
                      fill="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                    </svg>
                  </a>
                  <a className="ml-2 text-gray-500">
                    <svg
                      fill="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                    </svg>
                  </a>
                  <a className="ml-2 text-gray-500">
                    <svg
                      fill="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                    </svg>
                  </a>
                </span>
              </div>
              <p className="leading-relaxed">{vehicles.description}</p>
              <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-200 mb-5">
                <div className="flex flex-row space-x-1">
                  <div className="bg-gray-100 px-3 py-1 rounded-lg flex space-x-2 flex-row">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M19 9V6a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v3"></path>
                      <path d="M3 11v5a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5a2 2 0 0 0-4 0v2H7v-2a2 2 0 0 0-4 0Z"></path>
                      <path d="M5 18v2"></path>
                      <path d="M19 18v2"></path>
                    </svg>
                    <p className="text-xxsm">{vehicles.seat}</p>
                  </div>
                  <div className="bg-gray-100 px-3 py-1 rounded-lg flex space-x-2 flex-row">
                    <IoColorPaletteOutline />
                    <p className="text-xxsm"> {vehicles.color}</p>
                  </div>{" "}
                  <div className="bg-gray-100 px-3 py-1 rounded-lg flex space-x-2 flex-row">
                    <IoCarOutline />
                    <p className="text-xxsm"> {vehicles.type}</p>
                  </div>{" "}
                  <div className="bg-gray-100 px-3 py-1 rounded-lg flex space-x-2 flex-row">
                    <IoCalendarNumberOutline />
                    <p className="text-xxsm"> {vehicles.year}</p>
                  </div>{" "}
                  <div className="bg-gray-100 px-3 py-1 rounded-lg flex space-x-2 flex-row">
                    <FaTruckLoading />
                    <p className="text-xxsm"> {vehicles.capacity}</p>
                  </div>{" "}
                  <div className="bg-gray-100 px-3 py-1 rounded-lg flex space-x-2 flex-row">
                    <GrSettingsOption />
                    <p className="text-xxsm"> {vehicles.transmission}</p>
                  </div>
                </div>
              </div>{" "}
              <div className="flex">
                <div>
                  <div className="rounded-lg bg-gray-100 flex py-2 px-3">
                    <span className="text-indigo-400 mr-1 mt-1">$</span>
                    <span className="font-bold text-indigo-600 text-3xl">
                      {vehicles.price}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex py-4 space-x-4">
                <Link
                  to={`/checkout/${vehicles._id}`}
                  disabled={!vehicles.availability}
                  type="submit"
                  className="h-10 px-6 py-2 font-semibold rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white"
                >
                  {" "}
                  {vehicles.availability ? "Rent" : "Not available"}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleDetail;
