import axios from "axios";
import "react";
import { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";
import "./AuthPopup.css";

const AuthPopup = ({ setShowLogin }) => {
  const { url, token, setToken } = useContext(StoreContext);

  const [currState, setCurrentState] = useState("Login");
  const [data, setData] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const onLogin = async (e) => {
    e.preventDefault();
    let newUrl = `${url}/user/${currState === "Login" ? "login" : "register"}`;

    console.log("Submitting data:", data);

    try {
      const response = await axios.post(newUrl, data);

      if (response.status === 200) {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        setShowLogin(false);
      } else {
        alert(response.data.message);
      }
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Internal Server Error");
    }
  };

  return (
    <div className="auth-popup">
      <form onSubmit={onLogin} className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img
            src={assets.cross_icon}
            alt=""
            onClick={() => setShowLogin(false)}
          />
        </div>
        <div className="login-popup-inputs">
          {currState === "Login" ? null : (
            <input
              name="username"
              onChange={onChangeHandler}
              value={data.username}
              type="text"
              placeholder="Username"
              required
            />
          )}
          <input
            name="email"
            onChange={onChangeHandler}
            value={data.email}
            type="email"
            placeholder="Email"
            required
          />
          {currState === "Login" ? null : (
            <input
              name="phone"
              onChange={onChangeHandler}
              value={data.phone}
              type="text"
              placeholder="Phone"
              required
            />
          )}
          <input
            name="password"
            onChange={onChangeHandler}
            value={data.password}
            type="password"
            placeholder="Password"
            required
          />
        </div>
        <button type="submit">
          {currState === "Sign Up" ? "Create account" : "Login"}
        </button>
        <p>
          {currState === "Login" ? (
            <>
              Create a new account?{" "}
              <span onClick={() => setCurrentState("Sign Up")}>Sign Up</span>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <span onClick={() => setCurrentState("Login")}>Login</span>
            </>
          )}
        </p>
      </form>
    </div>
  );
};

export default AuthPopup;
