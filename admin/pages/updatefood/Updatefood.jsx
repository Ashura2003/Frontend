import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { StoreContext } from "../../../src/context/StoreContext";

const UpdateFood = () => {
  const { id } = useParams();
  const { url } = useContext(StoreContext);

  const [foodName, setFoodName] = useState("");
  const [foodPrice, setFoodPrice] = useState("");
  const [foodCategory, setFoodCategory] = useState("");
  const [foodDescription, setFoodDescription] = useState("");
  const [foodNewImage, setFoodNewImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [oldImage, setOldImage] = useState("");

  useEffect(() => {
    async function fetchData(id) {
      let newUrl = `${url}/food/get_food/${id}`;
      try {
        const response = await axios.get(newUrl);

        if (response.status === 200) {
          setFoodName(response.data.food.foodName);
          setFoodPrice(response.data.food.price);
          setFoodCategory(response.data.food.category);
          setFoodDescription(response.data.food.description);
          setOldImage(response.data.food.image);
          toast.success(response.data.message);
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchData(id);
  }, [id]);

  const handleImage = (e) => {
    const file = e.target.files[0];
    setFoodNewImage(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    let newUrl = `${url}/food/editFood/${id}`;
    let formData = new FormData();

    formData.append("foodName", foodName);
    formData.append("price", foodPrice);
    formData.append("category", foodCategory);
    formData.append("description", foodDescription);

    if (foodNewImage) {
      formData.append("image", foodNewImage);
    }

    try {
      const response = await axios.put(newUrl, formData);
      if (response.status === 200) {
        alert(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mt-3">
      <h2>
        Update product for <span className="text-danger">{foodName}</span>
      </h2>

      <div className="d-flex gap-3">
        <form>
          <label>Product Name</label>
          <input
            value={foodName}
            onChange={(e) => setFoodName(e.target.value)}
            className="form-control"
            type="text"
          />

          <label className="mt-2">Product Price</label>
          <input
            value={foodPrice}
            onChange={(e) => setFoodPrice(e.target.value)}
            className="form-control"
            type="number"
          />

          <label className="mt-2">Choose category</label>
          <select
            value={foodCategory}
            onChange={(e) => setFoodCategory(e.target.value)}
            className="form-control"
          >
            {/* Categories */}
            <option value="rolls">Rolls</option>
            <option value="momo">Momo</option>
            <option value="sandwitch">Sandwitch</option>
            <option value="chowmein">Chowmein</option>
            <option value="pizza">Pizza</option>
            <option value="cake">Cake</option>
            <option value="newari">Newari</option>
            <option value="salad">Salad</option>
          </select>

          <label className="mt-2">Enter description</label>
          <textarea
            value={foodDescription}
            onChange={(e) => setFoodDescription(e.target.value)}
            className="form-control"
          ></textarea>

          <label className="mt-2">Choose product Image</label>
          <input onChange={handleImage} type="file" className="form-control" />

          <button
            onClick={handleUpdate}
            type="button"
            className="btn btn-danger w-100 mt-2"
          >
            Update Product
          </button>
        </form>

        <div className="image-section">
          <h6>Previewing old Image</h6>
          <img
            height="200px"
            width="250px"
            src={`http://localhost:5000/${oldImage}`}
            alt="Old Image"
          />

          {previewImage && (
            <>
              <h6>New Image</h6>
              <img
                height="150px"
                width="200px"
                src={previewImage}
                alt="New Image Preview"
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default UpdateFood;
