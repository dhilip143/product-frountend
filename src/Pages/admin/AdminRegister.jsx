import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AdminRegister() {
  const navigate = useNavigate();
  const [admin, setAdmin] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    password: "",
    role_type: "admin"
  });

  const register = async () => {
    const { name, email, phone, address, password, role_type } = admin;

    if (!name || !email || !phone || !address || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      const response = await axios.post("http://127.0.0.1:8000/blog/register/", {
        name: name,
        email: email,
        password: password,
        role_type: role_type,
        phone: phone,
        address: address
      });

      if (response.status === 200 || response.status === 201) {
        alert("Admin registered successfully!");
        navigate("/admin/login");
      }
    } catch (error) {
      if (error.response) {
        alert(error.response.data.error || error.response.data.msg || "Registration failed");
      } else {
        alert("Network error. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-700">
          Admin Registration
        </h2>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            value={admin.name}
            onChange={(e) => setAdmin({ ...admin, name: e.target.value })}
            className="w-full px-3 py-2 border rounded"
          />
          <input
            type="email"
            placeholder="Email"
            value={admin.email}
            onChange={(e) => setAdmin({ ...admin, email: e.target.value })}
            className="w-full px-3 py-2 border rounded"
          />
          <input
            type="tel"
            placeholder="Phone Number"
            value={admin.phone}
            onChange={(e) => setAdmin({ ...admin, phone: e.target.value })}
            className="w-full px-3 py-2 border rounded"
          />
          <textarea
            placeholder="Address"
            value={admin.address}
            onChange={(e) => setAdmin({ ...admin, address: e.target.value })}
            className="w-full px-3 py-2 border rounded resize-none"
          />
          <input
            type="password"
            placeholder="Password"
            value={admin.password}
            onChange={(e) => setAdmin({ ...admin, password: e.target.value })}
            className="w-full px-3 py-2 border rounded"
          />

          <button
            onClick={register}
            className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition mt-4"
          >
            Register
          </button>

          <p className="text-sm text-center text-gray-600 mt-3">
            Already have an account?{" "}
            <button
              onClick={() => navigate("/admin/login")}
              className="text-blue-600 hover:underline"
            >
              Login
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default AdminRegister;