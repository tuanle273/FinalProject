import React, { useContext, useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import DataTable from "react-data-table-component";
import { BookingContext } from "../../../contexts/BookingContext";
import FormattedDate from "../../../utils/FormattedDate";
import CreateVehicleModal from "./Modal/CreateVehicleModal";
import DeleteVehicleModal from "./Modal/DeleteVehicleModal";
import EditVehicleModal from "./Modal/EditVehicleModal";
const VehicleManagement = () => {
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

  const [bookings, setBooking] = useState([]);

  const [search, setSearch] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");
  const { getAllBooking } = useContext(BookingContext);

  const loadBooking = async () => {
    const response = await getAllBooking();
    setBooking(response.data.bookings);
  };

  useEffect(() => {
    loadBooking();
  }, []);

  const customFilter = (rows, keyword) => {
    return rows.filter((row) =>
      row.userId.toLowerCase().includes(keyword.toLowerCase())
    );
  };
  const columns = [
    {
      name: "VehicleId",
      cell: (row) => row.vehicleId,
      wrap: true,
    },
    {
      name: "UserId",
      selector: (row) => row.userId,
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
      name: "Booking Status",
      selector: (row) => (
        <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
          <span
            aria-hidden
            className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
          ></span>
          <span className="relative">{row.status}</span>
        </span>
      ),
      width: "150px",
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
            className="bg-blue-500  hover:bg-blue-400 text-white font-bold flex py-2 px-3 border-b-4 border-blue-700 hover:border-blue-500 rounded"
            type="primary"
            onClick={() => handleShowEdit(row._id)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
              />
            </svg>
          </button>
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
      {bookings !== null && (
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
          data={customFilter(bookings, searchKeyword)}
          selectableRows
          customStyles={customStyles}
          actions={
            <>
              {" "}
              <button
                type="button"
                onClick={handleShowCreate}
                className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Add new vehicle
              </button>
              <CSVLink
                data={bookings}
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
      <CreateVehicleModal show={showCreate} handleClose={handleCloseCreate} />
      <EditVehicleModal
        show={showEdit}
        handleClose={handleCloseEdit}
        itemId={itemIdToUpdate}
      />
      <DeleteVehicleModal
        show={showDelete}
        handleClose={handleCloseDelete}
        itemId={itemIdToDelete}
      />
    </div>
  );
};

export default VehicleManagement;
