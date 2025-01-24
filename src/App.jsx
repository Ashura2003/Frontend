import { useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import AdminNavbar from "../admin/components/navbar/AdminNavbar.jsx";
import AdminDashboard from "../admin/pages/AdminDashboard.jsx";
import UpdateFood from "../admin/pages/updatefood/Updatefood.jsx";
import AuthPopup from "./components/authPopup/AuthPopup.jsx";
import Footer from "./components/footer/Footer.jsx";
import Navbar from "./components/navbar/Navbar.jsx";
import Cart from "./pages/cart/Cart.jsx";
import Home from "./pages/home/Home.jsx";
import PlaceOrder from "./pages/place order/PlaceOrder.jsx";

const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  const location = useLocation();

  // Define routes where the AdminNavbar and Sidebar should appear
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <>
      {showLogin && <AuthPopup setShowLogin={setShowLogin} />}
      <div className="app">
        {/* Conditionally render Navbar for public routes */}
        {!isAdminRoute && <Navbar setShowLogin={setShowLogin} />}

        <div className={isAdminRoute ? "admin-layout" : ""}>
          {/* Conditionally render AdminNavbar */}
          {isAdminRoute && <AdminNavbar />}

          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/order" element={<PlaceOrder />} />

            {/* Admin routes */}
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/update/:id" element={<UpdateFood />} />
          </Routes>
        </div>

        {/* Conditionally render Footer for public routes */}
        {!isAdminRoute && <Footer />}
      </div>
    </>
  );
};

export default App;
