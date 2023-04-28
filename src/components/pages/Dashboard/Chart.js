import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import "chart.js/auto";
import React, { useContext, useEffect, useState } from "react";
import { Doughnut, Line } from "react-chartjs-2";

import DataTable from "react-data-table-component";
import Stripe from "stripe";
import { ChartContext } from "../../../contexts/ChartContext";

ChartJS.register(ArcElement, Tooltip, Legend);

const stripe = new Stripe(
  "sk_test_51MoGC4AIZ2hFgEmPgQ0vK32RniqFvGq06MjOJic2s6ObjhZyCbrE888nsDyHz3GEsNcjZRwafae5nmaJD6kUK5Rh0068PDvsr3"
);
const Chart = () => {
  const [balance, setBalance] = useState(null);

  useEffect(() => {
    const getBalance = async () => {
      const balanceObj = await stripe.balance.retrieve();

      setBalance(balanceObj);
    };

    getBalance();
  }, []);
  const [userCount, setUser] = useState([]);
  const [alltransaction, setTransaction] = useState([]);
  const dailyTransactions = alltransaction.reduce((totals, transaction) => {
    const date = new Date(transaction.created * 1000).toDateString();
    if (totals[date]) {
      totals[date] += transaction.amount;
    } else {
      totals[date] = transaction.amount;
    }
    return totals;
  }, {});
  const { countAll, checkTransaction } = useContext(ChartContext);
  useEffect(() => {
    const loadDiscountCode = async () => {
      const response = await countAll();
      const response2 = await checkTransaction();
      console.log(
        "🚀 ~ file: Chart.js:32 ~ loadDiscountCode ~ response2:",
        response2
      );
      setTransaction(response2.data.data);
      setUser(response.data);
    };
    loadDiscountCode();
  }, []);
  const successTransactions = alltransaction.filter(
    (transaction) => transaction.status === "succeeded"
  );
  const failTransactions = alltransaction.filter(
    (transaction) => transaction.status === "requires_payment_method"
  );

  const successAmount = successTransactions.reduce(
    (total, transaction) => total + transaction.amount,
    0
  );
  const failAmount = failTransactions.reduce(
    (total, transaction) => total + transaction.amount,
    0
  );

  const dataPie = {
    labels: ["Success", "Fail"],
    datasets: [
      {
        data: [successAmount, failAmount],
        backgroundColor: ["rgba(54, 162, 235, 0.2)", "rgba(255, 99, 132, 0.2)"],
        borderColor: ["rgba(54, 162, 235, 1)", "rgba(255, 99, 132, 1)"],
        borderWidth: 1,
      },
    ],
  };
  const dataBar = {
    labels: Object.keys(dailyTransactions),
    datasets: [
      {
        label: "Total Amount",
        data: Object.values(dailyTransactions),
        fill: false,
        borderColor: "rgba(75,192,192,1)",
        pointBackgroundColor: "rgba(75,192,192,1)",
      },
    ],
  };
  const options = {
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Doughnut Chart",
      },
    },
  };
  const columns = [
    {
      name: "ID",
      selector: (row) => row.id,
    },
    {
      name: "Customer",
      selector: (row) => row.customer,
    },
    {
      name: "Description",
      selector: (row) => row.description,
    },

    {
      name: "Status",
      selector: (row) => row.status,
    },
    {
      name: "Amount",
      selector: (row) => row.amount,
    },
    {
      name: "Currency",
      selector: (row) => row.currency,
    },
    {
      name: "Payment Method",
      selector: (row) => row.payment_method_types,
    },
    {
      name: "Created Date",
      selector: (row) => {
        const createdTimestamp = row.created;
        const createdDate = new Date(createdTimestamp * 1000);
        return createdDate.toLocaleString();
      },
    },
  ];

  const customStyles = {
    rows: {
      style: {
        minHeight: "50px", // override the row height
      },
    },
    headCells: {
      style: {
        paddingLeft: "10px", // override the cell padding for head cells
        paddingRight: "8px",
      },
    },
    headRow: {
      fontSize: "20px",
      fontWeight: "bold",
    },
    cells: {
      style: {
        paddingLeft: "10px", // override the cell padding for data cells
        paddingRight: "8px",
      },
    },
  };
  return (
    <div>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 p-4 gap-4">
        <div class="bg-blue-500 dark:bg-gray-800 shadow-lg rounded-md flex items-center justify-between p-3 border-b-4 border-blue-600 dark:border-gray-600 text-white font-medium group">
          <div class="flex justify-center items-center w-14 h-14 bg-white rounded-full transition-all duration-300 transform group-hover:rotate-12">
            <svg
              width="30"
              height="30"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              class="stroke-current text-blue-800 dark:text-gray-800 transform transition-transform duration-500 ease-in-out"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              ></path>
            </svg>
          </div>
          <div class="text-right">
            <p class="text-2xl">{userCount.user ? userCount.user : "N/A"}</p>
            <p>Visitors</p>
          </div>
        </div>
        <div class="bg-blue-500 dark:bg-gray-800 shadow-lg rounded-md flex items-center justify-between p-3 border-b-4 border-blue-600 dark:border-gray-600 text-white font-medium group">
          <div class="flex justify-center items-center w-14 h-14 bg-white rounded-full transition-all duration-300 transform group-hover:rotate-12">
            <svg
              width="30"
              height="30"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              class="stroke-current text-blue-800 dark:text-gray-800 transform transition-transform duration-500 ease-in-out"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              ></path>
            </svg>
          </div>
          <div class="text-right">
            <p class="text-2xl">
              {userCount.bookings ? userCount.bookings : "N/A"}
            </p>
            <p>Booking</p>
          </div>
        </div>
        <div class="bg-blue-500 dark:bg-gray-800 shadow-lg rounded-md flex items-center justify-between p-3 border-b-4 border-blue-600 dark:border-gray-600 text-white font-medium group">
          <div class="flex justify-center items-center w-14 h-14 bg-white rounded-full transition-all duration-300 transform group-hover:rotate-12">
            <svg
              width="30"
              height="30"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              class="stroke-current text-blue-800 dark:text-gray-800 transform transition-transform duration-500 ease-in-out"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
              ></path>
            </svg>
          </div>
          <div class="text-right">
            <p class="text-2xl">
              {userCount.vehicle ? userCount.vehicle : "N/A"}
            </p>
            <p>Vehicle</p>
          </div>
        </div>
        <div class="bg-blue-500 dark:bg-gray-800 shadow-lg rounded-md flex items-center justify-between p-3 border-b-4 border-blue-600 dark:border-gray-600 text-white font-medium group">
          <div class="flex justify-center items-center w-14 h-14 bg-white rounded-full transition-all duration-300 transform group-hover:rotate-12">
            <svg
              width="30"
              height="30"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              class="stroke-current text-blue-800 dark:text-gray-800 transform transition-transform duration-500 ease-in-out"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
          </div>
          <div class="text-right">
            <p>
              {balance ? (
                <>
                  <h5>
                    Available Balance: {balance.available[0].amount / 100}$
                  </h5>
                  <h5>Pending Balance: {balance.pending[0].amount / 100}</h5>
                </>
              ) : (
                <p>Loading balance...</p>
              )}
            </p>
            <p>Stripe Account</p>
          </div>
        </div>
      </div>
      <div class="grid grid-cols-1 lg:grid-cols-2 p-4 gap-4"></div>{" "}
      <div style={{ display: "flex" }}>
        <div style={{ width: "50%", height: "400px" }}>
          <Line
            data={dataBar}
            options={{
              responsive: true,
            }}
          />
        </div>
        <div style={{ width: "50%", height: "400px" }}>
          <Doughnut
            data={dataPie}
            options={{ maintainAspectRatio: false, aspectRatio: 1 }}
          />
        </div>
      </div>
      <div className="shadow-xl mt-8 mr-0 mb-0 ml-0 pt-4 pr-10 pb-4 pl-10 flow-root rounded-lg sm:py-2">
        {alltransaction !== null && (
          <DataTable
            fixedHeader
            fixedHeaderScrollHeight="450px"
            subHeaderAlign="left"
            pagination
            title="All Transactions Stripe"
            columns={columns}
            data={alltransaction}
            selectableRows
            customStyles={customStyles}
            highlightOnHover
            pointerOnHover
            responsive
          />
        )}
      </div>
    </div>
  );
};

export default Chart;
