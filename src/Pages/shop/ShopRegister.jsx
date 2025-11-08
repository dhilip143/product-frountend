import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ShopRegister() {
  const navigate = useNavigate();
  const [shop, setShop] = useState({
    name: "",
    owner: "",
    phone: "",
    address: "",
    password: "",
  });

  const register = () => {
    const { name, owner, phone, address, password } = shop;

    if (!name || !owner || !phone || !address || !password) {
      alert("Please fill all fields");
      return;
    }

    const list = JSON.parse(localStorage.getItem("shops")) || [];
    list.push(shop);
    localStorage.setItem("shops", JSON.stringify(list));

    alert("Shop registered successfully!");
    navigate("/shop/login");
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
            value={shop.name}
            onChange={(e) => setShop({ ...shop, name: e.target.value })}
            className="w-full px-3 py-2 border rounded"
          />
          <input
            type="text"
            placeholder="Owner Name"
            value={shop.owner}
            onChange={(e) => setShop({ ...shop, owner: e.target.value })}
            className="w-full px-3 py-2 border rounded"
          />
          <input
            type="tel"
            placeholder="Phone Number"
            value={shop.phone}
            onChange={(e) => setShop({ ...shop, phone: e.target.value })}
            className="w-full px-3 py-2 border rounded"
          />
          <textarea
            placeholder="Address"
            value={shop.address}
            onChange={(e) => setShop({ ...shop, address: e.target.value })}
            className="w-full px-3 py-2 border rounded resize-none"
          />
          <input
            type="password"
            placeholder="Password"
            value={shop.password}
            onChange={(e) => setShop({ ...shop, password: e.target.value })}
            className="w-full px-3 py-2 border rounded"
          />

          <button
            onClick={register}
            className="w-full py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition mt-4"
          >
            Register
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
