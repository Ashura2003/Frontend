import "react";
import ExploreMenu from "../../components/exploremenu/ExploreMenu";
import Header from "../../components/header/Header";
import "./Home.css";
import { useState } from "react";
import FoodDisplay from "../../components/foodDisplay/FoodDisplay";

const Home = () => {

  const [category, setCategory] = useState("All");

  return (
    <div>
      <Header />
      <ExploreMenu category={category} setCategory={setCategory} />
      <FoodDisplay category={category}/>
    </div>
  );
};

export default Home;
