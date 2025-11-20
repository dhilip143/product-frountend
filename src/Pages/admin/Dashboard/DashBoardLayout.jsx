import React, { useEffect, useState } from "react";
import { FaHome, FaBuilding, FaUsers, FaBox, FaCog } from "react-icons/fa";
import ProductPage from "./AdminProduct";
import SalesPersonPage from "./AdminSalesPerson";

// -------------------------
// DUMMY COMPONENTS (to avoid errors)
// You can replace these with your real ones later
// -------------------------
const DashboardHome = () => <div className="text-center p-6">Dashboard Home</div>;
const OrdersPage = () => <div className="text-center p-6">Orders Page</div>;
const SettingsPage = () => <div className="text-center p-6">Settings</div>;

const AdminDashboard = () => {
  const [totalSalesPersons, setTotalSalesPersons] = useState(0);
  const [totalShops, setTotalShops] = useState(0);
  const [salesList, setSalesList] = useState([]);
  const [shopList, setShopList] = useState([]);
  const [activeTab, setActiveTab] = useState("sales");
  const [activePage, setActivePage] = useState("dashboard");

  useEffect(() => {
    fetchTotalSalesPersons();
    fetchTotalShops();
    fetchSalesRegisterList();
  }, []);

  const fetchTotalSalesPersons = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/blog/get_total_salesregister/");
      const data = await response.json();
      setTotalSalesPersons(data.count_salesregister ?? 0);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchTotalShops = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/blog/total-shops/");
      const data = await response.json();
      setTotalShops(data.count_shop ?? 0);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchSalesRegisterList = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/blog/salesregister_list/");
      const data = await response.json();
      setSalesList(Array.isArray(data.data) ? data.data : []);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchShopList = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/blog/shop-list/");
      const data = await response.json();
      setShopList(Array.isArray(data.data) ? data.data : []);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex bg-white min-h-screen">
      {/* SIDEBAR */}
      <div className="w-20 bg-gray-100 border-r flex flex-col items-center py-6 space-y-8">
        <FaHome className="text-2xl cursor-pointer" onClick={() => setActivePage("dashboard")} />
        <FaBuilding className="text-2xl cursor-pointer" onClick={() => setActivePage("products")} />
        <FaUsers className="text-2xl cursor-pointer" onClick={() => setActivePage("salesperson")} />
        <FaBox className="text-2xl cursor-pointer" onClick={() => setActivePage("orders")} />
        <div className="mt-auto">
          <FaCog className="text-2xl cursor-pointer" onClick={() => setActivePage("settings")} />
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 p-6 bg-gray-50">

        {/* ------------------------- DASHBOARD PAGE ------------------------- */}
        {activePage === "dashboard" && (
          <div className="flex-1 p-6 bg-gray-50 flex justify-center">
            <div className="w-full max-w-4xl">

              {/* KPI CARDS */}
              <div className="grid grid-cols-2 gap-5 mb-8">
                <div className="bg-white p-8 rounded-lg shadow-md">
                  <p className="text-lg text-gray-700 text-center">Total Sales Person</p>
                  <p className="text-3xl font-bold text-center text-gray-800 mt-2">
                    {totalSalesPersons}
                  </p>
                </div>

                <div className="bg-white p-8 rounded-lg shadow-md">
                  <p className="text-lg text-gray-700 text-center">Total Stores</p>
                  <p className="text-3xl font-bold text-center text-gray-800 mt-2">
                    {totalShops}
                  </p>
                </div>
              </div>

              {/* TABS */}
              <div className="flex justify-center mb-5">
                <button
                  onClick={() => setActiveTab("sales")}
                  className={`px-6 py-2 text-sm font-medium rounded-l-lg ${
                    activeTab === "sales"
                      ? "bg-gray-700 text-white"
                      : "bg-white text-gray-700 border"
                  }`}
                >
                  Sales
                </button>

                <button
                  onClick={() => {
                    setActiveTab("shops");
                    fetchShopList();
                  }}
                  className={`px-6 py-2 text-sm font-medium rounded-r-lg ${
                    activeTab === "shops"
                      ? "bg-gray-700 text-white"
                      : "bg-white text-gray-700 border"
                  }`}
                >
                  Shops
                </button>
              </div>

              {/* TABLE */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-6 py-3 text-xs text-gray-500 uppercase">No.</th>
                      <th className="px-6 py-3 text-xs text-gray-500 uppercase">Name</th>
                      <th className="px-6 py-3 text-xs text-gray-500 uppercase">Email</th>
                      <th className="px-6 py-3 text-xs text-gray-500 uppercase">Phone</th>
                      <th className="px-6 py-3 text-xs text-gray-500 uppercase">Address</th>
                    </tr>
                  </thead>

                  <tbody className="bg-white divide-y divide-gray-200">
                    {/* SALES LIST */}
                    {activeTab === "sales" &&
                      (salesList.length > 0 ? (
                        salesList.map((item, index) => (
                          <tr key={item.id}>
                            <td className="px-6 py-4 text-sm">{index + 1}</td>
                            <td className="px-6 py-4 text-sm">{item.firstname}</td>
                            <td className="px-6 py-4 text-sm">{item.email}</td>
                            <td className="px-6 py-4 text-sm">{item.phonenumber}</td>
                            <td className="px-6 py-4 text-sm">{item.address}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="5" className="text-center py-4 text-gray-500">
                            No Sales Data Found
                          </td>
                        </tr>
                      ))}

                    {/* SHOP LIST */}
                    {activeTab === "shops" &&
                      (shopList.length > 0 ? (
                        shopList.map((item, index) => (
                          <tr key={item.id}>
                            <td className="px-6 py-4 text-sm">{index + 1}</td>
                            <td className="px-6 py-4 text-sm">{item.shop_name}</td>
                            <td className="px-6 py-4 text-sm">{item.email}</td>
                            <td className="px-6 py-4 text-sm">{item.phonenumber}</td>
                            <td className="px-6 py-4 text-sm">{item.address}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="5" className="text-center py-4 text-gray-500">
                            No Shops Found
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* OTHER PAGES */}
        {activePage === "products" && <ProductPage />}
        {activePage === "salesperson" && <SalesPersonPage />}
        {activePage === "orders" && <OrdersPage />}
        {activePage === "settings" && <SettingsPage />}
      </div>
    </div>
  );
};

export default AdminDashboard;
