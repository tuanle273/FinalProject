import React, { useContext, useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { AuthContext } from "../../../contexts/AuthContext";

const UserManagement = () => {
  const [userData, setUserData] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");

  const { getAllUser } = useContext(AuthContext);
  useEffect(() => {
    const loadAllUser = async () => {
      const response = await getAllUser();

      setUserData(response.data);
    };
    loadAllUser();
  }, []);
  const customFilter = (rows, keyword) => {
    return rows.filter((row) =>
      row.username.toLowerCase().includes(keyword.toLowerCase())
    );
  };
  const columns = [
    {
      name: "Image",
      cell: (row) => <img src={row.imageUrl} alt="Avatar" />,
    },
    {
      name: "Name",
      selector: (row) => row.username,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
    },
    {
      name: "Gender",
      selector: (row) => row.gender,
      sortable: true,
    },
    {
      name: "Phone",
      selector: (row) => row.phone,
      sortable: true,
    },
    {
      name: "Role",
      selector: (row) => row.role,
    },

    {
      name: "Age",
      selector: (row) => row.age,
    },
    {
      name: "Address",
      selector: (row) => row.address,
    },
    {
      name: "CreatedAt",
      selector: (row) => row.createdAt,
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
    <div className="shadow-xl mt-8 mr-0 mb-0 ml-0 pt-4 pr-10 pb-4 pl-10 flow-root rounded-lg sm:py-2">
      {userData !== null && (
        <DataTable
          fixedHeader
          fixedHeaderScrollHeight="550px"
          subHeader
          subHeaderComponent={
            <input
              type="text"
              placeholder="Search by username"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              className="w-25 form-control"
            ></input>
          }
          subHeaderAlign="left"
          pagination
          title="User Management"
          columns={columns}
          data={customFilter(userData, searchKeyword)}
          selectableRows
          customStyles={customStyles}
          highlightOnHover
          pointerOnHover
          responsive
        />
      )}
    </div>
  );
};

export default UserManagement;
