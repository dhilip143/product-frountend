function SalesDashboard() {
  const sales = JSON.parse(localStorage.getItem("current_sales"));

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-100">
      <h1 className="text-3xl font-bold mb-4">Welcome, {sales?.username}</h1>
      <p className="text-gray-700">This is the Sales Dashboard</p>
    </div>
  );
}

export default SalesDashboard;
