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

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setSales({ ...sales, [e.target.name]: e.target.value });
  };

  const register = async () => {
    const { firstname, email, phonenumber, address, password } = sales;

    // ✅ Validation
    if (!firstname || !email || !phonenumber || !address || !password) {
      alert("Please fill all fields");
      return;
    }

    if (password.length < 8) {
      alert("Password must be at least 8 characters long");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/blog/create-sales-register/",
        {
          firstname,
          email,
          phonenumber,
          address,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201) {
        alert("🎉 Registration successful!");
        navigate("/sales/login");
      }
    } catch (error) {
      if (error.response) {
        alert(error.response.data.error || "Registration failed");
      } else {
        alert("Network or server error. Please try again later.");
      }
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 via-white to-green-200">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-green-200">
        <h2 className="text-3xl font-bold mb-6 text-center text-green-700">
          Salesperson Registration
        </h2>

        <div className="space-y-4">
          <input
            name="firstname"
            type="text"
            placeholder="First Name"
            value={sales.firstname}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={sales.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            name="phonenumber"
            type="tel"
            placeholder="Phone Number"
            value={sales.phonenumber}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <textarea
            name="address"
            placeholder="Address"
            value={sales.address}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-green-500"
            rows="3"
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={sales.password}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <button
            onClick={register}
            disabled={loading}
            className={`w-full py-2 text-white rounded-lg font-semibold transition ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {loading ? "Registering..." : "Register"}
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
