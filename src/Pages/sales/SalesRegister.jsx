import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function SalesRegister() {
  const navigate = useNavigate();
  const [sales, setSales] = useState({
    firstname: "",
    email: "",
    phonenumber: "",
    address: "",
    password: "",
  });

  const register = async () => {
    const { firstname, email, phonenumber, address, password } = sales;

    if (!firstname || !email || !phonenumber || !address || !password) {
      alert("Please fill all fields");
      return;
    }

    if (password.length < 8) {
      alert("Password must be at least 8 characters");
      return;
    }

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/blog/create-sales-register/",
        {
          firstname: firstname,
          email: email,
          phonenumber: phonenumber,
          address: address,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201) {
        alert("Salesperson registered successfully!");
        navigate("/sales/login");
      }
    } catch (error) {
      if (error.response) {
        // Server responded with error status
        alert(error.response.data.error || "Registration failed");
      } else if (error.request) {
        // Request made but no response received
        alert("Network error. Please try again.");
      } else {
        // Something else happened
        alert("An error occurred. Please try again.");
      }
      console.error("Error:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-green-700">
          Salesperson Registration
        </h2>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="First Name"
            value={sales.firstname}
            onChange={(e) => setSales({ ...sales, firstname: e.target.value })}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            type="email"
            placeholder="Email"
            value={sales.email}
            onChange={(e) => setSales({ ...sales, email: e.target.value })}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            type="tel"
            placeholder="Phone Number"
            value={sales.phonenumber}
            onChange={(e) => setSales({ ...sales, phonenumber: e.target.value })}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <textarea
            placeholder="Address"
            value={sales.address}
            onChange={(e) => setSales({ ...sales, address: e.target.value })}
            className="w-full px-3 py-2 border rounded resize-none focus:outline-none focus:ring-2 focus:ring-green-500"
            rows="3"
          />
          <input
            type="password"
            placeholder="Password"
            value={sales.password}
            onChange={(e) => setSales({ ...sales, password: e.target.value })}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <button
            onClick={register}
            className="w-full py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition mt-4 font-semibold"
          >
            Register
          </button>

          <p className="text-sm text-center text-gray-600 mt-3">
            Already have an account?{" "}
            <button
              onClick={() => navigate("/sales/login")}
              className="text-green-600 hover:underline font-medium"
            >
              Login
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SalesRegister;