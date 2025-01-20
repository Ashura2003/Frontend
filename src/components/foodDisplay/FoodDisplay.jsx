import "react";
import { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import FoodCard from "../FoodCard/FoodCard";
import "./FoodDisplay.css";

const FoodDisplay = ({ category }) => {
  const { food_list } = useContext(StoreContext);

  // Filter the food_list based on the selected category
  const filteredFoodList = food_list.filter(
    (item) => category === "All" || category === item.category
  );

  return (
    <div className="food-display" id="food-display">
      <h2>Top dishes in your area</h2>
      <div className="food-display-list">
        {filteredFoodList.length > 0 ? (
          filteredFoodList.map((item) => (
            <FoodCard
              key={item._id}
              id={item._id}
              name={item.name}
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

export default FoodDisplay;
