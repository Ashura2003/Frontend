import React from "react";
import { assets } from "../../../src/assets/assets";
import "./AdminNavbar.css";

const AdminNavbar = () => {
  return (
    <div className="admin-navbar">
      <img className="logo" src={assets.logo} alt="" />
      <img className="profile" src={assets.profile_image} alt="" />
    </div>
  );
};

export default AdminNavbar;
