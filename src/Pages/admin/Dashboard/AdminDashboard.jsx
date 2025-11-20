import React, { useState } from "react";
import { FaHome, FaBuilding, FaUsers, FaBox, FaCog } from "react-icons/fa";
import ProductPage from "./AdminProduct";
import SalesPersonPage from "./AdminSalesPerson";
import AdminDashboard from "./DashBoardLayout";

const DashboardLayout = () => {
  const [activePage, setActivePage] = useState("dashboard");

  return (
    <div className="flex bg-white min-h-screen">

      {/* MAIN CONTENT */}
      <div className="flex-1 p-6 bg-gray-50">
        {activePage === "dashboard" && <AdminDashboard />}
        {activePage === "products" && <ProductPage />}
        {activePage === "salesperson" && <SalesPersonPage />}
        {activePage === "orders" && <OrdersPage />}
        {activePage === "settings" && <SettingsPage />}
      </div>

    </div>
  );
};

export default DashboardLayout;
