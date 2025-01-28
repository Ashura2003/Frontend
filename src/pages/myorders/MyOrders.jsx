import axios from "axios";
import "react";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";
import "./MyOrders.css";

const MyOrders = () => {
  const { url } = useContext(StoreContext);
  const [data, setData] = useState([]);
  const token = localStorage.getItem("token");

  const reOrder = async (order) => {
    const confirmReOrder = window.confirm("Are you sure you want to re-order?");

    if (confirmReOrder) {
      let orderItems = [];
      try {
        const response = await axios.post(
          `${url}/order/placeOrder`,
          {
            items: order.items,
            amount: order.amount,
            address: order.address,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 200) {
          const { session_url } = response.data;
          window.location.replace(session_url);
          toast.success("Re-order placed successfully");
        } else {
          toast.error("Failed to place re-order. Please try again.");
        }
      } catch (error) {
        console.error("Error placing re-order:", error);
        alert("Failed to place re-order. Please try again.");
      }
    } else {
      return;
    }
  };

  const fetchOrders = async () => {
    console.log(token);

    const response = await axios.get(`${url}/order/userOrders`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setData(response.data.orders);
    console.log("The response is:", response.data.orders);

    console.log("The data is:", data);
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  return (
    <div className="my-orders">
      <h2>My Orders</h2>
      <div className="container">
        {data.map((order, index) => {
          return (
            <div key={order.id} className="my-orders-order">
              <img src={assets.parcel_icon} alt="" />
              <p>
                {order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return `${item.name} x ${item.quantity}`;
                  } else {
                    return `${item.name} x ${item.quantity}, `;
                  }
                })}
              </p>
              <p>Rs. {order.amount}.00</p>
              <p>Items: {order.items.length}</p>
              <p>
                <span>&#x25cf;</span> <b>{order.status}</b>
              </p>
              <button onClick={fetchOrders}>Track Order</button>
              <button
                className="re-order-button"
                onClick={() => reOrder(order)}
              >
                Re-Order
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyOrders;
