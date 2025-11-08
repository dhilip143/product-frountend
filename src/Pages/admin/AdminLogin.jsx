import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
  const navigate = useNavigate();
  const [cred, setCred] = useState({ username: "", password: "" });

  const login = () => {
    const adminList = JSON.parse(localStorage.getItem("admins")) || [];

    const foundAdmin = adminList.find(
      (a) => a.username === cred.username && a.password === cred.password
    );

    if (foundAdmin) {
      localStorage.setItem("current_admin", JSON.stringify(foundAdmin));
      alert("Login successful!");
      navigate("/admin/dashboard"); // Go to dashboard after login
    } else {
      alert("Invalid username or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">Admin Login</h2>

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
          className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Login
        </button>

        <p className="text-sm text-center text-gray-600 mt-3">
          Don’t have an account?{" "}
          <button
            onClick={() => navigate("/admin/register")}
            className="text-blue-600 hover:underline"
          >
            Register
          </button>
        </p>
      </div>
    </div>
  );
}

export default AdminLogin;
