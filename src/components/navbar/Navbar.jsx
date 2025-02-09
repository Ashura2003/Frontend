import "react";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";
import "./Navbar.css";

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("Home");

  const { getTotalCartAmount, setCartItems } = useContext(StoreContext);
  const getToken = localStorage.getItem("token");
  const navigate = useNavigate();

  const logout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      localStorage.removeItem("token");
      navigate("/");
      setCartItems({});
      toast.success("Logged out successfully");
    } else {
      return;
    }
  };

  return (
    <div className="navbar">
      <Link to="/">
        <img src={assets.logo} alt="" className="logo" />
      </Link>

      <ul className="navbar-menu">
        <Link
          to="/"
          onClick={() => setMenu("Home")}
          className={menu == "Home" ? "active" : ""}
        >
          Home
        </Link>
        <a
          href="#explore-menu"
          onClick={() => setMenu("Menu")}
          className={menu == "Menu" ? "active" : ""}
        >
          Menu
        </a>
        <a
          href="#footer"
          onClick={() => setMenu("Contact Us")}
          className={menu == "Contact Us" ? "active" : ""}
        >
          Contact Us
        </a>
      </ul>
      <div className="navbar-right">
        <img src={assets.search_icon} alt="" />
        <div className="navbar-search-icon">
          <Link to="/cart">
            <img src={assets.basket_icon} alt="" />
          </Link>
          <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
        </div>
        {!getToken ? (
          <button
            onClick={() => {
              setShowLogin(true);
            }}
          >
            Sign In
          </button>
        ) : (
          <div className="navbar-profile">
            <img src={assets.profile_icon} alt="" />
            <ul className="nav-profile-dropdown">
              <Link to={"/profile"}>
                <li>
                  <img src={assets.profile_dropdown} alt="" />
                  <p>Profile</p>
                </li>
              </Link>
              <hr />
              <Link to={"/myorder"}>
                <li>
                  <img src={assets.bag_icon} alt="" />
                  <p>Orders</p>
                </li>
              </Link>
              <hr />
              <li>
                <img src={assets.logout_icon} alt="" />
                <p onClick={logout}>Logout</p>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
