import React, { useState } from 'react';

const ShopDashboard = () => {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    productName: '',
    qtn: '',
    date: '',
    cost: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAdd = () => {
    if (formData.productName && formData.qtn && formData.date && formData.cost) {
      setProducts(prev => [...prev, { ...formData, id: Date.now() }]);
      setFormData({
        productName: '',
        qtn: '',
        date: '',
        cost: ''
      });
    }
  };

  const totalCost = products.reduce((sum, product) => sum + parseFloat(product.cost || 0), 0);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Product Delivery Form</h1>
        
        {/* Input Form */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
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
            <label className="block text-sm font-medium text-gray-700 mb-1">Qtn</label>
            <input
              type="number"
              name="qtn"
              value={formData.qtn}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Cost</label>
            <div className="flex">
              <input
                type="number"
                name="cost"
                value={formData.cost}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Cost"
              />
              <button
                onClick={handleAdd}
                className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700 transition-colors"
              >
                Add
              </button>
            </div>
          </div>
        </div>
        
        {/* Products Table */}
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
                  <tr key={product.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
                    <td className="border border-gray-300 px-4 py-2">{product.productName}</td>
                    <td className="border border-gray-300 px-4 py-2">{product.qtn}</td>
                    <td className="border border-gray-300 px-4 py-2">{product.date}</td>
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
        
        {/* Navigation and Total Cost */}
        <div className="flex justify-between items-center mt-6">
          <button className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors">
            Next
          </button>
          
          <div className="text-lg font-semibold">
            Total Cost: <span className="text-blue-600">${totalCost.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopDashboard;