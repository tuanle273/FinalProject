import React, { useContext, useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { VehicleContext } from "../../../contexts/VehicleContext";
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
  console.log(
    "🚀 ~ file: VehicleManagement.js:37 ~ VehicleManagement ~ vehicles:",
    vehicles
  );
  const [search, setSearch] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");
  const { loadVehicles } = useContext(VehicleContext);
  useEffect(() => {
    const loadVehicle = async () => {
      const response = await loadVehicles();

      setVehicle(response.data);
    };
    loadVehicle();
  }, []);

  const customFilter = (rows, keyword) => {
    return rows.filter(
      (row) =>
        row.title.toLowerCase().includes(keyword.toLowerCase()) ||
        row.model.toLowerCase().includes(keyword.toLowerCase())
    );
  };
  const columns = [
    {
      name: "Image",
      cell: (row) => (
        <img
          class="w-full h-full rounded-full"
          src={row.imageUrl}
          alt="Avatar"
        />
      ),
    },
    {
      name: "Title",
      selector: (row) => row.title,
      sortable: true,
    },
    {
      name: "Description",
      selector: (row) => row.description,
    },
    {
      name: "Model",
      selector: (row) => row.model,
      sortable: true,
    },
    {
      name: "Color",
      selector: (row) => row.color,
      sortable: true,
    },
    {
      name: "Plate number",
      selector: (row) => (
        <span class="bg-gray-100 text-dark-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-100 dark:text-gray-100">
          {row.platenumber}
        </span>
      ),
    },

    {
      name: "Year",
      selector: (row) => row.year,
      sortable: true,
    },
    {
      name: "Seat",
      selector: (row) => row.seat,
    },
    {
      name: "Transmission",
      selector: (row) => row.transmission,
    },
    {
      name: "Type",
      selector: (row) => row.type,
    },
    {
      name: "Availability",
      selector: (row) => (
        <span
          class={`relative inline-block px-3 py-1 font-semibold text-${
            row.availability ? "green" : "red"
          }-900 leading-tight`}
        >
          <span
            aria-hidden
            class={`absolute inset-0 bg-${
              row.availability ? "green" : "red"
            }-200 opacity-50 rounded-full`}
          ></span>
          <span class="relative">{row.availability.toString()}</span>
        </span>
      ),
    },

    {
      name: "Price",
      selector: (row) => row.price,
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
            Edit
          </button>
          <button
            className="bg-red-500 hover:bg-red-400 text-white font-bold flex py-2 px-1 border-b-4 border-red-700 hover:border-red-500 rounded"
            type="primary"
            onClick={() => handleShowDelete(row._id)}
          >
            Delete
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
        paddingLeft: "8px", // override the cell padding for head cells
        paddingRight: "8px",
      },
    },
    headRow: {
      fontSize: "20px",
      fontWeight: "bold",
    },
    cells: {
      style: {
        paddingLeft: "8px", // override the cell padding for data cells
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
          title="Vehicle"
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
