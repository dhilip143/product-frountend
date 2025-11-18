import React, { useEffect, useState } from "react";
import { FaHome, FaBuilding, FaUsers, FaBox, FaCog } from "react-icons/fa";

const DashboardLayout = () => {
  const [totalSalesPersons, setTotalSalesPersons] = useState(0);
  const [totalShops, setTotalShops] = useState(0);

  useEffect(() => {
    const fetchTotalSalesPersons = async () => {
      try {
        const response = await fetch(
          "http://127.0.0.1:8000/blog/get_total_salesregister/"
        );
        const data = await response.json();
        setTotalSalesPersons(data.count_salesregister || 0);
      } catch (error) {
        console.error("Error fetching total sales person:", error);
      }
    };

    const fetchTotalShops = async () => {
      try {
        const response = await fetch(
          "http://127.0.0.1:8000/blog/total-shops/"
        );
        const data = await response.json();
        setTotalShops(data.count_shop || 0);
      } catch (error) {
        console.error("Error fetching total shops:", error);
      }
    };

    fetchTotalSalesPersons();
    fetchTotalShops();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* ---------------- LEFT SIDEBAR ---------------- */}
      <div className="w-24 bg-white shadow-xl flex flex-col items-center py-6 border-r">

        {/* Home */}
        <div className="mb-10">
          <div className="bg-gray-200 p-3 rounded-full cursor-pointer hover:bg-gray-300">
            <FaHome className="text-xl text-gray-700" />
          </div>
        </div>

        {/* Stores */}
        <div className="mb-10">
          <div className="bg-gray-200 p-3 rounded-full cursor-pointer hover:bg-gray-300">
            <FaBuilding className="text-xl text-gray-700" />
          </div>
        </div>

        {/* Users */}
        <div className="mb-10">
          <div className="bg-gray-200 p-3 rounded-full cursor-pointer hover:bg-gray-300">
            <FaUsers className="text-xl text-gray-700" />
          </div>
        </div>

        {/* Products */}
        <div className="mb-10">
          <div className="bg-gray-200 p-3 rounded-full cursor-pointer hover:bg-gray-300">
            <FaBox className="text-xl text-gray-700" />
          </div>
        </div>

        {/* Settings (bottom) */}
        <div className="mt-auto">
          <div className="bg-gray-200 p-3 rounded-full cursor-pointer hover:bg-gray-300">
            <FaCog className="text-xl text-gray-700" />
          </div>
        </div>

      </div>

      {/* ---------------- RIGHT CONTENT ---------------- */}
      <div className="flex-1 p-6">

        {/* KPI CARDS */}
        <div className="grid grid-cols-2 gap-5 mb-8">
          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <p className="text-lg font-medium text-gray-700">Total Stores</p>
            <p className="text-3xl font-bold text-gray-800 mt-2">
              {totalShops}
            </p>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <p className="text-lg font-medium text-gray-700">
              Total Sales Person
            </p>
            <p className="text-3xl font-bold text-gray-800 mt-2">
              {totalSalesPersons}
            </p>
          </div>
        </div>

        {/* Toggle Buttons */}
        <div className="flex justify-center mb-10">
          <div className="flex border border-gray-300 rounded-lg overflow-hidden shadow-sm bg-white">
            <button className="px-6 py-2 text-sm font-medium bg-gray-700 text-white">
              Sales
            </button>
            <button className="px-6 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100">
              Delivery
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">no.</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">Store Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">Sales Person</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">Status</th>
                </tr>
              </thead>

              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 text-gray-500">...</td>
                  <td className="px-6 py-4 text-gray-500">...</td>
                  <td className="px-6 py-4 text-gray-500">...</td>
                  <td className="px-6 py-4 text-gray-500">...</td>
                  <td className="px-6 py-4 text-gray-500">...</td>
                </tr>
              </tbody>

            </table>
          </div>
        </div>

      </div>
    </div>
  );
};

export default DashboardLayout;
