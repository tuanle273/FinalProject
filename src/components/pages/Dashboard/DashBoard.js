import React, { Fragment, useContext, useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import { VehicleContext } from "../../../contexts/VehicleContext";
import CreateVehicleModal from "./Modal/CreateVehicleModal";
import DeleteModal from "./Modal/DeleteModal";
import EditVehicleModal from "./Modal/EditVehicleModal";
const DashBoard = () => {
  //Modal Create
  const [showCreate, setShowCreate] = useState(false);
  const handleCloseCreate = () => setShowCreate(false);
  const handleShowCreate = () => setShowCreate(true);

  //Modal Edit
  const [itemIdToUpdate, setItemIdToUpdate] = useState(null);

  const [showEdit, setShowEdit] = useState(false);
  const handleCloseEdit = () => setShowEdit(false);
  const handleShowEdit = (itemId) => {
    setItemIdToUpdate(itemId);
    setShowEdit(true);
  };

  //Modal Delete
  const [itemIdToDelete, setItemIdToDelete] = useState(null);
  const [showDelete, setShowDelete] = useState(false);
  const handleCloseDelete = () => setShowDelete(false);
  const handleShowDelete = (itemId) => {
    setItemIdToDelete(itemId);
    setShowDelete(true);
  };

  const {
    vehicleState: { vehicles, vehicleLoading, vehicleError },
  } = useContext(VehicleContext);

  if (vehicleLoading)
    return (
      <h1>
        <Spinner animation="border" />
      </h1>
    );
  else if (vehicles && !vehicleError)
    return (
      <div>
        <Fragment>
          <section class="antialiased bg-gray-100 text-gray-600 h-screen px-4 ">
            <div class="flex flex-col justify-center ">
              <div class="w-full max-w-6xl mx-auto bg-white shadow-lg rounded-sm border border-gray-200">
                <header class="px-5 py-3  border-b border-gray-100">
                  <h2 class="font-semibold text-gray-800">Vehicles</h2>
                  <button
                    type="button"
                    onClick={handleShowCreate}
                    class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Add new vehicle
                  </button>

                  <CreateVehicleModal
                    show={showCreate}
                    handleClose={handleCloseCreate}
                  />
                </header>
                <div class="p-3">
                  <div class="overflow-x-auto">
                    <table class="table-auto">
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
                            <div class="font-semibold text-center">Type</div>
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
                                {item.platenumber}
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
                              <div class="text-lg text-center">{item.type}</div>
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
                                <button
                                  class="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
                                  type="primary"
                                  onClick={() => handleShowEdit(item._id)}
                                >
                                  edit
                                </button>
                                <EditVehicleModal
                                  show={showEdit}
                                  handleClose={handleCloseEdit}
                                  itemId={itemIdToUpdate}
                                />{" "}
                                <button
                                  class="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
                                  type="primary"
                                  onClick={() => handleShowDelete(item._id)}
                                >
                                  Delete
                                </button>
                                <DeleteModal
                                  show={showDelete}
                                  handleClose={handleCloseDelete}
                                  itemId={itemIdToDelete}
                                />{" "}
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
