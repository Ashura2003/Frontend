import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";

const AdminDashboard = () => {
  const [foodName, setFoodName] = useState("");
  const [foodPrice, setFoodPrice] = useState("");
  const [foodCategory, setFoodCategory] = useState("");
  const [foodDescription, setFoodDescription] = useState("");

  const [foodImage, setFoodImage] = useState("");
  const [previewImage, setPreviewImage] = useState("");

  const [foods, setFoods] = useState([]);

  const { url } = useContext(StoreContext);

  useEffect(() => {
    async function fetchData() {
      let newUrl = `${url}/food/getFood`;
      try {
        const response = await axios.get(newUrl);

        if (response.status === 200) {
          setFoods(response.data.food);
        } else {
          alert(response.data.message);
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [url]);

  const handleDelete = async (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this item?"
    );
    if (confirm) {
      let newUrl = `${url}/food/removeFood/${id}`;
      try {
        let response = await axios.delete(newUrl);
        if (response.status === 200) {
          window.location.reload();
          alert(response.data.message);
        }
      } catch (error) {
        if (error.response) {
          if (error.response.status === 404) {
            alert(error.response.data.message);
          } else if (error.response.status === 500) {
            alert(error.response.data.message);
          } else {
            alert("Something went wrong");
          }
        }
      }
    }
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    setFoodImage(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("foodName", foodName);
    formData.append("description", foodDescription);
    formData.append("price", foodPrice);
    formData.append("category", foodCategory);
    formData.append("image", foodImage);

    try {
      let newUrl = `${url}/food/addFood`;
      const response = await axios.post(newUrl, formData);

      if (response.status === 201) {
        window.location.reload();
        alert(response.data.message);
      }
    } catch (error) {
      console.log(error);
      if (error.response) {
        if (error.response.status === 400) {
          alert(error.response.data.message);
        } else if (error.response.status === 500) {
          alert(error.response.data.message);
        } else {
          alert("Something went wrong");
        }
      } else {
        alert("Something went wrong");
      }
    }
  };

  return (
    <div className="container mt-3">
      <div className="d-flex justify-content-between">
        <h2>Admin Dashboard</h2>
        <button
          type="button"
          className="btn btn-danger"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          Add Product
        </button>

        <div
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">
                  Create a new product
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <form action="">
                  <label>Product Name </label>
                  <input
                    onChange={(e) => setFoodName(e.target.value)}
                    type="text"
                    className="form-control"
                    placeholder="Enter Product Name"
                  />

                  <label className="mt-2">Product Price </label>
                  <input
                    onChange={(e) => setFoodPrice(e.target.value)}
                    type="number"
                    className="form-control"
                    placeholder="Enter Product Price"
                  />

                  <label className="mt-2">Choose Product Category</label>
                  <select
                    onChange={(e) => setFoodCategory(e.target.value)}
                    className="form-control"
                  >
                    <option value="rolls">Rolls</option>
                    <option value="momo">Momo</option>
                    <option value="sandwitch">Sandwitch</option>
                    <option value="chowmein">Chowmein</option>
                    <option value="pizza">Pizza</option>
                    <option value="cake">Cake</option>
                    <option value="newari">Newari</option>
                    <option value="salad">Salad</option>
                  </select>

                  <label className="mt-2">Enter Description</label>
                  <textarea
                    onChange={(e) => setFoodDescription(e.target.value)}
                    className="form-control"
                  ></textarea>

                  <label className="mt-2">Upload Product Image</label>
                  <input
                    onChange={handleImage}
                    type="file"
                    className="form-control"
                  />

                  {/** Image Preview */}
                  {previewImage && (
                    <img
                      src={previewImage}
                      alt="preview image"
                      className="img-fluid rounded mt-2"
                    />
                  )}
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-danger"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  onClick={handleSubmit}
                  type="button"
                  className="btn btn-primary"
                >
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <table className="table mt-2">
        <thead className="table-dark">
          <tr>
            <th>Product Image</th>
            <th>Product Name</th>
            <th>Product Price</th>
            <th>Category</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {foods.map((singleProduct) => (
            <tr key={singleProduct._id}>
              <td>
                <img
                  width={"40px"}
                  height={"40px"}
                  src={`http://localhost:5000/${singleProduct.image}`}
                  alt=" "
                />
              </td>
              <td>{singleProduct.foodName}</td>
              <td>{singleProduct.price}</td>
              <td>{singleProduct.category}</td>
              <td>{singleProduct.description}</td>
              <td>
                <Link
                  to={`/admin/update/${singleProduct._id}`}
                  className="btn btn-primary"
                >
                  Edit
                </Link>
                <button
                  onClick={() => {
                    handleDelete(singleProduct._id);
                  }}
                  className="btn btn-danger ms-2"
                >
                  {" "}
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
