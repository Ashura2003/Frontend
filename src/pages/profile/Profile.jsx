import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";
import "./Profile.css";

const Profile = () => {
  const { url } = useContext(StoreContext);
  const [user, setUser] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    profilePicture: "",
  });
  const [newProfilePicture, setNewProfilePicture] = useState(null);
  const [previewPicture, setPreviewPicture] = useState(null);
  const [password, setPassword] = useState("");

  const token = localStorage.getItem("token");

  const fetchUserProfile = async () => {
    try {
      const response = await axios.get(`${url}/user/get_user`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const { username, email, phone, profilePicture } = response.data.user;
      setUser(response.data.user);
      setFormData({ username, email, phone, profilePicture });
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  const handleEdit = async () => {
    try {
      const formDataToSubmit = new FormData();
      formDataToSubmit.append("username", formData.username);
      formDataToSubmit.append("email", formData.email);
      formDataToSubmit.append("phone", formData.phone);

      if (newProfilePicture) {
        formDataToSubmit.append("image", newProfilePicture);
      }

      const response = await axios.post(
        `${url}/user/edit_user`,
        formDataToSubmit,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert(response.data.message);
      setEditMode(false);
      fetchUserProfile();
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
      alert(response.data.message);
      localStorage.removeItem("token");
      window.location.href = "/"; // Redirect to login page
    } catch (error) {
      console.error("Error deleting account:", error);
    }
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewProfilePicture(file);
      setPreviewPicture(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  return (
    <div className="profile-page">
      <h1>Profile Page</h1>
      <div className="profile-card">
        <img
          src={`http://localhost:5000/profile/uploads/${user.image}`}
          alt={assets.placeholder}
          className="profile-pic"
        />
        {!editMode ? (
          <div className="profile-details">
            <p>
              <strong>Username:</strong> {user.username}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>Phone:</strong> {user.phone}
            </p>
            <button onClick={() => setEditMode(true)} className="btn edit-btn">
              Edit Profile
            </button>
            <div className="delete-section">
              <input
                type="password"
                placeholder="Enter password to delete"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button onClick={handleDelete} className="btn delete-btn">
                Delete Account
              </button>
            </div>
          </div>
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
            <div className="profile-picture-upload">
              <label>Change Profile Picture:</label>
              <input type="file" onChange={handleProfilePictureChange} />
            </div>
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
