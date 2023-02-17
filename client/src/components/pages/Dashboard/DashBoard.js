import React, { Fragment, useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import { VehicleContext } from "../../../contexts/VehicleContext";
import CreateVehicleModal from "./Modal/CreateVehicleModal";
import EditVehicleModal from "./Modal/EditVehicleModal";

const DashBoard = () => {
  const [show, setShow] = useState(false);
  const loadVehicles = useContext(VehicleContext);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const {
    vehicleState: { vehicles, vehicleLoading, vehicleError },
  } = useContext(VehicleContext);
  const [alert, setAlert] = useState(null);
  const { createVehicle } = useContext(VehicleContext);

  if (vehicleLoading) return <h1>Loading data</h1>;
  else if (vehicles && !vehicleError)
    return (
      <div>
        <Fragment>
          <section class="antialiased bg-gray-100 text-gray-600 h-screen px-4">
            <div class="flex flex-col justify-center ">
              <div class="w-full max-w-5xl mx-auto bg-white shadow-lg rounded-sm border border-gray-200">
                <header class="px-5 py-4 border-b border-gray-100">
                  <h2 class="font-semibold text-gray-800">Vehicles</h2>
                  <Button variant="primary" onClick={handleShow}>
                    Add new vehicle
                  </Button>
                  <CreateVehicleModal show={show} handleClose={handleClose} />
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
                            <div class="font-semibold text-left">
                              Description
                            </div>
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
                        {vehicles.map((item) => (
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
                              <div class="text-lg text-center">
                                {item.color}
                              </div>
                            </td>
                            <td class="p-2 whitespace-nowrap">
                              <div class="text-lg text-center badge bg-primary text-wrap">
                                <span class="bg-gray-100 text-gray-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">
                                  {item.platenumber}
                                </span>
                              </div>
                            </td>
                            <td class="p-2 whitespace-nowrap">
                              {" "}
                              <div class="text-lg text-center">
                                <span class="bg-green-100 text-green-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
                                  {item.year}
                                </span>
                              </div>
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
                              <div class="text-lg text-center">
                                {item.price}
                              </div>
                            </td>
                            <td class="p-2 whitespace-nowrap">
                              <div class="text-lg text-center">
                                <Button variant="primary" onClick={handleShow}>
                                  Add new vehicle
                                </Button>
                                <EditVehicleModal
                                  show={show}
                                  handleClose={handleClose}
                                />
                                <Button variant="danger" onClick={handleShow}>
                                  Deltele
                                </Button>
                              </div>
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
      </div>
    );
  else {
    return <h1>Something Went Wrong</h1>;
  }
};

export default DashBoard;
