import React, { useEffect, useState } from "react";

const ProductAddPage = () => {
  const [productName, setProductName] = useState("");
  const [cost, setCost] = useState("");
  const [quantity, setQuantity] = useState("");
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const res = await fetch("http://127.0.0.1:8000/blog/product/list/");
    const data = await res.json();
    setProductList(data.data || []);
  };

  const handleAddProduct = async () => {
    const body = {
      product_name: productName,
      cost,
      quantity,
    };

    const res = await fetch("http://127.0.0.1:8000/blog/product/add/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (res.ok) {
      alert("Product added successfully!");
      fetchProducts();
      setProductName("");
      setCost("");
      setQuantity("");
    } else {
      alert("Failed to add product");
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      {/* ADD PRODUCT */}
      <div className="bg-white p-6 rounded-xl shadow-md mb-10 max-w-xl mx-auto">
        <h2 className="text-xl font-bold mb-4">Add Product</h2>

        <input
          type="text"
          placeholder="Product Name"
          className="w-full p-2 border rounded mb-3"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />

        <input
          type="number"
          placeholder="Cost"
          className="w-full p-2 border rounded mb-3"
          value={cost}
          onChange={(e) => setCost(e.target.value)}
        />

        <input
          type="number"
          placeholder="Quantity"
          className="w-full p-2 border rounded mb-3"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />

        <button
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
          onClick={handleAddProduct}
        >
          Add Product
        </button>
      </div>

      {/* PRODUCT LIST */}
      <div className="bg-white p-6 rounded-xl shadow-md max-w-4xl mx-auto">
        <h2 className="text-xl font-bold mb-4">Product List</h2>

        <table className="w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">ID</th>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Cost</th>
              <th className="p-2 border">Quantity</th>
            </tr>
          </thead>
          <tbody>
            {productList.map((p) => (
              <tr key={p.id}>
                <td className="p-2 border">{p.id}</td>
                <td className="p-2 border">{p.product_name}</td>
                <td className="p-2 border">{p.cost}</td>
                <td className="p-2 border">{p.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default ProductAddPage;
