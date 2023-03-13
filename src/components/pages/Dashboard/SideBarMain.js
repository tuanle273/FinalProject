import React from "react";
import { Menu, MenuItem, Sidebar } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import VehicleManagement from "./BookingManagement";
import UserManagement from "./UserManagement";
const SideBarMain = () => {
  return (
    <div style={{ display: "flex", height: "100%" }}>
      <Sidebar style={{ flex: "0 0 200px" }}>
        <Menu
          menuItemStyles={{
            button: ({ level, active, disabled }) => {
              // only apply styles on first level elements of the tree
              if (level === 0)
                return {
                  color: disabled ? "#f5d9ff" : "#d359ff",
                  backgroundColor: active ? "#eecef9" : undefined,
                };
            },
          }}
        >
          <MenuItem component={<Link to="/admin/usermanagement" />}>
            {" "}
            User Management
          </MenuItem>
          <MenuItem component={<Link to="/admin/vehiclemanagement" />}>
            {" "}
            Vehicle Management
          </MenuItem>
          <MenuItem component={<Link to="/admin/bookingmanagement" />}>
            {" "}
            Booking
          </MenuItem>
        </Menu>
      </Sidebar>{" "}
      <div style={{ flex: "1" }}>
        <UserManagement />
        <VehicleManagement />
      </div>
    </div>
  );
};

export default SideBarMain;
