import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function ShopRegister() {
  const navigate = useNavigate();
  const [shop, setShop] = useState({
    shop_name: "",
    owner_name: "",
    email: "",
    phonenumber: "",
    address: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const register = async () => {
    const { shop_name, owner_name, email, phonenumber, address, password } = shop;

    if (!shop_name || !owner_name || !email || !phonenumber || !address || !password) {
      alert("Please fill all fields");
      return;
    }

    if (password.length < 8) {
      alert("Password must be at least 8 characters");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post("http://127.0.0.1:8000/blog/create-shop/", {
        shop_name: shop_name,
        owner_name: owner_name,
        email: email,
        phonenumber: phonenumber,
        address: address,
        password: password
      });

      if (response.status === 201) {
        alert("Shop registered successfully!");
        navigate("/shop/login");
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        alert(`Registration failed: ${error.response.data.error}`);
      } else {
        alert("Registration failed. Please try again.");
      }
      console.error("Registration error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-orange-50">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-orange-700">
          Shop Registration
        </h2>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Shop Name"
            value={shop.shop_name}
            onChange={(e) => setShop({ ...shop, shop_name: e.target.value })}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <input
            type="text"
            placeholder="Owner Name"
            value={shop.owner_name}
            onChange={(e) => setShop({ ...shop, owner_name: e.target.value })}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <input
            type="email"
            placeholder="Email"
            value={shop.email}
            onChange={(e) => setShop({ ...shop, email: e.target.value })}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <input
            type="tel"
            placeholder="Phone Number"
            value={shop.phonenumber}
            onChange={(e) => setShop({ ...shop, phonenumber: e.target.value })}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <textarea
            placeholder="Address"
            value={shop.address}
            onChange={(e) => setShop({ ...shop, address: e.target.value })}
            className="w-full px-3 py-2 border rounded resize-none focus:outline-none focus:ring-2 focus:ring-orange-500"
            rows="3"
          />
          <input
            type="password"
            placeholder="Password"
            value={shop.password}
            onChange={(e) => setShop({ ...shop, password: e.target.value })}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
          />

          <button
            onClick={register}
            disabled={loading}
            className={`w-full py-2 text-white rounded-lg transition mt-4 ${
              loading 
                ? "bg-orange-400 cursor-not-allowed" 
                : "bg-orange-600 hover:bg-orange-700"
            }`}
          >
            {loading ? "Registering..." : "Register"}
          </button>

          <p className="text-sm text-center text-gray-600 mt-3">
            Already have an account?{" "}
            <button
              onClick={() => navigate("/shop/login")}
              className="text-orange-600 hover:underline"
            >
              Login
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default ShopRegister;