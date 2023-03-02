import React, { Fragment, useContext } from "react";
import Spinner from "react-bootstrap/Spinner";
import { UserContext } from "../../../contexts/UserContext";
import FormattedDate from "../../../utils/FormattedDate";
const History = () => {
  const {
    userState: { users, userLoading, userError },
  } = useContext(UserContext);

  if (userLoading)
    return (
      <h1>
        <Spinner animation="border" />
      </h1>
    );
  else if (users && !userError)
    return (
      <div>
        <Fragment>
          <section class="antialiased bg-gray-100 text-gray-600 h-screen px-4 ">
            <div class="flex flex-col justify-center ">
              <div class="w-full max-w-7xl mx-auto bg-white shadow-lg rounded-sm border border-gray-200">
                <header class="px-5 py-3  border-b border-gray-100">
                  <h2 class="font-semibold text-gray-800">History</h2>
                </header>
                <div class="p-3">
                  <div class="overflow-x-auto">
                    <table class="table-auto w-full">
                      <thead class="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                        <tr>
                          <th class="p-2 whitespace-nowrap">
                            <div class="font-semibold text-left">UserID</div>
                          </th>
                          <th class="p-2 whitespace-nowrap">
                            <div class="font-semibold text-left">VehicleID</div>
                          </th>
                          <th class="p-2 whitespace-nowrap">
                            <div class="font-semibold text-left">
                              Start Date
                            </div>
                          </th>
                          <th class="p-2 whitespace-nowrap">
                            <div class="font-semibold text-center">
                              End Date
                            </div>
                          </th>
                          <th class="p-2 whitespace-nowrap">
                            <div class="font-semibold text-center">
                              Total Cost
                            </div>
                          </th>
                          <th class="p-2 whitespace-nowrap">
                            <div class="font-semibold text-center">Status</div>
                          </th>
                        </tr>
                      </thead>

                      <tbody class="text-sm divide-y divide-gray-100">
                        {users.map((item) => (
                          <tr key={item._id}>
                            <td class="p-2 whitespace-nowrap">
                              <div class="text-left">{item.userId}</div>
                            </td>
                            <td class="p-2 whitespace-nowrap">
                              <div class="text-left text-green-500  ">
                                {item.vehicleId}
                              </div>
                            </td>
                            <td class="p-2 whitespace-nowrap">
                              <div class="text-lg text-center">
                                {item.startDate}
                              </div>
                            </td>
                            <td class="p-2 whitespace-nowrap">
                              <div class="text-lg text-center badge bg-primary text-wrap">
                                <span class="bg-gray-100 text-gray-800 text-sm mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">
                                  {item.endDate}
                                </span>
                              </div>
                            </td>
                            <td class="p-2 whitespace-nowrap">
                              {" "}
                              <div class="text-lg text-center">
                                <span class="bg-green-100 text-green-800 text-sm  mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
                                  {item.totalCost}
                                </span>
                              </div>
                            </td>
                            <td class="p-2 whitespace-nowrap">
                              <div class=" text-center">{item.status}</div>
                            </td>
                            <td class="p-2 whitespace-nowrap">
                              <div class=" text-center">
                                {" "}
                                <FormattedDate date={item.created_at} />
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

export default History;
