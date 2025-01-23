import { useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import AdminDashboard from "./admin/pages/AdminDashboard.jsx";
import AuthPopup from "./components/authPopup/AuthPopup.jsx";
import Footer from "./components/footer/footer.jsx";
import Navbar from "./components/navbar/Navbar.jsx";
import Cart from "./pages/cart/Cart.jsx";
import Home from "./pages/home/Home.jsx";
import PlaceOrder from "./pages/place order/PlaceOrder.jsx";

const App = () => {
  const [showLogin, setShowLogin] = useState(false);

  // Get the current location
  const location = useLocation();

  // Define routes where Navbar and Footer should not appear
  const hideLayout = location.pathname.startsWith("/admin");

  return (
    <>
      {showLogin && <AuthPopup setShowLogin={setShowLogin} />}
      <div className="app">
        {/* Conditionally render Navbar */}
        {!hideLayout && <Navbar setShowLogin={setShowLogin} />}

        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<PlaceOrder />} />

          {/* Admin routes */}
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>

        {/* Conditionally render Footer */}
        {!hideLayout && <Footer />}
      </div>
    </>
  );
};

export default App;
