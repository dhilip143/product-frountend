function ShopDashboard() {
  const shop = JSON.parse(localStorage.getItem("current_shop"));

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-orange-100">
      <h1 className="text-3xl font-bold mb-4">Welcome, {shop?.owner}</h1>
      <p className="text-gray-700">This is the Shop Dashboard</p>
    </div>
  );
}

export default ShopDashboard;
