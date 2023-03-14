import React, { useContext, useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { toast, Toaster } from "react-hot-toast";
import { HiBan, HiOutlineBadgeCheck } from "react-icons/hi";
import { AuthContext } from "../../../contexts/AuthContext";
import { UserContext } from "../../../contexts/UserContext";

const UserManagement = () => {
  const [userData, setUserData] = useState([]);
  console.log(
    "🚀 ~ file: UserManagement.js:8 ~ UserManagement ~ userData:",
    userData
  );
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
    return rows.filter((row) => {
      const username = row?.username?.toLowerCase();
      if (!username) return false;
      return username.includes(keyword.toLowerCase());
    });
  };

  const { banUser, unbanUser } = useContext(UserContext);

  const handleUnBan = async (_id) => {
    const response = await unbanUser(_id);

    if (response.status >= 200 && response.status < 300) {
      toast.success(response.data.message);
    } else {
      toast.error(response.data.message);
    }
  };
  const handleBan = async (_id) => {
    const response = await banUser(_id);

    if (response.status >= 200 && response.status < 300) {
      toast.success(response.data.message);
    } else {
      toast.error(response.data.message);
    }
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
      name: "isBanned",
      selector: (row) => row.isBanned.toString(),
    },
    {
      name: "CreatedAt",
      selector: (row) => row.createdAt,
      sortable: true,
    },
    {
      name: "Ban/Unban",
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
