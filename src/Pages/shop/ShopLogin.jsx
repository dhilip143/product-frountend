import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ShopLogin() {
  const navigate = useNavigate();
  const [cred, setCred] = useState({ name: "", password: "" });

  const login = () => {
    const list = JSON.parse(localStorage.getItem("shops")) || [];
    const found = list.find(
      (s) => s.name === cred.name && s.password === cred.password
    );
    if (found) {
      localStorage.setItem("current_shop", JSON.stringify(found));
      navigate("/shop/dashboard");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-orange-50">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6">Shop Login</h2>
        <input
          type="text"
          placeholder="Shop Name"
          value={cred.name}
          onChange={(e) => setCred({ ...cred, name: e.target.value })}
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
          className="w-full py-2 bg-orange-600 text-white rounded hover:bg-orange-700 transition"
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default ShopLogin;
