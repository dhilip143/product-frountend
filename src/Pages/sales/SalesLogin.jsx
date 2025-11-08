import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SalesLogin() {
  const navigate = useNavigate();
  const [cred, setCred] = useState({ username: "", password: "" });

  const login = () => {
    const list = JSON.parse(localStorage.getItem("salespersons")) || [];
    const found = list.find(
      (s) => s.username === cred.username && s.password === cred.password
    );
    if (found) {
      localStorage.setItem("current_sales", JSON.stringify(found));
      navigate("/sales/dashboard");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6">Salesperson Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={cred.username}
          onChange={(e) => setCred({ ...cred, username: e.target.value })}
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
          className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default SalesLogin;
