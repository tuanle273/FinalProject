import React from 'react'
import { Sidebar, Menu, MenuItem, SubMenu, useProSidebar  } from 'react-pro-sidebar';
import { Link } from "react-router-dom";
const SideBarMain = () => {
  return (
    <div> 
      <Sidebar>
    <Menu>
    <MenuItem component={<Link to="/admin/usermanagement" />}> User Management</MenuItem>
<MenuItem component={<Link to="/admin/vehiclemanagement" />}> Vehicle Management</MenuItem>
<MenuItem component={<Link to="/e-commerce" />}> E-commerce</MenuItem>
    </Menu>
  </Sidebar>
  </div>
  )
}

export default SideBarMain