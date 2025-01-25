import axios from "axios";
import "react";
import { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../context/StoreContext";
import "./MyOrders.css";

const MyOrders = () => {
  const { url } = useContext(StoreContext);
  const [data, setData] = useState([]);
  const token = localStorage.getItem("token");

  const fetchOrders = async () => {
    const response = await axios.get(
      url + "/order/userOrders",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setData(response.data.data);
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, []);

  return <div></div>;
};

export default MyOrders;
