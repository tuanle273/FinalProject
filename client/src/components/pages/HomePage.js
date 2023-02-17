import React, { Fragment, useContext } from "react";
import { VehicleContext } from "../../contexts/VehicleContext";

export default function HomePage() {
  const {
    vehicleState: { vehicles, vehicleLoading, vehicleError },
  } = useContext(VehicleContext);

  if (vehicleLoading) return <h1>Loading data</h1>;
  else if (vehicles && !vehicleError)
    return (
      <Fragment>
        <div className="grid grid-cols-4 gap-4" style={{ marginLeft: "5em" }}>
          {vehicles &&
            vehicles.map((item) => (
              <div>
                <div class="bg-gray-800 w-60 shadow-lg rounded p-2">
                  <div class="py-2 px-4 text-center tracking-wide grid grid-cols-3 gap-6">
                    <div class="flex tools">
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
                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                          />
                        </svg>
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
                    <div class="absolute bg-black rounded bg-opacity-0 group-hover:bg-opacity-60 w-full h-full top-0 flex items-center group-hover:opacity-100 duration-700 transition justify-evenly">
                      <button class="hover:scale-110 text-white outline-none  opacity-0 transform translate-y-3 group-hover:translate-y-0 group-hover:opacity-100 transition">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          fill="currentColor"
                          class="bi bi-heart"
                          viewBox="0 0 16 16"
                        >
                          <path d="M8 2.748l-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
                        </svg>
                      </button>

                      <button class="hover:scale-110 text-white outline-none opacity-0 transform translate-y-3 group-hover:translate-y-0 group-hover:opacity-100 transition">
                        <svg
                          v-if="this.is_playing == false"
                          xmlns="http://www.w3.org/2000/svg"
                          width="40"
                          height="40"
                          fill="currentColor"
                          class="bi bi-play-circle-fill"
                          viewBox="0 0 16 16"
                        >
                          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814l-3.5-2.5z" />
                        </svg>
                      </button>

                      <button class="hover:scale-110 text-white outline-none opacity-0 transform translate-y-3 group-hover:translate-y-0 group-hover:opacity-100 transition">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          fill="currentColor"
                          class="bi bi-three-dots"
                          viewBox="0 0 16 16"
                        >
                          <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div class="p-2">
                    <h3 class=" text-white py-1 text-base justify-center">
                      {item.title.toUpperCase()}
                    </h3>
                    <p class="text-gray-400 text-sm">Model: {item.model}</p>
                    <p class="text-gray-400 text-sm">Price: {item.price} $</p>
                    <p class="text-gray-400 text-sm">
                      Available: {String(item.availability)}
                    </p>
                  </div>
                  <div class="flex items-right justify-between">
                    <a
                      href="#"
                      class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Book
                    </a>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </Fragment>
    );
  else {
    return <h1>Something Went Wrong</h1>;
  }
}
