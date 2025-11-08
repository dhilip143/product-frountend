function AdminDashboard() {
  const admin = JSON.parse(localStorage.getItem("current_admin"));

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-blue-100">
      <h1 className="text-3xl font-bold mb-4">Welcome, {admin?.username}</h1>
      <p className="text-gray-700">This is the Admin Dashboard</p>
    </div>
  );
}

export default AdminDashboard;
