import React, { useContext, useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { BookingContext } from "../../../contexts/BookingContext";
import FormattedDate from "../../../utils/FormattedDate";
import CreateVehicleModal from "./Modal/CreateVehicleModal";
import DeleteModal from "./Modal/DeleteModal";
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

  const [vehicles, setVehicle] = useState([]);

  const [search, setSearch] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");
  const { getAllBooking } = useContext(BookingContext);
  useEffect(() => {
    const loadVehicle = async () => {
      const response = await getAllBooking();

      setVehicle(response.data.bookings);
    };
    loadVehicle();
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
    },
    {
      name: "UserId",
      selector: (row) => row.userId,
    },
    {
      name: "Start Date",
      selector: (row) => <FormattedDate date={row.startDate} />,
      sortable: true,
    },
    {
      name: "End Date",
      selector: (row) => <FormattedDate date={row.endDate} />,
      sortable: true,
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
      sortable: true,
    },

    {
      name: "Created Date",
      selector: (row) => <FormattedDate date={row.created_at} />,
      sortable: true,
    },
    {
      name: "Note",
      selector: (row) => row.note,
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
    <div style={{ overflowY: "auto" }}>
      {vehicles !== null && (
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
          data={customFilter(vehicles, searchKeyword)}
          selectableRows
          customStyles={customStyles}
          actions={
            <button
              type="button"
              onClick={handleShowCreate}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Add new vehicle
            </button>
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
      <DeleteModal
        show={showDelete}
        handleClose={handleCloseDelete}
        itemId={itemIdToDelete}
      />
    </div>
  );
};

export default VehicleManagement;
