import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const EditProfile = () => {
  const baseUri = process.env.REACT_APP_API_URL;
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    profilePic: null,
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      profilePic: file,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { firstname, lastname, profilePic } = formData;

    const formDataObj = new FormData();
    formDataObj.append("firstname", firstname);
    formDataObj.append("lastname", lastname);
    formDataObj.append("profilePic", profilePic);

    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        throw new Error("No token found");
      }
      const response = await fetch(`${baseUri}api/profile`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formDataObj,
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      //console.log("Form submitted successfully:", data);
toast.success('profile updated successfully!')
      // Optionally reset form fields after successful submission
      navigate('/profile')
      setFormData({
        firstname: "",
        lastname: "",
        profilePic: null,
      });
    } catch (error) {
      toast.error('failed to update profile!')
      console.error("Error submitting form:", error);
      // Handle error and display to user
    }
  };

  return (
    <div className="max-w-md mx-auto mt-25 bg-white p-8 border rounded-lg shadow-lg">
      <h2 className="text-2xl text-center font-semibold mb-4">Edit Profile</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="firstname"
            className="block text-sm font-medium text-gray-700"
          >
            First Name:
          </label>
          <input
            type="text"
            id="firstname"
            name="firstname"
            value={formData.firstname}
            onChange={handleInputChange}
            className="mt-1 p-1 border border-gray-300 rounded-md w-full"
            
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="lastname"
            className="block text-sm font-medium text-gray-700"
          >
            Last Name:
          </label>
          <input
            type="text"
            id="lastname"
            name="lastname"
            value={formData.lastname}
            onChange={handleInputChange}
            className="mt-1 p-1 border border-gray-300 rounded-md w-full"
            
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="image"
            className="block text-sm font-medium text-gray-700"
          >
            Profile Image:
          </label>
          <input
            type="file"
            id="image"
            name="profilePic"
            onChange={handleFileChange}
            accept="image/*"
            className="mt-1 p-1 border border-gray-300 rounded-md w-full"
            
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-300"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
