import React, { Fragment, useContext, useEffect, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { VehicleContext } from "../../../contexts/VehicleContext";

import { Link } from "react-router-dom";
export default function HomePage() {
  const [vehicles, setVehicle] = useState(null);
 
  const {
    loadVehicles
  } = useContext(VehicleContext);
  useEffect(() => {
    const loadVehicle = async () => {
      const response = await loadVehicles();
     
      setVehicle(response.data);
    };
    loadVehicle()}, []);

      return (
        <Fragment>
          <main>
            {" "}
            <Toaster />
            <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
              <div className="px-4 py-6 sm:px-0">
                <div
                  className="grid grid-cols-4 gap-4 "
                  style={{ marginLeft: "5em" }}
                >
                  {vehicles &&
                    vehicles.map((item) => (
                      <div key={item._id}>
                        <div className="bg-gray-800 w-60 shadow-lg rounded p-2">
                          <div className="py-2 px-4 text-center tracking-wide grid grid-cols-3 gap-6">
                            <div className="flex tools">
                              <p className="flex text-gray-400 text-sm justify-center">
                                Seat
                              </p>
                              <p className="text-sm text-gray-50 animate-pulse px-2">
                                {item.seat}
                              </p>
                            </div>
                            <div className="flex followers">
                              <p className="flex text-gray-400 text-sm justify-center">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-5 w-5"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                                  />
                                </svg>
                              </p>
                              <p className="text-sm text-gray-50 animate-pulse px-2">
                                {" "}
                                {item.capacity}
                              </p>
                            </div>
                            <div className="flex following">
                              <p className="flex text-gray-400 text-sm justify-center">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-5 w-5"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                                  />
                                </svg>
                              </p>
                              <p className="text-sm text-gray-50 animate-pulse px-2">
                                {" "}
                                {item.transmission}
                              </p>
                            </div>
                          </div>
                          <div className="group relative">
                            <img
                              alt="Placeholder"
                              className="block h-48 w-full rounded"
                              src={item.imageUrl}
                            />
                          </div>
                          <div className="p-2">
                            <h3 className=" text-white py-1 text-base justify-center">
                              {item.title.toUpperCase()}
                            </h3>
                            <p className="text-gray-400 text-sm">
                              Model: {item.model}
                            </p>
                            <p className="text-gray-400 text-sm">
                              Price: {item.price} $
                            </p>
                            <p className="text-gray-400 text-sm">
                              Available: {String(item.availability)}
                            </p>
                            <span className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
                              #{item.type}
                            </span>
                          </div>
                          <div className="flex items-center flex-auto justify-between">
                            <a
                              href="#"
                              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                              Book
                            </a>
                            <Link  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" to={`/vehicleDetail/${item._id}`}>
                              View Detail
                         </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </main>
        </Fragment>
      );
  
  }
  

