import React, { Fragment, useContext, useEffect } from "react";
import PacmanLoader from "react-spinners/PacmanLoader";
import { UserContext } from "../../../contexts/UserContext";
import FormattedDate from "../../../utils/FormattedDate";
const History = () => {
  const {
    userState: { users, userLoading, userError },

    loadHistory,
  } = useContext(UserContext);
  console.log("🚀 ~ file: History.js:8 ~ History ~ users:", users);
  useEffect(() => {
    loadHistory();
    return () => {};
  }, []);
  if (userLoading)
    return (
      <div class="flex items-center h-screen">
        <div class="m-auto">
          {" "}
          <PacmanLoader color="#36d7b7" />
        </div>
      </div>
    );
  else if (users.length > 0 && !userError)
    return (
      <div>
        <Fragment>
          <section className="antialiased bg-gray-100 text-gray-600 h-screen px-4 ">
            <div className="flex flex-col justify-center ">
              <div className="w-full max-w-7xl mx-auto bg-white shadow-lg rounded-sm border border-gray-200">
                <header className="px-5 py-3  border-b border-gray-100">
                  <h2 className="font-semibold text-gray-800">History</h2>
                </header>
                <div className="p-3">
                  <div className="overflow-x-auto">
                    <table className="table-auto w-full">
                      <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                        <tr>
                          <th className="p-2 whitespace-nowrap">
                            <div className="font-semibold text-left">
                              UserID
                            </div>
                          </th>
                          <th className="p-2 whitespace-nowrap">
                            <div className="font-semibold text-left">
                              VehicleID
                            </div>
                          </th>
                          <th className="p-2 whitespace-nowrap">
                            <div className="font-semibold text-left">
                              Start Date
                            </div>
                          </th>
                          <th className="p-2 whitespace-nowrap">
                            <div className="font-semibold text-center">
                              End Date
                            </div>
                          </th>
                          <th className="p-2 whitespace-nowrap">
                            <div className="font-semibold text-center">
                              Total Cost
                            </div>
                          </th>
                          <th className="p-2 whitespace-nowrap">
                            <div className="font-semibold text-center">
                              Status
                            </div>
                          </th>
                        </tr>
                      </thead>

                      <tbody className="text-sm divide-y divide-gray-100">
                        {users.map((item) => (
                          <tr key={item._id}>
                            <td className="p-2 whitespace-nowrap">
                              <div className="text-left">{item.userId}</div>
                            </td>
                            <td className="p-2 whitespace-nowrap">
                              <div className="text-left text-green-500  ">
                                {item.vehicleId}
                              </div>
                            </td>
                            <td className="p-2 whitespace-nowrap">
                              <div className="text-lg text-center">
                                {item.startDate}
                              </div>
                            </td>
                            <td className="p-2 whitespace-nowrap">
                              <div className="text-lg text-center badge bg-primary text-wrap">
                                <span className="bg-gray-100 text-gray-800 text-sm mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">
                                  {item.endDate}
                                </span>
                              </div>
                            </td>
                            <td className="p-2 whitespace-nowrap">
                              {" "}
                              <div className="text-lg text-center">
                                <span className="bg-green-100 text-green-800 text-sm  mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
                                  {item.totalCost}
                                </span>
                              </div>
                            </td>
                            <td className="p-2 whitespace-nowrap">
                              <div className=" text-center">{item.status}</div>
                            </td>
                            <td className="p-2 whitespace-nowrap">
                              <div className=" text-center">
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
    return <h1>Nodata</h1>;
  }
};

export default History;
