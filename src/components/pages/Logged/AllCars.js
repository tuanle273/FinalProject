import React, { useContext, useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { VehicleContext } from "../../../contexts/VehicleContext";

const Vehicles = () => {
  const [vehicles, setVehicles] = useState(null);
  const [pageNumber, setPageNumber] = useState(0);

  const { loadVehicles } = useContext(VehicleContext);

  useEffect(() => {
    const loadVehicle = async () => {
      const response = await loadVehicles();

      setVehicles(response.data);
    };
    loadVehicle();
  }, []);

  const vehiclesPerPage = 6;
  const pagesVisited = pageNumber * vehiclesPerPage;

  const pageCount = Math.ceil(vehicles && vehicles.length / vehiclesPerPage);

  const displayVehicles = () => {
    return (
      vehicles &&
      vehicles
        .slice(pagesVisited, pagesVisited + vehiclesPerPage)
        .map((vehicle) => (
          <div key={vehicle._id}>
            <div className="shadow-md rounded p-5">
              <div class="group relative ">
                <div class="overflow-hidden aspect-w-1 aspect-h-1">
                  <img
                    class="object-cover w-full h-full transition-all duration-400 overflow-hidden group-hover:scale-110"
                    src={vehicle.imageUrl}
                    alt=""
                  />
                </div>
                <div class="absolute bottom-0 left-0 px-4 py-2 bg-black bg-opacity-50 text-white w-full transition-all duration-400 opacity-0 group-hover:opacity-100">
                  <p>{vehicle.name}</p>
                </div>
              </div>
            </div>
          </div>
        ))
    );
  };

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <section class="py-12 bg-white sm:py-16 lg:py-20">
      <div class="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        <div class="flex">
          <label
            for="search-dropdown"
            class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            Your Email
          </label>
          <button
            id="dropdown-button"
            data-dropdown-toggle="dropdown"
            class="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-l-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
            type="button"
          >
            All categories{" "}
            <svg
              aria-hidden="true"
              class="w-4 h-4 ml-1"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button>
          <div
            id="dropdown"
            class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
          >
            <ul
              class="py-2 text-sm text-gray-700 dark:text-gray-200"
              aria-labelledby="dropdown-button"
            >
              <li>
                <button
                  type="button"
                  class="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Mockups
                </button>
              </li>
              <li>
                <button
                  type="button"
                  class="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Templates
                </button>
              </li>
              <li>
                <button
                  type="button"
                  class="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Design
                </button>
              </li>
              <li>
                <button
                  type="button"
                  class="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Logos
                </button>
              </li>
            </ul>
          </div>
          <div class="relative w-full">
            <input
              type="search"
              id="search-dropdown"
              class="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-r-lg border-l-gray-50 border-l-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-l-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
              placeholder="Search Mockups, Logos, Design Templates..."
              required
            />
            <button
              type="submit"
              class="absolute top-0 right-0 p-2.5 text-sm font-medium text-white bg-blue-700 rounded-r-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              <svg
                aria-hidden="true"
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
              <span class="sr-only">Search</span>
            </button>
          </div>
        </div>
        <div class="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8 ">
          {displayVehicles()}
        </div>
        <ReactPaginate
          previousLabel={"Prev"}
          nextLabel={"Next"}
          pageCount={pageCount}
          onPageChange={changePage}
          containerClassName={"flex justify-center mt-4"}
          pageClassName={
            "mx-2 rounded-full py-2 px-4 bg-white text-gray-600 font-medium hover:bg-blue-500 hover:text-white"
          }
          pageLinkClassName={"block focus:outline-none"}
          previousClassName={
            "mx-2 rounded-full py-2 px-4 bg-white text-gray-600 font-medium hover:bg-blue-500 hover:text-white prevBtn"
          }
          previousLinkClassName={"block focus:outline-none"}
          nextClassName={
            "mx-2 rounded-full py-2 px-4 bg-white text-gray-600 font-medium hover:bg-blue-500 hover:text-white nextBtn"
          }
          nextLinkClassName={"block focus:outline-none"}
          disabledClassName={"opacity-50 cursor-not-allowed paginationDisabled"}
          activeClassName={"bg-blue-500 text-bold bg-blue-500 paginationActive"}
          style={{ margin: "0 auto" }}
        />
      </div>
    </section>
  );
};

export default Vehicles;
