import React, { useContext, useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { DiscountContext } from "../../../contexts/DiscountContext";
import FormattedDate from "../../../utils/FormattedDate";
import CreateDiscountModal from "./Modal/Discount/CreateDiscountModal";
import DeleteVehicleModal from "./Modal/Vehicle/DeleteVehicleModal";
import EditVehicleModal from "./Modal/Vehicle/EditVehicleModal";
const DiscountManagement = () => {
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

  const [discounts, setDiscount] = useState([]);

  const [search, setSearch] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");
  const { loadDiscount } = useContext(DiscountContext);
  useEffect(() => {
    const loadDiscountCode = async () => {
      const response = await loadDiscount();

      setDiscount(response.data);
    };
    loadDiscountCode();
  }, []);

  const customFilter = (rows, keyword) => {
    return rows.filter(
      (row) =>
        row.name && row.name.toLowerCase().includes(keyword.toLowerCase())
    );
  };
  const columns = [
    {
      name: "Name",
      selector: (row) => row.name,
    },
    {
      name: "Code",
      cell: (row) => row.code,
    },

    {
      name: "Amount",
      selector: (row) => row.amount,
      sortable: true,
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
      {discounts !== null && (
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
          title="Discount Management"
          columns={columns}
          data={customFilter(discounts, searchKeyword)}
          selectableRows
          customStyles={customStyles}
          actions={
            <button
              type="button"
              onClick={handleShowCreate}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Add new Discount
            </button>
          }
          highlightOnHover
          pointerOnHover
          responsive
        />
      )}
      <CreateDiscountModal show={showCreate} handleClose={handleCloseCreate} />
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

export default DiscountManagement;
