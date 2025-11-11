import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function SalesLogin() {
  const navigate = useNavigate();
  const [cred, setCred] = useState({ email: "", password: "" });

  const login = async () => {
    const { email, password } = cred;

    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/blog/login-sales-register/",
        {
          email: email,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        localStorage.setItem("current_sales", JSON.stringify(response.data.user));
        alert("Login successful!");
        navigate("/sales/dashboard");
      }
    } catch (error) {
      if (error.response) {
        alert(error.response.data.error || "Login failed");
      } else if (error.request) {
        alert("Network error. Please try again.");
      } else {
        alert("An error occurred. Please try again.");
      }
      console.error("Error:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-green-700">
          Salesperson Login
        </h2>
        
        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={cred.email}
            onChange={(e) => setCred({ ...cred, email: e.target.value })}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={cred.password}
            onChange={(e) => setCred({ ...cred, password: e.target.value })}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          
          <button
            onClick={login}
            className="w-full py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition mt-4 font-semibold"
          >
            Login
          </button>

          <p className="text-sm text-center text-gray-600 mt-3">
            Don't have an account?{" "}
            <button
              onClick={() => navigate("/sales/register")}
              className="text-green-600 hover:underline font-medium"
            >
              Register
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SalesLogin;