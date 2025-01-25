import axios from "axios";
import "react";
import { useContext, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import "./Verify.css";

const Verify = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");
  const { url } = useContext(StoreContext);
  const navigate = useNavigate();

  const verifyPayment = async () => {
    try {
      console.log("orderId", orderId);
      console.log("success", success);

      const response = await axios.post(url + "/order/verify", {
        orderId: orderId,
        success: success,
      });

      if (response.status === 200) {
        navigate("/myorder");
        alert(response.data.message);
      } else {
        alert("Payment verification failed. Redirecting to cart.");
        navigate("/cart");
      }
    } catch (error) {
      console.error("Verification failed:", error);
      alert("Something went wrong. Redirecting to cart.");
      navigate("/cart");
    }
  };

  useEffect(() => {
    verifyPayment();
  }, []);

  return (
    <div className="verify">
      <div className="spinner"></div>
    </div>
  );
};

export default Verify;
