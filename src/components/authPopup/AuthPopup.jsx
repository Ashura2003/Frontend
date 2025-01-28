import axios from "axios";
import "react";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";
import "./AuthPopup.css";

const AuthPopup = ({ setShowLogin }) => {
  const { url, token } = useContext(StoreContext);

  const [currState, setCurrentState] = useState("Login");
  const [data, setData] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  });
  const [otp, setOtp] = useState("");
  const [isSentOtp, setIsSentOtp] = useState(false);
  const [showOtp, setShowOtp] = useState(false);
  const [phone, setPhone] = useState("");
  const [resetPassword, setResetPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [show, setShow] = useState(false);

  const handleReset = async (e) => {
    e.preventDefault();
    // Add your forgot password logic here
    if (resetPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    const response = await axios.post(`${url}/user/reset_password`, {
      phone: phone,
      otp: otp,
      password: resetPassword,
    });

    if (response.status === 200) {
      toast.success(response.data.message);
      setShow(false);
    } else {
      toast.error(response.data.message);
    }
  };

  const sentOtp = async (e) => {
    e.preventDefault();
    // Add your sent otp logic here
    if (phone.trim === "") {
      toast.error("Please enter phone number");
      return;
    }

    const response = await axios.post(`${url}/user/forgot_password`, {
      phone: phone,
    });

    if (response.status === 200) {
      toast.success(response.data.message);
      setIsSentOtp(true);
    } else {
      toast.error(response.data.message);
    }
  };

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
        localStorage.setItem("token", response.data.token);
        toast.success(response.data.message);
        setShowLogin(false);
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Internal Server Error");
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
              <span onClick={() => setShow(true)}>Forgot Password</span>
              <div
                className={`modal fade ${show ? "show" : ""}`}
                style={{ display: show ? "block" : "none" }}
                id="exampleModal"
                tabIndex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden={!show}
              >
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h1 className="modal-title fs-5" id="exampleModalLabel">
                        Forgot Password
                      </h1>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                        onClick={() => setShow(false)}
                      ></button>
                    </div>
                    <div className="modal-body">
                      <div className="mb-3">
                        <form>
                          <label
                            htmlFor="exampleInputPhone1"
                            className="form-label"
                          >
                            Phone No.
                          </label>
                          <div className="row">
                            <div className="col-8">
                              <input
                                type="tel"
                                className="form-control"
                                id="exampleInputPhone1"
                                disabled={isSentOtp}
                                onChange={(e) => {
                                  setPhone(e.target.value);
                                }}
                              />
                            </div>
                            <div className="col-4">
                              <button
                                type="button"
                                className="btn btn-primary"
                                disabled={isSentOtp}
                                onClick={sentOtp}
                              >
                                Get OTP
                              </button>
                            </div>
                          </div>
                        </form>
                        {isSentOtp && (
                          <form>
                            <div className="mb-3">
                              <label htmlFor="otpInput" className="form-label">
                                OTP
                              </label>
                              <input
                                type="number"
                                className="form-control w-50"
                                id="otpInput"
                                onChange={(e) => setOtp(e.target.value)}
                              />
                            </div>
                            <div className="mb-3">
                              <label
                                htmlFor="newPasswordInput"
                                className="form-label"
                              >
                                New Password
                              </label>
                              <input
                                type="password"
                                className="form-control w-50"
                                id="newPasswordInput"
                                onChange={(e) =>
                                  setResetPassword(e.target.value)
                                }
                              />
                            </div>
                            <div className="mb-3">
                              <label
                                htmlFor="confirmPasswordInput"
                                className="form-label"
                              >
                                Confirm Password
                              </label>
                              <input
                                type="password"
                                className="form-control w-50"
                                id="confirmPasswordInput"
                                onChange={(e) =>
                                  setConfirmPassword(e.target.value)
                                }
                              />
                            </div>
                            <button
                              type="button"
                              className="btn btn-primary"
                              onClick={handleReset}
                            >
                              Reset Password
                            </button>
                          </form>
                        )}
                      </div>
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        data-bs-dismiss="modal"
                        onClick={() => setShow(false)}
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : null}
        </p>
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
