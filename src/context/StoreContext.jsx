import axios from "axios";
import PropTypes from "prop-types";
import { createContext, useMemo, useState } from "react";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const url = "http://localhost:5000/api";
  const token = localStorage.getItem("token");
  const [food_list, setFoodList] = useState([]);

  const addToCart = async (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
      console.log("The total cart items are:", cartItems);
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
      console.log("The total cart items are:", cartItems);
    }

    if (token) {
      await axios.post(
        `${url}/cart/addToCart`,
        { itemId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    }
  };

  const removeFromCart = async (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    if (token) {
      await axios.post(
        `${url}/cart/removeFromCart`,
        { itemId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    }
  };

  const loadCartData = async (token) => {
    const response = await axios.get(`${url}/cart/getCart`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setCartItems(response.data.cartData);
  };

  const getTotalCartAmount = () => {
    let total = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = food_list.find((food) => food._id === item);
        if (itemInfo) {
          total += itemInfo.price * cartItems[item];
        } else {
          console.warn(`Item with ID ${item} not found in food_list.`);
        }
      }
    }
    return total;
  };

  const contextValue = useMemo(
    () => ({
      cartItems,
      setCartItems,
      addToCart,
      removeFromCart,
      getTotalCartAmount,
      url,
      token,
      loadCartData,
    }),
    [cartItems]
  );
  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};
StoreContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default StoreContextProvider;
