import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { assets } from "../../../src/assets/assets";
import { StoreContext } from "../../../src/context/StoreContext";
import "./Orders.css";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  const { url } = useContext(StoreContext);

  const fetchOrders = async () => {
    const response = await axios.get(`${url}/order/list`);
    if (response.status === 200) {
      setOrders(response.data.orders);
      console.log("The response is:", response.data.orders);
    } else {
      toast.error(response.data.message);
    }
  };

  const statusHandler = async (e, id) => {
    const response = await axios.put(`${url}/order/status`, {
      orderId: id,
      status: e.target.value,
    });
    if (response.status === 200) {
      await fetchOrders();
      toast.success(response.data.message);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="container">
      <div className="order-add">
        <h3>Orders</h3>
        <div className="order-list">
          {orders.map((order, index) => (
            <div key={index} className="order-item">
              <img src={assets.parcel_icon} alt="" />
              <div>
                <p className="order-item-food">
                  {order.items.map((item, index) => {
                    if (index === order.items.length - 1) {
                      return `${item.name} x ${item.quantity}`;
                    } else {
                      return `${item.name} x ${item.quantity}, `;
                    }
                  })}
                </p>
                <p className="order-item-name">
                  {order.address.firstName + " " + order.address.lastName}
                </p>
                <div className="order-item-address">
                  <p>{order.address.location + "," + order.address.city}</p>
                </div>
                <p className="order-item-phone">{order.address.phone}</p>
              </div>
              <p>Items : {order.items.length}</p>
              <p>Rs. {order.amount}.00</p>
              <select
                onChange={(e) => statusHandler(e, order._id)}
                value={order.status}
              >
                <option value="Pending">Pending</option>
                <option value="Out for delivery">Out for delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Orders;
