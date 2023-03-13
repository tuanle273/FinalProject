import React from "react";
import SideBarMain from "./SideBarMain";

const Dashboard = ({ children }) => {
  return (
    <div style={{ display: "flex", height: "100%" }}>
      <SideBarMain />
      <div style={{ flex: "1" }}>{children}</div>
    </div>
  );
};

export default Dashboard;
