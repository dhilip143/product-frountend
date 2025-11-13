import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phonenumber: "",
    address: "",
    password: ""
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
      isValid = false;
    }

    // Email validation
    if (!formData.email) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
      isValid = false;
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const register = async () => {
    if (!validateForm()) return;

    setLoading(true);
    setErrors({});

    try {
      const response = await fetch("http://127.0.0.1:8000/blog/register/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phonenumber: formData.phonenumber,
          address: formData.address,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Registration successful! Please login.");
        navigate("/admin/login");
      } else {
        if (data.error.includes("Email already exists")) {
          setErrors({ email: data.error });
        } else {
          setErrors({ general: data.error });
        }
      }
    } catch (error) {
      console.error("Registration error:", error);
      setErrors({ general: "Network error. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">User Registration</h2>

        {errors.general && (
          <p className="text-red-500 text-sm mb-4 text-center">{errors.general}</p>
        )}

        <input
          type="text"
          placeholder="Full Name *"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className={`w-full px-3 py-2 border rounded mb-4 ${
            errors.name ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.name && <p className="text-red-500 text-sm -mt-3 mb-2">{errors.name}</p>}

        <input
          type="email"
          placeholder="Email *"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className={`w-full px-3 py-2 border rounded mb-4 ${
            errors.email ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.email && <p className="text-red-500 text-sm -mt-3 mb-2">{errors.email}</p>}

        <input
          type="text"
          placeholder="Phone Number"
          value={formData.phonenumber}
          onChange={(e) => setFormData({ ...formData, phonenumber: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded mb-4"
        />

        <input
          type="text"
          placeholder="Address"
          value={formData.address}
          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded mb-4"
        />

        <input
          type="password"
          placeholder="Password *"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          className={`w-full px-3 py-2 border rounded mb-6 ${
            errors.password ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.password && <p className="text-red-500 text-sm -mt-3 mb-2">{errors.password}</p>}

        <button
          onClick={register}
          disabled={loading}
          className={`w-full py-2 text-white rounded transition ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Registering..." : "Register"}
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
  );
}

export default Register;