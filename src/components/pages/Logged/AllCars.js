import React, { useContext, useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import { VehicleContext } from "../../../contexts/VehicleContext";

const Vehicles = () => {
  const [pageNumber, setPageNumber] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  const {
    vehicleState: { vehicles },

    loadVehicles,
  } = useContext(VehicleContext);

  useEffect(() => {
    loadVehicles();
  }, []);

  const vehiclesPerPage = 6;
  const pagesVisited = pageNumber * vehiclesPerPage;

  const pageCount = Math.ceil(vehicles && vehicles.length / vehiclesPerPage);

  const displayVehicles = () => {
    let filteredVehicles = [];
    if (Array.isArray(vehicles)) {
      filteredVehicles = vehicles.filter(
        (vehicle) =>
          vehicle.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          vehicle.type.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return (
      filteredVehicles &&
      filteredVehicles
        .slice(pagesVisited, pagesVisited + vehiclesPerPage)
        .map((vehicle) => (
          <div key={vehicle._id}>
            <div className="shadow-md rounded p-5">
              <div className="group relative ">
                <div className="overflow-hidden aspect-w-1 aspect-h-1">
                  <img
                    className="object-cover w-full h-full transition-all duration-400 overflow-hidden group-hover:scale-110"
                    src={vehicle.imageUrl}
                    alt=""
                  />
                </div>

                <div className="absolute right-3 top-3">
                  <span className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300">
                    {vehicle.type}
                  </span>
                </div>

                <div className="flex items-start justify-between mt-4 space-x-4">
                  <div>
                    <h3 className="text-xs font-bold text-gray-900 sm:text-sm md:text-base">
                      <Link to={`/vehicleDetail/${vehicle._id}`} title="">
                        {vehicle.title}
                        <span
                          className="absolute inset-0"
                          aria-hidden="true"
                        ></span>
                      </Link>{" "}
                      {vehicle.year}{" "}
                      <span className="bg-gray-100 text-gray-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-gray-700 dark:text-gray-300">
                        Delivery Available
                      </span>
                    </h3>{" "}
                    <span className="bg-gray-100 text-gray-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-gray-700 dark:text-gray-300">
                      {vehicle.transmission}
                    </span>
                    <span className="bg-gray-100 text-gray-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-gray-700 dark:text-gray-300">
                      {vehicle.seat}
                    </span>
                    <div className="flex items-center mt-2.5 space-x-px">
                      <svg
                        className="w-3 h-3 text-yellow-400 sm:w-4 sm:h-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <svg
                        className="w-3 h-3 text-yellow-400 sm:w-4 sm:h-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <svg
                        className="w-3 h-3 text-yellow-400 sm:w-4 sm:h-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <svg
                        className="w-3 h-3 text-yellow-400 sm:w-4 sm:h-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <svg
                        className="w-3 h-3 text-gray-300 sm:w-4 sm:h-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-xs font-bold text-gray-900 sm:text-sm md:text-base">
                      ${vehicle.price}
                    </p>
                  </div>
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
    <section className="py-12 bg-white sm:py-16 lg:py-20">
      <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex">
          <div className="relative w-full">
            <input
              id="search-dropdown"
              className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-lg border-l-gray-50 border-l-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-l-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
              placeholder="Search by Type, Name..."
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8 ">
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
