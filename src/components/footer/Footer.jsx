import "react";
import { assets } from "../../assets/assets";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="footer" id="footer">
      <div className="footer-content">
        <div className="footer-content-left">
          <img src={assets.logo} alt="" />
          <p>
            Far far away, behind the word mountains, far from the countries
            Vokalia and Consonantia, there live the blind texts.
          </p>
          <div className="footer-social-icons">
            <img src={assets.facebook_icon} alt="" />
            <img src={assets.twitter_icon} alt="" />
          </div>
        </div>
        <div className="footer-content-center">
          <h2>Company</h2>
          <ul>
            <li>Home</li>
            <li>About Us</li>
            <li>Delivery</li>
            <li>Terms & Conditions</li>
          </ul>
        </div>
        <div className="footer-content-right">
          <h2>Support</h2>
          <ul>
            <li>Phone: +977-9818384964</li>
            <li>Email: shreejan.maharjan200@gmail.com</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
