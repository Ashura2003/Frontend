import "react";
import { useState } from "react";
import { assets } from "../../assets/assets";
import "./AuthPopup.css";

const AuthPopup = ({ setShowLogin }) => {
  const [currState, setCurrentState] = useState("Login");

  return (
    <div className="auth-popup">
      <form className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img
            src={assets.cross_icon}
            alt=""
            onClick={() => {
              setShowLogin(false);
            }}
          />
        </div>
        <div className="login-popup-inputs">
          {currState === "Login" ? (
            <></>
          ) : (
            <input type="text" placeholder="Name" required />
          )}
          <input type="email" placeholder="Email" required />
          {currState === "Login" ? (
            <></>
          ) : (
            <input type="text" placeholder="Phone" required />
          )}
          <input type="password" placeholder="Password" required />
        </div>
        <button>{currState === "Sign Up" ? "Create account" : "Login"}</button>
        {currState === "Login" ? (
          <p>
            Create a new Account?{" "}
            <span onClick={() => setCurrentState("Sign Up")}>Sign Up</span>
          </p>
        ) : (
          <p>
            Already have a account?{" "}
            <span
              onClick={() => {
                setCurrentState("Login");
              }}
            >
              Login
            </span>
          </p>
        )}
      </form>
    </div>
  );
};

export default AuthPopup;
