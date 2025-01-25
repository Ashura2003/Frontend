import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import stockImage from "../../assets/stock-profile.jpg"; // Add a stock image to your assets folder
import { StoreContext } from "../../context/StoreContext";
import "./Profile.css";

const Profile = () => {
  const [user, setUser] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
  });
  const [password, setPassword] = useState("");

  const { url } = useContext(StoreContext);

  const token = localStorage.getItem("token");

  const fetchUserProfile = async () => {
    try {
      const response = await axios.get(`${url}/user/get_user`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(response.data.user);
      setFormData({
        username: response.data.user.username,
        email: response.data.user.email,
        phone: response.data.user.phone,
      });
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  const handleEdit = async () => {
    try {
      const response = await axios.post(`${url}/user/edit_user`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.status === 200) {
        toast.success(response.data.message);
        setEditMode(false);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error editing profile:", error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await axios.post(
        `${url}/user/delete_user`,
        { password },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.status === 200) {
        localStorage.removeItem("token");
        window.location.replace("/login");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error deleting account:", error);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  return (
    <div className="profile-page">
      <div className="profile-card">
        <img src={stockImage} alt="Profile" className="profile-pic" />
        {!editMode ? (
          <>
            <div className="profile-details">
              <div className="field">
                <label>First Name:</label>
                <p>{user.username.split(" ")[0]}</p>
              </div>
              <div className="field">
                <label>Last Name:</label>
                <p>{user.username.split(" ")[1]}</p>
              </div>
              <div className="field">
                <label>Phone:</label>
                <p>{user.phone}</p>
              </div>
              <div className="field">
                <label>Email:</label>
                <p>{user.email}</p>
              </div>
            </div>
            <div className="profile-buttons">
              <button
                onClick={() => setEditMode(true)}
                className="btn edit-btn"
              >
                Edit Profile
              </button>
              <button onClick={handleDelete} className="btn delete-btn">
                Delete Account
              </button>
            </div>
          </>
        ) : (
          <div className="edit-profile">
            <input
              type="text"
              placeholder="Username"
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
            />
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Phone"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
            />
            <button onClick={handleEdit} className="btn save-btn">
              Save Changes
            </button>
            <button
              onClick={() => setEditMode(false)}
              className="btn cancel-btn"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
