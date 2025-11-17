import React from "react";

const StoresPage = () => {
  return (
    <div className="flex justify-center min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="w-full max-w-5xl">
        {/* Top boxes */}
        <div className="flex justify-between mb-6">
          <div className="bg-white rounded-lg shadow-md p-6 w-1/3 text-center border border-gray-300">
            <p className="text-gray-700 font-medium">Shop Count</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 w-1/4 border border-gray-300"></div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow-md border border-gray-300 overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 w-1/12">
                  no.
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 w-5/12">
                  Shop name
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 w-4/12">
                  Salesperson
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 w-2/12">
                  Count
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {/* Example rows */}
              <tr>
                <td className="px-6 py-4 text-sm text-gray-600">1</td>
                <td className="px-6 py-4 text-sm text-gray-600">SuperMart</td>
                <td className="px-6 py-4 text-sm text-gray-600">John Doe</td>
                <td className="px-6 py-4 text-sm text-gray-600">5</td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-sm text-gray-600">2</td>
                <td className="px-6 py-4 text-sm text-gray-600">CityGrocer</td>
                <td className="px-6 py-4 text-sm text-gray-600">Jane Smith</td>
                <td className="px-6 py-4 text-sm text-gray-600">3</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StoresPage;
