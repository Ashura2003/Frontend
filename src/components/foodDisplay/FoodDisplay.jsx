import axios from "axios";
import PropTypes from "prop-types";
import "react";
import { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../context/StoreContext";
import FoodCard from "../FoodCard/FoodCard";
import "./FoodDisplay.css";

const FoodDisplay = ({ category }) => {
  const [food_list, setFoods] = useState([]);
  const { url, loadCartData, setFoodList } = useContext(StoreContext);

  useEffect(() => {
    async function fetchData() {
      let newUrl = `${url}/food/getFood`;
      try {
        const response = await axios.get(newUrl);

        if (response.status === 200) {
          setFoods(response.data.food);
          setFoodList(response.data.food);
          console.log(food_list);
          await loadCartData(localStorage.getItem("token"));
        } else {
          alert(response.data.message);
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  // Filter the food_list based on the selected category
  const filteredFoodList = food_list.filter(
    (item) => category === "All" || category === item.category
  );

  console.log(filteredFoodList);

  return (
    <div className="food-display" id="food-display">
      <h2>Top dishes in your area</h2>
      <div className="food-display-list">
        {filteredFoodList.length > 0 ? (
          filteredFoodList.map((item) => (
            <FoodCard
              key={item._id}
              id={item._id}
              name={item.foodName}
              description={item.description}
              price={item.price}
              image={item.image}
            />
          ))
        ) : (
          <p className="no-items-message">
            Sorry, the item is not available at the moment.
          </p>
        )}
      </div>
    </div>
  );
};
FoodDisplay.propTypes = {
  category: PropTypes.string.isRequired,
};

export default FoodDisplay;
