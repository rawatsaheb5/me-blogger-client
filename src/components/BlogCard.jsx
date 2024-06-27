import React, { useEffect, useState } from "react";
import { CiHeart } from "react-icons/ci";
import { FaRegComment, FaHeart } from "react-icons/fa";
import { MdDelete, MdEdit } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import CommentForm from "./CommentForm";
import Loading from "./Loading";
import data from '../data/image';

const baseUri = process.env.REACT_APP_API_URL;

const BlogCard = ({ id }) => {
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [postAuthor, setPostAuthor] = useState(null);
  const [post, setPost] = useState();
  const [isLoggedInUserLikedPost, setIsLoggedInUserLikedPost] = useState(false);
  const [avatar, setAvatar] = useState(data.profileImage);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch post, author, and like status when component mounts or post likes change
  useEffect(() => {
    handleGetAuthor();
    handleCheckLike();
    handleGetPostByPostId();
  }, [post?.likes.length]);

  // Toggle comment form visibility
  const toggleCommentForm = () => {
    setShowCommentForm(!showCommentForm);
  };

  // Handle like button click
  const clickToLikes = async () => {
    try {
      const token = localStorage.getItem("authToken");
      await fetch(`${baseUri}api/like/create-like/${id}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      handleGetPostByPostId();
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch post data by post ID
  const handleGetPostByPostId = async () => {
    try {
      const res = await fetch(`${baseUri}api/post/single/${id}`);
      const data = await res.json();
      setPost(data);
      setLoading(false)
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch author data
  const handleGetAuthor = async () => {
    try {
      const res = await fetch(`${baseUri}api/post/author/${id}`);
      const data = await res.json();
      setPostAuthor(data);
      if (data.author?.profilePic) {
        setAvatar(data.author?.profilePic?.url);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Check if the logged-in user liked the post
  const handleCheckLike = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user?.userId;
    setIsLoggedInUserLikedPost(post?.likes?.includes(userId));
  };

  // Format the time ago string
  const formattedTime = formatTimeAgo(post?.createdAt);
  if (loading) {
    return (
      <div>
        <div className="flex justify-center items-center h-screen">
          <Loading loading={loading} />
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-col max-w-lg w-full mx-auto mb-[4%] rounded-lg shadow-lg ">
      <div className="w-full p-6 flex items-center">
        <div>
          <img
            className="rounded-full h-14 w-14 object-cover border-2 border-red-600"
            src={avatar}
            alt="author"
          />
        </div>
        <div className="pl-4">
          <h4 className="text-lg font-sans font-semibold">
            {postAuthor ? postAuthor?.author?.username : "username"}
          </h4>
          <p className="text-sm font-normal">
            {formattedTime ? formattedTime : "00:00"}
          </p>
        </div>
      </div>
      <div className="p-6 pt-0">
        <h3 className="text-base font-medium text-gray-800 mt-0">
          {post?.title}
        </h3>
      </div>
      <div className="relative h-48 w-full">
        <img
          onClick={() => navigate("/post-page", { state: id })}
          src={post?.image.url}
          alt="Blog Image"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
      <div className="pl-6 mt-2 mb-5">
        <p className="text-gray-700 text-sm font-normal mb-4">
          {post?.description}
        </p>
      </div>
      <div className="pl-6 flex justify-start align-items pb-6">
        <span className="pr-20 flex cursor-pointer">
          {isLoggedInUserLikedPost === true ? (
            <FaHeart color="red"  onClick={clickToLikes} size={30} />
          ) : (
            <CiHeart onClick={clickToLikes} size={30} />
          )}
          <span className="pl-2 font-medium">{post?.likes.length || 0}</span>
        </span>
        <span className="pr-20 flex cursor-pointer">
          <FaRegComment onClick={toggleCommentForm} size={30} />
          <span className="pl-2 font-medium">{post?.comments.length || 0}</span>
        </span>
      </div>
      {showCommentForm && (
        <CommentForm handleGetPostByPostId={handleGetPostByPostId} postId={id} />
      )}
    </div>
  );
};

// Function to format time ago string
export function formatTimeAgo(createdTime) {
  const currentTime = new Date();
  const updatedTime = new Date(createdTime);

  const timeDifference = currentTime - updatedTime;
  const seconds = Math.floor(timeDifference / 1000); // Convert milliseconds to seconds
  const minutes = Math.floor(seconds / 60); // Convert seconds to minutes
  const hours = Math.floor(minutes / 60); // Convert minutes to hours
  const days = Math.floor(hours / 24); // Convert hours to days

  if (hours < 24) {
    if (hours === 0) {
      return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
    } else {
      return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
    }
  } else if (days <= 10) {
    return `${days} day${days !== 1 ? "s" : ""} ago`;
  } else {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    };
    return updatedTime.toLocaleDateString("en-US", options);
  }
}

export default BlogCard;
