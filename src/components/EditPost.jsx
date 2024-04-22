import React, { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const EditPost = () => {
  const baseUri = process.env.REACT_APP_API_URL;
  const location = useLocation().state.data;
  const id = useLocation().state.id;
  console.log(id);

  // console.log(location);
  const [formData, setFormData] = useState({
    title: location.title || "",
    description: location.description || "",
    image: location.image || null,
  });
  const [err, setError] = useState();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: name === "image" ? files[0] : value,
    });
  };

  const handleUpdatePost = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("authToken"); // Replace with your actual access token
    const formDataToSubmit = new FormData();
    // Append form fields to the FormData object
    formDataToSubmit.append("title", formData.title);
    formDataToSubmit.append("description", formData.description);
    formDataToSubmit.append("image", formData.image); // Assuming formData.image is a File object
    console.log('form data to submit => ',formDataToSubmit)
    try {
      const response = await fetch(
        `${baseUri}api/post/edit-post/${id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formDataToSubmit, // Set FormData object as the body of the request
        }
      );

      if (response.ok) {
        // Login successful, redirect to dashboard or home page
toast.success('post updated successfully!')
        navigate("/");
      } else {
        toast.error('failed to update post!')
        // Login failed, display error message
      }
    } catch (error) {
      toast.error('failed to update post!')
      setError("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Edit Post
      </h2>
      <form>
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-600"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-600"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            rows="4"
            
          ></textarea>
        </div>
        <div className="mb-4">
          <label
            htmlFor="image"
            className="block text-sm font-medium text-gray-600"
          >
            Image
          </label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleChange}
            accept="image/*"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            
          />
        </div>
        <button
          type="submit"
          onClick={handleUpdatePost}
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
        >
          Update Post
        </button>
      </form>
    </div>
  );
};

export default EditPost;
