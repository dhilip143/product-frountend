import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
  const navigate = useNavigate();
  const [cred, setCred] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({ email: "", password: "" });

  const validateForm = () => {
    let isValid = true;
    const newErrors = { email: "", password: "" };

    // Email validation
    if (!cred.email) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(cred.email)) {
      newErrors.email = "Email is invalid";
      isValid = false;
    }

    // Password validation
    if (!cred.password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (cred.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const login = async () => {
    if (!validateForm()) return;

    setLoading(true);
    setErrors({ email: "", password: "" });

    try {
      const response = await fetch("http://127.0.0.1:8000/blog/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: cred.email,
          password: cred.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Store user data in localStorage
        localStorage.setItem("current_user", JSON.stringify(data.user));
        localStorage.setItem("user_token", "authenticated");
        
        alert("Login successful!");
        navigate("/admin/dashboard"); // Go to dashboard after login
      } else {
        // Handle specific error messages from backend
        if (data.error.includes("Email not found")) {
          setErrors({ email: data.error, password: "" });
        } else if (data.error.includes("Incorrect password")) {
          setErrors({ email: "", password: data.error });
        } else {
          setErrors({ email: data.error, password: "" });
        }
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrors({ email: "Network error. Please try again.", password: "" });
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      login();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">User Login</h2>

        {/* Email Field */}
        <div className="mb-4">
          <input
            type="email"
            placeholder="Email address"
            value={cred.email}
            onChange={(e) => setCred({ ...cred, email: e.target.value })}
            onKeyPress={handleKeyPress}
            className={`w-full px-3 py-2 border rounded ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        {/* Password Field */}
        <div className="mb-6">
          <input
            type="password"
            placeholder="Password"
            value={cred.password}
            onChange={(e) => setCred({ ...cred, password: e.target.value })}
            onKeyPress={handleKeyPress}
            className={`w-full px-3 py-2 border rounded ${
              errors.password ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
          )}
        </div>

        <button
          onClick={login}
          disabled={loading}
          className={`w-full py-2 text-white rounded transition ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="text-sm text-center text-gray-600 mt-3">
          Don't have an account?{" "}
          <button
            onClick={() => navigate("/register")}
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