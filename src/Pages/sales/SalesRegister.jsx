import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SalesRegister() {
  const navigate = useNavigate();
  const [sales, setSales] = useState({
    firstName: "",
    lastName: "",
    username: "",
    phone: "",
    address: "",
    password: "",
  });

  const register = () => {
    const { firstName, lastName, username, phone, address, password } = sales;

    if (!firstName || !lastName || !username || !phone || !address || !password) {
      alert("Please fill all fields");
      return;
    }

    const list = JSON.parse(localStorage.getItem("salespersons")) || [];
    list.push(sales);
    localStorage.setItem("salespersons", JSON.stringify(list));

    alert("Salesperson registered successfully!");
    navigate("/sales/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-green-700">
          Salesperson Registration
        </h2>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="First Name"
            value={sales.firstName}
            onChange={(e) => setSales({ ...sales, firstName: e.target.value })}
            className="w-full px-3 py-2 border rounded"
          />
          <input
            type="text"
            placeholder="Last Name"
            value={sales.lastName}
            onChange={(e) => setSales({ ...sales, lastName: e.target.value })}
            className="w-full px-3 py-2 border rounded"
          />
          <input
            type="text"
            placeholder="Username"
            value={sales.username}
            onChange={(e) => setSales({ ...sales, username: e.target.value })}
            className="w-full px-3 py-2 border rounded"
          />
          <input
            type="tel"
            placeholder="Phone Number"
            value={sales.phone}
            onChange={(e) => setSales({ ...sales, phone: e.target.value })}
            className="w-full px-3 py-2 border rounded"
          />
          <textarea
            placeholder="Address"
            value={sales.address}
            onChange={(e) => setSales({ ...sales, address: e.target.value })}
            className="w-full px-3 py-2 border rounded resize-none"
          />
          <input
            type="password"
            placeholder="Password"
            value={sales.password}
            onChange={(e) => setSales({ ...sales, password: e.target.value })}
            className="w-full px-3 py-2 border rounded"
          />

          <button
            onClick={register}
            className="w-full py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition mt-4"
          >
            Register
          </button>

          <p className="text-sm text-center text-gray-600 mt-3">
            Already have an account?{" "}
            <button
              onClick={() => navigate("/sales/login")}
              className="text-green-600 hover:underline"
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
