import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const DeliveryHistory = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const currentPath = location.pathname;
  const isStep1 = currentPath === "/shop/dashboard";
  const isStep2 = currentPath === "/shop/delivery-history";

  return (
    <div className="min-h-screen bg-gray-50 flex p-6">
      {/* --- LEFT SIDEBAR --- */}
      <div className="flex flex-col items-center justify-center bg-white border border-gray-300 rounded-lg w-14 h-36 shadow-sm mr-6">
        {/* Step 1 */}
        <button
          onClick={() => navigate("/shop/dashboard")}
          className={`w-6 h-6 rounded-full mb-3 transition-all ${
            isStep1
              ? "border-2 border-blue-900 bg-gray-200"
              : "bg-gray-200 border border-gray-300 hover:border-blue-400"
          }`}
          title="Product Entry"
        ></button>

        {/* Step 2 (Active) */}
        <button
          onClick={() => navigate("/shop/delivery-history")}
          className={`w-6 h-6 rounded-full transition-all ${
            isStep2
              ? "border-2 border-blue-900 bg-gray-200"
              : "bg-gray-200 border border-gray-300 hover:border-blue-400"
          }`}
          title="Delivery History"
        ></button>
      </div>

      {/* --- MAIN CONTENT --- */}
      <div className="flex-1 max-w-5xl bg-white rounded-lg shadow-md p-6">
        <h1 className="text-xl font-semibold text-gray-800 mb-6">
          Delivery History
        </h1>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2 text-left w-1/12">no.</th>
                <th className="border border-gray-300 px-4 py-2 text-left w-2/12">Date</th>
                <th className="border border-gray-300 px-4 py-2 text-left w-3/12">Product Name</th>
                <th className="border border-gray-300 px-4 py-2 text-left w-3/12">Delivery Person</th>
                <th className="border border-gray-300 px-4 py-2 text-left w-1/12">Qtn</th>
                <th className="border border-gray-300 px-4 py-2 text-left w-2/12">Cost</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-4 py-2 text-sm text-gray-600">1</td>
                <td className="border border-gray-300 px-4 py-2 text-sm text-gray-600">2025-11-10</td>
                <td className="border border-gray-300 px-4 py-2 text-sm text-gray-600">SuperMart</td>
                <td className="border border-gray-300 px-4 py-2 text-sm text-gray-600">John Doe</td>
                <td className="border border-gray-300 px-4 py-2 text-sm text-gray-600">5</td>
                <td className="border border-gray-300 px-4 py-2 text-sm text-gray-600">$150</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 text-sm text-gray-600">2</td>
                <td className="border border-gray-300 px-4 py-2 text-sm text-gray-600">2025-11-11</td>
                <td className="border border-gray-300 px-4 py-2 text-sm text-gray-600">CityGrocer</td>
                <td className="border border-gray-300 px-4 py-2 text-sm text-gray-600">Jane Smith</td>
                <td className="border border-gray-300 px-4 py-2 text-sm text-gray-600">3</td>
                <td className="border border-gray-300 px-4 py-2 text-sm text-gray-600">$90</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DeliveryHistory;
