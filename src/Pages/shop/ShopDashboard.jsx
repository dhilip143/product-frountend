import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

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

  // Fetch products on load
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/blog/product/list/");
      const data = await res.json();
      setProducts(data.data || []);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // Input handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Add product to backend
 const handleAdd = async () => {
  const payload = {
    product_name: formData.productName,
    cost: formData.cost,
    quantity: formData.qtn,
  };

  const res = await axios.post("http://127.0.0.1:8000/blog/product/add/", payload);
};

  // Reset everything
  // const handleReset = async () => {
  //   try {
  //     await axios.delete("http://127.0.0.1:8000/blog/product/list/");
  //   } catch (err) {
  //     console.error("Server reset error:", err);
  //   }

  //   setProducts([]);
  //   setFormData({
  //     product_Name: "",
  //    quantity: "",
  //     // date: "",
  //     cost: "",
  //   });
  // };

  // Calculate total cost
  const totalCost = products.reduce(
    (sum, p) => sum + parseFloat(p.cost || 0),
    0
  );

  return (
    <div className="min-h-screen bg-gray-50 flex p-6">
      {/* LEFT SIDEBAR */}
      <div className="flex flex-col items-center bg-white border border-gray-300 rounded-lg w-14 h-36 shadow-sm mr-6 p-3 justify-between">
        <button
          onClick={() => navigate("/shop/dashboard")}
          className={`w-6 h-6 rounded-full transition-all ${
            isStep1
              ? "border-2 border-blue-900 bg-gray-100"
              : "bg-gray-200 border border-gray-300 hover:border-blue-400"
          }`}
        ></button>

        <button
          onClick={() => navigate("/shop/delivery-history")}
          className={`w-6 h-6 rounded-full transition-all ${
            isStep2
              ? "border-2 border-blue-900 bg-gray-100"
              : "bg-gray-200 border border-gray-300 hover:border-blue-400"
          }`}
        ></button>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 max-w-5xl bg-white rounded-lg shadow-md p-6">

        {/* Form + Total */}
        <div className="flex justify-between items-start mb-6 gap-6">

          {/* FORM */}
          <div className="flex-1 bg-white border border-gray-200 rounded-lg p-5 shadow-sm">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                <input
                  type="text"
                  name="productName"
                  value={formData.productName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter product name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Cost</label>
                <input
                  type="number"
                  name="cost"
                  value={formData.cost}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  placeholder="Cost"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Qtn</label>
                <input
                  type="number"
                  name="qtn"
                  value={formData.qtn}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  placeholder="Quantity"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date need to deliver</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex justify-end items-end space-x-3">
                <button
                  onClick={handleAdd}
                  className="bg-blue-700 text-white px-5 py-2 rounded-md hover:bg-blue-800 transition-colors"
                >
                  Add
                </button>

                {/* <button
                  onClick={handleReset}
                  className="bg-gray-200 text-gray-800 px-5 py-2 rounded-md hover:bg-gray-300 transition-colors"
                >
                  Reset
                </button> */}
              </div>
            </div>
          </div>

          {/* TOTAL COST */}
          <div className="w-64 bg-white border border-gray-200 rounded-lg shadow-sm p-6 flex flex-col justify-center items-center">
            <p className="text-gray-600 text-sm">Total Cost</p>
            <h2 className="text-3xl font-semibold text-blue-700 mt-1">
              ${totalCost.toFixed(2)}
            </h2>
          </div>
        </div>

        {/* PRODUCT TABLE */}
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2">No.</th>
                <th className="border border-gray-300 px-4 py-2">Product Name</th>
                <th className="border border-gray-300 px-4 py-2">Qtn</th>
                <th className="border border-gray-300 px-4 py-2">Date need to deliver</th>
                <th className="border border-gray-300 px-4 py-2">Cost</th>
              </tr>
            </thead>

           <tbody>
  {products.length > 0 ? (
    products.map((product, index) => (
      <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
        <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
        <td className="border border-gray-300 px-4 py-2">{product.product_name}</td>
        <td className="border border-gray-300 px-4 py-2">{product.quantity}</td>
        <td className="border border-gray-300 px-4 py-2">—</td> {/* no date in model */}
        <td className="border border-gray-300 px-4 py-2">${product.cost}</td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="5" className="border border-gray-300 px-4 py-4 text-center text-gray-500">
        No products added yet
      </td>
    </tr>
  )}
</tbody>

          </table>
        </div>

        {/* NEXT BUTTON */}
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
