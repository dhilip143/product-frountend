import React, { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";

export default function SalesPersonPage({ initialPersons = [] }) {
  const [persons, setPersons] = useState(initialPersons);

  useEffect(() => {
    // If fetching from backend, do it here
  }, []);

  const onAddClick = () => {
    const name = prompt("Enter person name");
    if (!name) return;

    const newPerson = {
      id: Date.now(),
      name,
      status: "Active",
    };

    setPersons((prev) => [...prev, newPerson]);
  };

  return (
    <div className="w-full min-h-[70vh] bg-white">

      {/* Top Section */}
      <div className="flex items-start justify-between mb-8">

        {/* Sales Person Count Box */}
        <div className="bg-white shadow-lg rounded-xl px-6 py-6 w-[320px]">
          <p className="text-base text-gray-700">Sales Person :</p>
          <p className="mt-3 text-3xl font-semibold text-gray-900">
            {persons.length}
          </p>
        </div>

        {/* Add Button */}
        <button
          onClick={onAddClick}
          className="bg-[#163B4A] hover:bg-[#0f2b35] text-white px-6 py-2 rounded-lg shadow"
        >
          <div className="flex items-center space-x-2">
            <FaPlus />
            <span>Add Sales Person</span>
          </div>
        </button>
      </div>

      {/* Table */}
      <div className="mx-6">
        <div className="border border-gray-300 rounded-sm overflow-hidden">
          <table className="min-w-full table-fixed">
            <thead>
              <tr className="bg-white">
                <th className="w-1/12 px-4 py-3 text-left text-sm text-gray-600">
                  no.
                </th>
                <th className="w-8/12 px-4 py-3 text-left text-sm text-gray-600">
                  Person Name
                </th>
                <th className="w-3/12 px-4 py-3 text-left text-sm text-gray-600">
                  Status
                </th>
              </tr>
            </thead>

            <tbody className="bg-white">

              {persons.length === 0 ? (
                <tr>
                  <td
                    colSpan="3"
                    className="text-center py-6 text-gray-500"
                  >
                    No records found
                  </td>
                </tr>
              ) : (
                persons.map((item, index) => (
                  <tr key={item.id} className="odd:bg-white even:bg-gray-50">
                    <td className="px-4 py-4 text-sm text-gray-700">
                      {index + 1}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-700">
                      {item.name}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-700">
                      {item.status}
                    </td>
                  </tr>
                ))
              )}

            </tbody>
          </table>
        </div>
      </div>

      <div className="h-40" />
    </div>
  );
}
