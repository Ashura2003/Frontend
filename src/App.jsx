import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import AuthPopup from "./components/authPopup/AuthPopup.jsx";
import Footer from "./components/footer/footer.jsx";
import Navbar from "./components/navbar/Navbar.jsx";
import Cart from "./pages/cart/Cart.jsx";
import Home from "./pages/home/Home.jsx";
import PlaceOrder from "./pages/place order/PlaceOrder.jsx";

const App = () => {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      {showLogin ? <AuthPopup setShowLogin={setShowLogin} /> : <></>}
      <div className="app">
        <Navbar setShowLogin={setShowLogin} />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/cart" element={<Cart />}></Route>
          <Route path="/order" element={<PlaceOrder />}></Route>
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;
