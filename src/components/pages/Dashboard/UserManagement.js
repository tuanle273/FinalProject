import React, { useContext, useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import DataTable from "react-data-table-component";
import { toast, Toaster } from "react-hot-toast";
import { HiBan, HiOutlineBadgeCheck } from "react-icons/hi";
import { AuthContext } from "../../../contexts/AuthContext";
import { UserContext } from "../../../contexts/UserContext";
import FormattedDate from "../../../utils/FormattedDate";
const UserManagement = () => {
  const [userData, setUserData] = useState([]);

  const [searchKeyword, setSearchKeyword] = useState("");

  const { getAllUser } = useContext(AuthContext);

  const loadAllUser = async () => {
    const response = await getAllUser();
    setUserData(response.data);
  };
  useEffect(() => {
    loadAllUser();
  }, []);

  const customFilter = (rows, keyword) => {
    return rows.filter((row) => {
      const username = row?.username?.toLowerCase();
      if (!username) return false;
      return username.includes(keyword.toLowerCase());
    });
  };

  const { banUser, unbanUser } = useContext(UserContext);

  const handleUnBan = async (_id) => {
    const response = await unbanUser(_id);

    if (response.success) {
      toast.success(response.message);
      await loadAllUser();
    } else {
      toast.error(response.message);
    }
  };
  const handleBan = async (_id) => {
    const response = await banUser(_id);

    if (response.success) {
      toast.success(response.message);
      await loadAllUser();
    } else {
      toast.error(response.message);
    }
  };
  const columns = [
    {
      name: "Image",
      cell: (row) => <img src={row.imageUrl} alt="Avatar" />,
      width: "90px",
    },
    {
      name: "Name",
      selector: (row) => row.username,
      sortable: true,
      wrap: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      wrap: true,
    },
    {
      name: "Gender",
      selector: (row) => row.gender,
      sortable: true,
      width: "90px",
    },
    {
      name: "Phone",
      selector: (row) => row.phone,
      sortable: true,
      width: "100px",
      wrap: true,
    },
    {
      name: "Role",
      selector: (row) => row.role,
      width: "90px",
    },

    {
      name: "Age",
      selector: (row) => row.age,
      width: "90px",
    },
    {
      name: "Address",
      selector: (row) => row.address,
      wrap: true,
    },
    {
      name: "isBanned",
      selector: (row) => row.isBanned.toString(),
      width: "90px",
    },
    {
      name: "CreatedAt",
      selector: (row) => <FormattedDate date={row.createdAt} />,
      sortable: true,
    },
    {
      name: "Ban/Unban",
      width: "80px",
      cell: (row) => {
        if (row.role === "admin") {
          return <div></div>;
        } else {
          if (row.isBanned === true) {
            return (
              <button
                className="bg-blue-500 hover:bg-blue-400 text-white font-bold flex py-2 px-3 border-b-4 border-blue-700 hover:border-blue-500 rounded"
                type="primary"
                onClick={() => handleUnBan(row._id)}
              >
                <HiOutlineBadgeCheck />
              </button>
            );
          } else {
            return (
              <button
                className="bg-red-500 hover:bg-red-400 text-white font-bold flex py-2 px-3 border-b-4 border-red-700 hover:border-red-500 rounded"
                type="primary"
                onClick={() => handleBan(row._id)}
              >
                <HiBan />
              </button>
            );
          }
        }
      },
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
    <div className="shadow-xl mt-8 mr-0 mb-0 ml-0 pt-4 pr-10 pb-4 pl-10 flow-root rounded-lg sm:py-2">
      <Toaster />
      {userData !== null && (
        <>
          {" "}
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
            actions={
              <CSVLink
                data={userData}
                filename={"user_data.csv"}
                className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                target="_blank"
              >
                Export Data to CSV
              </CSVLink>
            }
            highlightOnHover
            pointerOnHover
            responsive
          />
        </>
      )}
    </div>
  );
};

export default UserManagement;
