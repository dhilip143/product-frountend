import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./Pages/Landing";

// Admin
import AdminRegister from "./pages/admin/AdminRegister";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "/src/Pages/admin/AdminDashboard.jsx";

// Sales
import SalesRegister from "./pages/sales/SalesRegister";
import SalesLogin from "./pages/sales/SalesLogin";
import SalesDashboard from "./pages/sales/SalesDashboard";

// Shop
import ShopRegister from "./pages/shop/ShopRegister";
import ShopLogin from "./pages/shop/ShopLogin";
import ShopDashboard from "./pages/shop/ShopDashboard";

// Common
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />

        {/* Admin */}
        <Route path="/admin/register" element={<AdminRegister />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />

        {/* Sales */}
        <Route path="/sales/register" element={<SalesRegister />} />
        <Route path="/sales/login" element={<SalesLogin />} />
        <Route path="/sales/dashboard" element={<SalesDashboard />} />

        {/* Shop */}
        <Route path="/shop/register" element={<ShopRegister />} />
        <Route path="/shop/login" element={<ShopLogin />} />
        <Route path="/shop/dashboard" element={<ShopDashboard />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
