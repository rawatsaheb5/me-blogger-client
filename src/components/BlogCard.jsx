import React, { useEffect, useState } from "react";
import { CiHeart } from "react-icons/ci";
import { FaRegComment } from "react-icons/fa";
import CommentForm from "./CommentForm";
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa";


const userImage =
  "https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png";

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

const BlogCard = ({ id }) => {
  const baseUri = process.env.REACT_APP_API_URL;
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [postAuthor, setPostAuthor] = useState(null);
  const [post, setPost] = useState();
  const [isLoggedInUserLikedPost, setIsLoggedInUserLikedPost] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    
    handleGetAuthor();
    handleCheckLike();
    handleGetPostByPostId();
  }, [post?.likes.length ]);

  const toggleCommentForm = () => {
    setShowCommentForm(!showCommentForm);
  };

  // for like

  const clickToLikes = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const res = await fetch(
        `${baseUri}api/like/create-like/${id}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();
      handleGetPostByPostId();
      
    } catch (error) {
      console.log(error);
    }
  };
  const handleGetPostByPostId = async () => {
    try {
      const res = await fetch(`${baseUri}api/post/single/${id}`);
      const data = await res.json();
      setPost(data);
      
    } catch (error) {
      console.log(error);
    }
  };
  const handleGetAuthor = async () => {
    try {
      const res = await fetch(`${baseUri}api/post/author/${id}`);
      const data = await res.json();
      setPostAuthor(data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleCheckLike = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user?.userId;
    setIsLoggedInUserLikedPost(post?.likes?.includes(userId));
  };
  

  
  console.log(post);
  const formattedTime = formatTimeAgo(post?.createdAt);
  

  if (!postAuthor) {
    return <div>Loading...</div>;
  }
  let Avator =
    "https://png.pngtree.com/png-clipart/20230404/original/pngtree-male-avator-icon-png-image_9025232.png";
  if (postAuthor?.author?.profilePic !== "default_post_image.jpg") {
    Avator = `${baseUri}uploads/` + postAuthor?.author.profilePic;
  }


  return (
    <div
      
      className="flex flex-col max-w-lg w-full mx-auto   mb-[4%] rounded-lg shadow-lg  "
    >
      <div className="w-full p-6 flex items-center ">
        <div className=" ">
          <img
            className="rounded-full h-14 w-14 object-cover border-2 border-red-600	"
            src={Avator}
            alt="author"
          />
        </div>
        <div className="pl-4">
          <h4 className="text-lg font-semibold">
            {postAuthor ? postAuthor.author.username : "username"}
          </h4>
          <p className="text-sm font-medium">
            {formattedTime ? formattedTime : "00:00"}
          </p>
        </div>
      </div>
      <div className="p-6 pt-0">
        <h3 className="text-xl font-semibold text-gray-800 mt-0 ">
          {post?.title}
        </h3>
      </div>

      <div>
        <img
          onClick={() => navigate("/post-page", { state: id })}
          src={`${baseUri}uploads/` + post?.image}
          alt="Blog Image"
          className=" h-48 w-full object-cover "
        />
      </div>

      <div className="pl-6 mt-2 mb-5">
        <p className="text-gray-700 font-medium text-base  mb-4">
          {post?.description}
        </p>
      </div>
      <div className="pl-6 flex justify-start align-items pb-6">
        <span className="pr-20 flex cursor-pointer">
          {isLoggedInUserLikedPost === true ? (
            <FaHeart color="red" onClick={clickToLikes} size={30} />
          ) : (
            <CiHeart onClick={clickToLikes} size={30} />
          )}

          <span className="pl-2 font-medium">{post?.likes.length || 0}</span>
        </span>
        <span className=" pr-20 flex cursor-pointer">
          <FaRegComment onClick={toggleCommentForm} size={30} />
          <span className="pl-2 font-medium">{post?.comments.length || 0}</span>
        </span>
      </div>

      {showCommentForm && <CommentForm handleGetPostByPostId={handleGetPostByPostId} postId={id}  />}
    </div>
  );
};

export default BlogCard;
