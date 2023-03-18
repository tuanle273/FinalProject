import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { VehicleContext } from "../../../contexts/VehicleContext";
export default function HomePage() {
  const [vehicles, setVehicle] = useState(null);

  const { loadVehicles } = useContext(VehicleContext);
  useEffect(() => {
    const loadVehicle = async () => {
      const response = await loadVehicles();

      setVehicle(response.data);
    };
    loadVehicle();
  }, []);

  return (
    <section class="py-12 bg-white sm:py-16 lg:py-20">
      <div class="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        <div class="max-w-md mx-auto text-center">
          <h2 class="text-2xl font-bold text-gray-900 sm:text-3xl">
            Our new Cars
          </h2>
          <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
          <p class="mt-4 text-base font-normal leading-7 text-gray-600">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Purus
            faucibus massa dignissim tempus.
          </p>
        </div>
        <div class="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8 ">
          {vehicles &&
            vehicles.slice(0, 6).map((item) => (
              <div key={item._id}>
                <div className="shadow-md rounded p-5">
                  <div class="group relative ">
                    <div class="overflow-hidden aspect-w-1 aspect-h-1">
                      <img
                        class="object-cover w-full h-full transition-all duration-400 overflow-hidden group-hover:scale-110"
                        src={item.imageUrl}
                        alt=""
                      />
                    </div>
                    <div class="absolute left-auto top-1">
                      <span class="inline-block bg-blue-500 text-white text-xs px-2 rounded-full uppercase tracking-wide">
                        New
                      </span>
                    </div>

                    <div class="absolute right-3 top-3">
                      <span class="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300">
                        {item.type}
                      </span>
                    </div>

                    <div class="flex items-start justify-between mt-4 space-x-4">
                      <div>
                        <h3 class="text-xs font-bold text-gray-900 sm:text-sm md:text-base">
                          <Link to={`/vehicleDetail/${item._id}`} title="">
                            {item.title}
                            <span
                              class="absolute inset-0"
                              aria-hidden="true"
                            ></span>
                          </Link>{" "}
                          {item.year}{" "}
                          <span class="bg-gray-100 text-gray-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-gray-700 dark:text-gray-300">
                            Delivery Available
                          </span>
                        </h3>{" "}
                        <span class="bg-gray-100 text-gray-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-gray-700 dark:text-gray-300">
                          {item.transmission}
                        </span>
                        <span class="bg-gray-100 text-gray-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-gray-700 dark:text-gray-300">
                          {item.seat}
                        </span>
                        <div class="flex items-center mt-2.5 space-x-px">
                          <svg
                            class="w-3 h-3 text-yellow-400 sm:w-4 sm:h-4"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          <svg
                            class="w-3 h-3 text-yellow-400 sm:w-4 sm:h-4"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          <svg
                            class="w-3 h-3 text-yellow-400 sm:w-4 sm:h-4"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          <svg
                            class="w-3 h-3 text-yellow-400 sm:w-4 sm:h-4"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          <svg
                            class="w-3 h-3 text-gray-300 sm:w-4 sm:h-4"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        </div>
                      </div>

                      <div class="text-right">
                        <p class="text-xs font-bold text-gray-900 sm:text-sm md:text-base">
                          ${item.price}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
    
  );
}
