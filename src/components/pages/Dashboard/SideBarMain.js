import React from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { FaCar } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { HiChartPie, HiUserGroup } from "react-icons/hi";
import { RiBillFill } from "react-icons/ri";
import {
  Menu,
  MenuItem,
  Sidebar,
  SubMenu,
  useProSidebar,
} from "react-pro-sidebar";
import { Link } from "react-router-dom";
const SideBarMain = () => {
  const { collapseSidebar } = useProSidebar();
  return (
    <div style={{ display: "flex", height: "100%" }}>
      <Sidebar
        breakPoint="sm"
        transitionDuration={800}
        style={{ height: "100vh" }}
      >
        <Menu
          menuItemStyles={{
            button: ({ level, active, disabled }) => {
              // only apply styles on first level elements of the tree
              if (level === 0)
                return {
                  color: disabled ? "#999" : "#333",
                  backgroundColor: active ? "#eee" : undefined,
                };
            },
          }}
        >
          <MenuItem
            icon={<AiOutlineMenu />}
            onClick={() => {
              collapseSidebar();
            }}
            style={{ textAlign: "center" }}
          ></MenuItem>
          <MenuItem
            icon={<HiChartPie />}
            style={{ borderBottom: "0.5px solid #ccc" }}
            component={<Link to="/admin/general" />}
          >
            General
          </MenuItem>
          <SubMenu
            icon={<HiUserGroup />}
            label="Manage"
            style={{ borderBottom: "0.5px solid #ccc" }}
          >
            <MenuItem
              icon={<HiUserGroup />}
              component={<Link to="/admin/usermanagement" />}
            >
              {" "}
              User
            </MenuItem>
            <SubMenu
              label="Vehicle"
              icon={<FaCar />}
              component={<Link to="/admin/vehiclemanagement" />}
            >
              <MenuItem
                icon={<RiBillFill />}
                component={<Link to="/admin/vehiclemanagement" />}
              >
                Vehicle Management
              </MenuItem>
              <MenuItem
                icon={<RiBillFill />}
                component={<Link to="/admin/brandmanagement" />}
              >
                Category
              </MenuItem>
            </SubMenu>
            <SubMenu
              icon={<RiBillFill />}
              label="Booking"
              component={<Link to="/admin/bookingmanagement" />}
            >
              <MenuItem
                icon={<RiBillFill />}
                component={<Link to="/admin/bookingmanagement" />}
              >
                {" "}
                Booking Management
              </MenuItem>
              <MenuItem
                icon={<RiBillFill />}
                component={<Link to="/admin/discountmanagement" />}
              >
                {" "}
                Discount Management
              </MenuItem>
            </SubMenu>
          </SubMenu>
        </Menu>

        <Menu iconShape="square">
          <MenuItem icon={<FiLogOut />}>Logout</MenuItem>
        </Menu>
      </Sidebar>
      <div style={{ flex: "1" }}></div>
    </div>
  );
};

export default SideBarMain;
