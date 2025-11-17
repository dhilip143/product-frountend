import React, { useState } from "react";

const PlaceOrderPage = () => {
  const [products, setProducts] = useState([
    // Example structure — fill dynamically later
    // { id: 1, name: "Product A", qty: 2, date: "2025-11-15", cost: 200 },
  ]);

  const totalCost = products.reduce((sum, p) => sum + Number(p.cost || 0), 0);

  return (
    <div className="min-h-screen flex flex-col justify-between bg-white">
      {/* Table */}
      <div className="flex-grow px-8 py-10">
        <table className="w-full border border-gray-300 text-center rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr className="border-b">
              <th className="p-3 border-r">No.</th>
              <th className="p-3 border-r">Product Name</th>
              <th className="p-3 border-r">Qtn</th>
              <th className="p-3 border-r">Date need to deliver</th>
              <th className="p-3">Cost</th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 ? (
              <tr>
                <td colSpan="5" className="py-8 text-gray-400">
                  No products added
                </td>
              </tr>
            ) : (
              products.map((p, index) => (
                <tr key={p.id} className="border-b">
                  <td className="p-3 border-r">{index + 1}</td>
                  <td className="p-3 border-r">{p.name}</td>
                  <td className="p-3 border-r">{p.qty}</td>
                  <td className="p-3 border-r">{p.date}</td>
                  <td className="p-3">{p.cost}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Footer Section */}
      <div className="flex flex-col items-center pb-10 space-y-4">
        <div className="text-lg font-semibold bg-white px-6 py-2 rounded-xl shadow-md border">
          Total Cost: ₹{totalCost}
        </div>

        <div className="flex gap-4">
          <button
            className="px-6 py-2 rounded-md bg-gray-400 text-white hover:bg-gray-500 transition"
            onClick={() => window.history.back()}
          >
            Back
          </button>
          <button
            className="px-6 py-2 rounded-md bg-gradient-to-r from-gray-700 to-blue-900 text-white hover:opacity-90 transition"
            onClick={() => alert("Order placed successfully!")}
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrderPage;
