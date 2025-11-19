import React, { useEffect, useState } from "react";

const DeliveryAddPage = () => {
  const [customerName, setCustomerName] = useState("");
  const [deliveryCost, setDeliveryCost] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");

  const [productList, setProductList] = useState([]);
  const [deliveryList, setDeliveryList] = useState([]);

  useEffect(() => {
    fetchProducts();
    fetchDeliveries();
  }, []);

  const fetchProducts = async () => {
    const res = await fetch("http://127.0.0.1:8000/blog/product/list/");
    const data = await res.json();
    setProductList(data.data || []);
  };

  const fetchDeliveries = async () => {
    const res = await fetch("http://127.0.0.1:8000/blog/delivery/list/");
    const data = await res.json();
    setDeliveryList(data.data || []);
  };

  const handleAddDelivery = async () => {
    const body = {
      product: selectedProduct,
      customer_name: customerName,
      delivery_cost: deliveryCost,
      delivery_date: deliveryDate,
    };

    const res = await fetch("http://127.0.0.1:8000/blog/delivery/add/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (res.ok) {
      alert("Delivery added successfully!");
      fetchDeliveries();
      setCustomerName("");
      setDeliveryCost("");
      setDeliveryDate("");
      setSelectedProduct("");
    } else {
      alert("Failed to add delivery");
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      {/* ADD DELIVERY */}
      <div className="bg-white p-6 rounded-xl shadow-md mb-10 max-w-xl mx-auto">
        <h2 className="text-xl font-bold mb-4">Add Delivery</h2>

        <select
          className="w-full p-2 border rounded mb-3"
          value={selectedProduct}
          onChange={(e) => setSelectedProduct(e.target.value)}
        >
          <option value="">-- Select Product --</option>
          {productList.map((p) => (
            <option value={p.id} key={p.id}>
              {p.product_name}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Customer Name"
          className="w-full p-2 border rounded mb-3"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
        />

        <input
          type="number"
          placeholder="Delivery Cost"
          className="w-full p-2 border rounded mb-3"
          value={deliveryCost}
          onChange={(e) => setDeliveryCost(e.target.value)}
        />

        <input
          type="date"
          className="w-full p-2 border rounded mb-3"
          value={deliveryDate}
          onChange={(e) => setDeliveryDate(e.target.value)}
        />

        <button
          className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700"
          onClick={handleAddDelivery}
        >
          Add Delivery
        </button>
      </div>

      {/* DELIVERY LIST */}
      <div className="bg-white p-6 rounded-xl shadow-md max-w-4xl mx-auto">
        <h2 className="text-xl font-bold mb-4">Delivery List</h2>

        <table className="w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">ID</th>
              <th className="p-2 border">Product</th>
              <th className="p-2 border">Customer</th>
              <th className="p-2 border">Cost</th>
              <th className="p-2 border">Date</th>
            </tr>
          </thead>
          <tbody>
            {deliveryList.map((d) => (
              <tr key={d.id}>
                <td className="p-2 border">{d.id}</td>
                <td className="p-2 border">{d.product_name}</td>
                <td className="p-2 border">{d.customer_name}</td>
                <td className="p-2 border">{d.delivery_cost}</td>
                <td className="p-2 border">{d.delivery_date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default DeliveryAddPage;
