import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import PlaceOrderPage from "./PlaceOrderPage";

const ShopDashboard = () => {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    productName: "",
    qtn: "",
    date: "",
    cost: "",
  });

  const navigate = useNavigate();
  const location = useLocation();

  const currentPath = location.pathname;
  const isStep1 = currentPath === "/shop/dashboard";
  const isStep2 = currentPath === "/shop/delivery-history";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAdd = () => {
    if (formData.productName && formData.qtn && formData.date && formData.cost) {
      setProducts((prev) => [...prev, { ...formData, id: Date.now() }]);
      setFormData({
        productName: "",
        qtn: "",
        date: "",
        cost: "",
      });
    }
  };

  const handleReset = () => {
    setFormData({
      productName: "",
      qtn: "",
      date: "",
      cost: "",
    });
    setProducts([]);
  };

  const totalCost = products.reduce(
    (sum, product) => sum + parseFloat(product.cost || 0),
    0
  );

  return (
    <div className="min-h-screen bg-gray-50 flex p-6">
      {/* --- LEFT SIDEBAR --- */}
      <div className="flex flex-col items-center justify-center bg-white border border-gray-300 rounded-lg w-14 h-36 shadow-sm mr-6">
        {/* Step 1 (Active) */}
        <button
          onClick={() => navigate("/shop/dashboard")}
          className={`w-6 h-6 rounded-full mb-3 transition-all ${
            isStep1
              ? "border-2 border-blue-900 bg-gray-200"
              : "bg-gray-200 border border-gray-300 hover:border-blue-400"
          }`}
          title="Product Entry"
        ></button>

        {/* Step 2 (Delivery History) */}
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
        {/* Top Section */}
        <div className="flex justify-between items-start mb-6 gap-6">
          {/* Left Form Section */}
          <div className="flex-1 bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
            <div className="grid grid-cols-2 gap-4 mb-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Product Name
                </label>
                <input
                  type="text"
                  name="productName"
                  value={formData.productName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter product name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Cost
                </label>
                <input
                  type="number"
                  name="cost"
                  value={formData.cost}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Cost"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 items-end">
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Qtn
                </label>
                <input
                  type="number"
                  name="qtn"
                  value={formData.qtn}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Quantity"
                />
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  onClick={handleAdd}
                  className="bg-blue-700 text-white px-5 py-2 rounded-md hover:bg-blue-800 transition-colors"
                >
                  Add
                </button>
                <button
                  onClick={handleReset}
                  className="bg-gray-200 text-gray-800 px-5 py-2 rounded-md hover:bg-gray-300 transition-colors"
                >
                  Reset
                </button>
              </div>
            </div>
          </div>

          {/* Right Total Cost Card */}
          <div className="w-1/4 bg-white border border-gray-200 rounded-lg shadow-sm flex flex-col justify-center items-center p-6">
            <p className="text-gray-600 text-sm mb-1">Total Cost</p>
            <h2 className="text-2xl font-semibold text-blue-700">
              ${totalCost.toFixed(2)}
            </h2>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2 text-left">no.</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Product Name</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Qtn</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Date need to deliver</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Cost</th>
              </tr>
            </thead>
            <tbody>
              {products.length > 0 ? (
                products.map((product, index) => (
                  <tr
                    key={product.id}
                    className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                  >
                    <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
                    <td className="border border-gray-300 px-4 py-2">{product.productName}</td>
                    <td className="border border-gray-300 px-4 py-2">{product.qtn}</td>
                    <td className="border border-gray-300 px-4 py-2">{product.date}</td>
                    <td className="border border-gray-300 px-4 py-2">${product.cost}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="border border-gray-300 px-4 py-4 text-center text-gray-500"
                  >
                    No products added yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Bottom Navigation */}
        <div className="flex justify-center mt-8">
          <button
            onClick={() => navigate("/shop/placeOrderPage")}
            className="bg-blue-900 text-white px-8 py-2 rounded-md hover:bg-blue-800 transition-colors"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShopDashboard;
