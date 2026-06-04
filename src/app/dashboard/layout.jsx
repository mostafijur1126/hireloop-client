import { DashbordSidebar } from "@/components/dashbord/DashbordSidebar";
import React from "react";

const DashbordLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen">
      <DashbordSidebar></DashbordSidebar>
      <div className="flex-1">{children}</div>
    </div>
  );
};

export default DashbordLayout;
