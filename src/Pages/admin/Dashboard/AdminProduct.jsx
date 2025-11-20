import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";


export default function ProductPage({ initialProducts = [] }) {
  const [products, setProducts] = useState(initialProducts);

  useEffect(() => {
   
  }, []);

  const onAddClick = () => {
    const name = prompt("New product name");
    if (!name) return;
    const newProduct = {
      id: Date.now(),
      date: new Date().toLocaleDateString(),
      product_name: name,
      qty: 1,
    };
    setProducts((p) => [newProduct, ...p]);
  };

  return (
    <div className="w-full min-h-[70vh] bg-white">
      {/* Top bar: Title card + Add button */}
      <div className="flex items-start justify-between mb-8">
        {/* Total Products Card */}
        <div className="bg-white shadow-lg rounded-xl px-6 py-6 w-[320px]">
          <p className="text-base text-gray-700">Total Products :</p>
          <p className="mt-3 text-3xl font-semibold text-gray-900">
            {products.length}
          </p>
        </div>

        {/* Add Product Button */}
        <div>
          <button
            onClick={onAddClick}
            className="bg-[#163B4A] hover:bg-[#0f2b35] text-white px-5 py-2 rounded-lg shadow"
          >
            <div className="flex items-center space-x-2">
              <FaPlus />
              <span>Add Product</span>
            </div>
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="mx-6">
        <div className="border border-gray-300 rounded-sm overflow-hidden">
          <table className="min-w-full table-fixed">
            <thead>
              <tr className="bg-white">
                <th className="w-1/12 px-4 py-3 text-left text-sm text-gray-600">no.</th>
                <th className="w-2/12 px-4 py-3 text-left text-sm text-gray-600">Date</th>
                <th className="w-8/12 px-4 py-3 text-left text-sm text-gray-600">Product Name</th>
                <th className="w-1/12 px-4 py-3 text-left text-sm text-gray-600">Qtn</th>
              </tr>
            </thead>

            <tbody className="bg-white">
              {products.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center py-6 text-gray-500">
                    No products added yet
                  </td>
                </tr>
              ) : (
                products.map((p, idx) => (
                  <tr key={p.id ?? idx} className="odd:bg-white even:bg-gray-50">
                    <td className="px-4 py-4 text-sm text-gray-700">{idx + 1}</td>
                    <td className="px-4 py-4 text-sm text-gray-700">{p.date ?? "-"}</td>
                    <td className="px-4 py-4 text-sm text-gray-700">{p.product_name}</td>
                    <td className="px-4 py-4 text-sm text-gray-700">{p.qty}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Small spacer to match the tall empty-screen look */}
      <div className="h-40" />
    </div>
  );
}
