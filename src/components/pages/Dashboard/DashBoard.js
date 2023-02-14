import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
const DashBoard = () => {
  const [data, setdata] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [isError, setisError] = useState(false);

  useEffect(() => {
    setisLoading(true);
    axios
      .get("http://localhost:5000/api/vehicle")
      .then((response) => {
        setdata(response.data.vehicles);
        console.log(
          "🚀 ~ file: HomePage.js:19 ~ .then ~ response.data",
          response.data.vehicles
        );
        setisLoading(false);
      })

      .catch((err) => {
        setisError(true);
        setisLoading(false);
      });
  }, []);
  if (isLoading) return <h1>Loading data</h1>;
  else if (data && !isError)
    return (
      <Fragment>
        <section class="antialiased bg-gray-100 text-gray-600 h-screen px-4">
          <div class="flex flex-col justify-center ">
            <div class="w-full max-w-5xl mx-auto bg-white shadow-lg rounded-sm border border-gray-200">
              <header class="px-5 py-4 border-b border-gray-100">
                <h2 class="font-semibold text-gray-800">Vehicles</h2>
              </header>
              <div class="p-3">
                <div class="overflow-x-auto">
                  <table class="table-auto w-full">
                    <thead class="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                      <tr>
                        <th class="p-2 whitespace-nowrap">
                          <div class="font-semibold text-left">Car</div>
                        </th>
                        <th class="p-2 whitespace-nowrap">
                          <div class="font-semibold text-left">Description</div>
                        </th>
                        <th class="p-2 whitespace-nowrap">
                          <div class="font-semibold text-left">Model</div>
                        </th>
                        <th class="p-2 whitespace-nowrap">
                          <div class="font-semibold text-center">Color</div>
                        </th>
                        <th class="p-2 whitespace-nowrap">
                          <div class="font-semibold text-center">
                            Plate Number
                          </div>
                        </th>
                        <th class="p-2 whitespace-nowrap">
                          <div class="font-semibold text-center">Year</div>
                        </th>
                        <th class="p-2 whitespace-nowrap">
                          <div class="font-semibold text-center">Seat</div>
                        </th>
                        <th class="p-2 whitespace-nowrap">
                          <div class="font-semibold text-center">
                            Transmission
                          </div>
                        </th>
                        <th class="p-2 whitespace-nowrap">
                          <div class="font-semibold text-center">
                            Availability
                          </div>
                        </th>
                        <th class="p-2 whitespace-nowrap">
                          <div class="font-semibold text-center">Price</div>
                        </th>
                        <th class="p-2 whitespace-nowrap">
                          <div class="font-semibold text-center">Action</div>
                        </th>
                      </tr>
                    </thead>

                    <tbody class="text-sm divide-y divide-gray-100">
                      {data.map((item) => (
                        <tr key={item._id}>
                          <td class="p-2 whitespace-nowrap">
                            <div class="flex items-center">
                              <div class="w-10 h-10 flex-shrink-0 mr-2 sm:mr-3">
                                <img
                                  class="rounded-full"
                                  src={item.image}
                                  width="30"
                                  height="30"
                                  alt="Alex Shatov"
                                />
                              </div>
                              <div class="font-medium text-gray-800">
                                {item.title}
                              </div>
                            </div>
                          </td>
                          <td class="p-2 whitespace-nowrap">
                            <div class="text-left">{item.description}</div>
                          </td>
                          <td class="p-2 whitespace-nowrap">
                            <div class="text-left font-medium text-green-500  ">
                              {item.model}
                            </div>
                          </td>
                          <td class="p-2 whitespace-nowrap">
                            <div class="text-lg text-center">{item.color}</div>
                          </td>
                          <td class="p-2 whitespace-nowrap">
                            <div class="text-lg text-center badge bg-primary text-wrap">
                              {item.platenumber}
                            </div>
                          </td>
                          <td class="p-2 whitespace-nowrap">
                            <div class="text-lg text-center">{item.year}</div>
                          </td>
                          <td class="p-2 whitespace-nowrap">
                            <div class="text-lg text-center">{item.seat}</div>
                          </td>
                          <td class="p-2 whitespace-nowrap">
                            <div class="text-lg text-center">
                              {item.transmission}
                            </div>
                          </td>
                          <td class="p-2 whitespace-nowrap">
                            <div class="text-lg text-center">
                              {String(item.availability)}
                            </div>
                          </td>
                          <td class="p-2 whitespace-nowrap">
                            <div class="text-lg text-center">{item.price}</div>
                          </td>
                          <td class="p-2 whitespace-nowrap">
                            <div class="text-lg text-center">edit</div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Fragment>
    );
  else {
    return <h1>Something Went Wrong</h1>;
  }
};

export default DashBoard;
