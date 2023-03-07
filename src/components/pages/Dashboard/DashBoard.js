import React, { Fragment, useContext, useEffect, useState } from "react";
import PacmanLoader from "react-spinners/PacmanLoader";
import { VehicleContext } from "../../../contexts/VehicleContext";
import CreateVehicleModal from "./Modal/CreateVehicleModal";
import DeleteModal from "./Modal/DeleteModal";
import EditVehicleModal from "./Modal/EditVehicleModal";
import DataTable, {createTheme } from 'react-data-table-component';
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

  const [vehicles, setVehicle] = useState(null);

 
  const {
    loadVehicles
  } = useContext(VehicleContext);
  useEffect(() => {
    const loadVehicle = async () => {
      const response = await loadVehicles();
     
      setVehicle(response.data);
    };
    loadVehicle()}, []);

    
    const columns = [
      
      {
          name: 'Image',
          cell: row => <img src={row.imageUrl} alt="Avatar" />,
      },
      {
        name: 'Title',
        selector: row => row.title,
        sortable: true,
    },
    {
      name: 'Description',
      selector: row => row.description,
  },
  {
    name: 'Model',
    selector: row => row.model,
    sortable: true,
},
{
  name: 'Color',
  selector: row => row.color,
  sortable: true,
},
{
  name: 'Plate number',
  selector: row => row.platenumber,
},


      {
          name: 'Year',
          selector: row => row.year,
          sortable: true,
      },
      {
        name: 'Seat',
        selector: row => row.seat,
    },
    {
      name: 'Transmission',
      selector: row => row.transmission,
  },
  {
    name: 'Type',
    selector: row => row.type,
},
{
  name: 'Availability',
  selector: row => row.availability.toString(),
},
{
  name: 'Price',
  selector: row => row.price,
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
  button: true
}
  ];

  const customStyles = {
    rows: {
      style: {
        minHeight: '50px', // override the row height
      },
    },
    headCells: {
      style: {
        paddingLeft: '8px', // override the cell padding for head cells
        paddingRight: '8px',
      },
    },
    headRow: {
      fontSize: '20px',
      fontWeight: 'bold',
    },
    cells: {
      style: {
        paddingLeft: '8px', // override the cell padding for data cells
        paddingRight: '8px',
      },
    },
  };
return (
      
      <div style={{ overflowY: 'auto' }}>
      
         {vehicles !== null && (
          
         <DataTable
         
         pagination
         title="Vehicle"
            columns={columns}
            data={vehicles}
            selectableRows
            customStyles={customStyles}
         actions={<button
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
        <CreateVehicleModal
                    show={showCreate}
                    handleClose={handleCloseCreate}
                  />
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

export default DashBoard;
