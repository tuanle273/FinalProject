import React, { Fragment, useContext } from "react";
import { VehicleContext } from "../../../contexts/VehicleContext";
export default function HomePage() {
  const {
    vehicleState: { vehicles, vehicleLoading, vehicleError },
  } = useContext(VehicleContext);

  if (vehicleLoading) return <h1>Loading data</h1>;
  else if (vehicles && !vehicleError)
    return (
      <Fragment>
        <main>
          <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
            <div className="px-4 py-6 sm:px-0">
              <div
                className="grid grid-cols-4 gap-4 "
                style={{ marginLeft: "5em" }}
              >
                {vehicles &&
                  vehicles.map((item) => (
                    <div>
                      <div class="bg-gray-800 w-60 shadow-lg rounded p-2">
                        <div class="py-2 px-4 text-center tracking-wide grid grid-cols-3 gap-6">
                          <div class="flex tools">
                            <p class="flex text-gray-400 text-sm justify-center">
                              Seat
                            </p>
                            <p class="text-sm text-gray-50 animate-pulse px-2">
                              {item.seat}
                            </p>
                          </div>
                          <div class="flex followers">
                            <p class="flex text-gray-400 text-sm justify-center">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                                />
                              </svg>
                            </p>
                            <p class="text-sm text-gray-50 animate-pulse px-2">
                              {" "}
                              {item.capacity}
                            </p>
                          </div>
                          <div class="flex following">
                            <p class="flex text-gray-400 text-sm justify-center">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                                />
                              </svg>
                            </p>
                            <p class="text-sm text-gray-50 animate-pulse px-2">
                              {" "}
                              {item.transmission}
                            </p>
                          </div>
                        </div>
                        <div class="group relative">
                          <img
                            alt="Placeholder"
                            class="block h-48 w-full rounded"
                            src={item.image}
                          />
                        </div>
                        <div class="p-2">
                          <h3 class=" text-white py-1 text-base justify-center">
                            {item.title.toUpperCase()}
                          </h3>
                          <p class="text-gray-400 text-sm">
                            Model: {item.model}
                          </p>
                          <p class="text-gray-400 text-sm">
                            Price: {item.price} $
                          </p>
                          <p class="text-gray-400 text-sm">
                            Available: {String(item.availability)}
                          </p>
                          <span class="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
                            #{item.type}
                          </span>
                        </div>
                        <div class="flex items-center flex-auto justify-between">
                          <a
                            href="#"
                            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                          >
                            Book
                          </a>
                          <a
                            href="#"
                            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                          >
                            View Detail
                          </a>
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
  else {
    return <h1>Something Went Wrong</h1>;
  }
}
