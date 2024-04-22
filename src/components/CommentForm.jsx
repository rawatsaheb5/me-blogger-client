import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const CommentForm = ({ postId, handleGetPostByPostId, handleGetAllComments }) => {
  const baseUri = process.env.REACT_APP_API_URL;
  const [commentText, setCommentText] = useState("");

  const handleChange = (e) => {
    setCommentText(e.target.value);
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("authToken"); // Retrieve user token
      const response = await fetch(
        `${baseUri}api/comment/create-comment/${postId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            text: commentText,
          }),
        }
      );

      if (response.ok) {
        toast.success('comment added successfully!')
        setCommentText("");
        handleGetPostByPostId();// updating ui after comments
        handleGetAllComments()
        
      } else {
        // Handle error if comment submission fails
        toast.error('failed to add comment')
        
      }
    } catch (error) {
      
      console.error("Error adding comment:", error);
    }
  };

  return (
    <div className="mt-2 mb-2">
      <form onSubmit={handleSubmit} className="flex items-center space-x-2">
        <input
          type="text"
          placeholder="Add a comment..."
          value={commentText}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
        >
          Post
        </button>
      </form>
    </div>
  );
};

export default CommentForm;
