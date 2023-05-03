import React, { useContext, useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import DataTable from "react-data-table-component";
import { useHistory } from "react-router-dom";
import { BookingContext } from "../../../contexts/BookingContext";
import FormattedDate from "../../../utils/FormattedDate";
import DeleteBookingModal from "./Modal/Booking/DeleteBookingModal";

const VehicleManagement = () => {
  const history = useHistory();
  //Modal Create
  const [showCreate, setShowCreate] = useState(false);
  const handleCloseCreate = () => setShowCreate(false);
  const handleShowCreate = () => setShowCreate(true);

  //Modal Delete
  const [itemIdToDelete, setItemIdToDelete] = useState(null);
  const [showDelete, setShowDelete] = useState(false);
  const handleCloseDelete = () => setShowDelete(false);
  const handleShowDelete = (itemId) => {
    setItemIdToDelete(itemId);
    setShowDelete(true);
  };

  const [searchKeyword, setSearchKeyword] = useState("");
  const {
    BookingState: { Bookings },

    loadBookings,
  } = useContext(BookingContext);

  useEffect(() => {
    loadBookings();
  }, []);
  const customFilter = (rows, keyword) => {
    if (!Array.isArray(rows)) {
      return [];
    }
    return rows.filter((row) => {
      const { userId } = row;
      if (!userId || !userId.username) {
        return false;
      }
      return userId.username.toLowerCase().includes(keyword.toLowerCase());
    });
  };

  const columns = [
    {
      name: "Vehicle",
      cell: (row) => row.vehicleId?.title,
      wrap: true,
    },
    {
      name: "Vehicle Plate",
      cell: (row) => row.vehicleId?.platenumber,
      wrap: true,
    },
    {
      name: "Customer Name",
      selector: (row) => row.userId?.username,
      wrap: true,
    },
    {
      name: "Customer Email",
      selector: (row) => row.userId?.email,
      wrap: true,
    },
    {
      name: "Customer Address",
      selector: (row) => row.userId?.address,
      wrap: true,
    },
    {
      name: "Customer Phone Number",
      selector: (row) => row.userId?.phone,
      wrap: true,
    },
    {
      name: "Start Date",
      selector: (row) => <FormattedDate date={row.startDate} />,
      sortable: true,
      width: "100px",
    },
    {
      name: "End Date",
      selector: (row) => <FormattedDate date={row.endDate} />,
      sortable: true,
      width: "100px",
    },
    {
      name: "Created Date",
      selector: (row) => <FormattedDate date={row.created_at} />,
      sortable: true,
      width: "100px",
    },
    {
      name: "Total Cost",
      selector: (row) => row.totalCost,
      sortable: true,
    },
    {
      name: "Payment Method",
      selector: (row) => row.paymentMethod,
      sortable: true,
    },
    {
      name: "Payment Status",
      selector: (row) => row.paymentStatus,
      sortable: true,
    },

    {
      name: "Note",
      selector: (row) => row.note,
    },
    {
      name: "Action",
      cell: (row) => (
        <>
          <button
            className="bg-red-500 hover:bg-red-400 text-white font-bold flex py-2 px-3 border-b-4 border-red-700 hover:border-red-500 rounded"
            type="primary"
            onClick={() => handleShowDelete(row._id)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
              />
            </svg>
          </button>
        </>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
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
    <div className="shadow-xl mt-8 mr-0 mb-0 ml-0 pt-4 pr-10 pb-4 pl-10 flow-root rounded-lg sm:py-2">
      {Bookings !== null && (
        <DataTable
          fixedHeader
          fixedHeaderScrollHeight="450px"
          subHeader
          subHeaderComponent={
            <input
              type="text"
              placeholder="Search by title or model"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              className="w-25 form-control border-1"
            ></input>
          }
          subHeaderAlign="left"
          pagination
          title="Booking Management"
          columns={columns}
          data={customFilter(Bookings, searchKeyword)}
          selectableRows
          customStyles={customStyles}
          actions={
            <>
              <CSVLink
                data={Bookings}
                filename={"bookings_data.csv"}
                className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                target="_blank"
              >
                Export Data to CSV
              </CSVLink>
            </>
          }
          highlightOnHover
          pointerOnHover
          responsive
        />
      )}

      <DeleteBookingModal
        show={showDelete}
        handleClose={handleCloseDelete}
        itemId={itemIdToDelete}
      />
    </div>
  );
};

export default VehicleManagement;
