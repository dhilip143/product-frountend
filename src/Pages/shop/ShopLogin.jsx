import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function ShopLogin() {
  const navigate = useNavigate();
  const [cred, setCred] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const login = async () => {
    if (!cred.email || !cred.password) {
      alert("Please fill in both fields");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post("http://127.0.0.1:8000/blog/login-shop/", {
        email: cred.email,
        password: cred.password,
      });

      // ✅ Assuming backend returns something like: { success: true, shop: {...}, token: "..." }
      if (response.data && response.data.shop) {
        localStorage.setItem("current_shop", JSON.stringify(response.data.shop));
        if (response.data.token) {
          localStorage.setItem("shop_token", response.data.token);
        }
        navigate("/shop/dashboard");
      } else {
        alert("Invalid credentials. Please try again.");
      }
    } catch (error) {
      console.error("Login error:", error);
      if (error.response && error.response.data) {
        alert(error.response.data.message || "Invalid credentials");
      } else {
        alert("Server error. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-orange-50">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6">Shop Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={cred.email}
          onChange={(e) => setCred({ ...cred, email: e.target.value })}
          className="w-full px-3 py-2 border rounded mb-4"
        />
        <input
          type="password"
          placeholder="Password"
          value={cred.password}
          onChange={(e) => setCred({ ...cred, password: e.target.value })}
          className="w-full px-3 py-2 border rounded mb-4"
        />
        <button
          onClick={login}
          disabled={loading}
          className={`w-full py-2 ${
            loading ? "bg-gray-400" : "bg-orange-600 hover:bg-orange-700"
          } text-white rounded transition`}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </div>
    </div>
  );
}

export default ShopLogin;
