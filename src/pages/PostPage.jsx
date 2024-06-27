import React, { useEffect, useState } from "react";
import { CiHeart } from "react-icons/ci";
import { FaRegComment } from "react-icons/fa";

import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { useLoaderData, useLocation, useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import CommentForm from "../components/CommentForm";
import CommentCard from "../components/CommentCard";
import data from "../data/image";


const PostPage = () => {

  const baseUri = process.env.REACT_APP_API_URL;
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [postAuthor, setPostAuthor] = useState(null);
  const [post, setPost] = useState();
  const [isLoggedInUserLikedPost, setIsLoggedInUserLikedPost] = useState(false);
  const [comments, setComments] = useState();
  const [avatar, setAvatar] = useState(data.profileImage);
  const navigate = useNavigate();

  const id = useLocation().state;
  console.log(id);
  useEffect(() => {
    handleGetPostByPostId();
    handleGetAuthor();
    handleCheckLike();
    handleGetAllComments();
  }, []);

  const toggleCommentForm = () => {
    setShowCommentForm(!showCommentForm);
  };

  const handleGetAllComments = async () => {
    try {
      const res = await fetch(
        `${baseUri}api/comment/all-comments/${id}`
      );
      const data = await res.json();
      setComments(data);
    } catch (error) {
      console.log(error);
    }
  };
  

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
      if (data.author?.profilePic) {
        setAvatar(data.author?.profilePic?.url);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleCheckLike = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user?.userId;
    setIsLoggedInUserLikedPost(post?.likes.includes(userId));
  };
  const clickToAddComment = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const res = await fetch(
        `{baseUri}api/comment/create-comment/${id}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      handleGetPostByPostId()
      
    } catch (error) {
      console.log(error);
    }
  };

  const formattedTime = formatTimeAgo(post?.createdAt);

  console.log('post => ', comments)

 
  return (
    <div className="flex flex-col max-w-lg w-full ml-[20%] mb-[4%] rounded-lg shadow-lg  overflow-hidden">
      <div className="w-full p-6 flex items-center ">
        <div className=" ">
          <img
            className="rounded-full h-14 w-14 object-cover border-2 border-red-600	"
            src={
             avatar
            }
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
          src={post?.image?.url}
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

      {showCommentForm && <CommentForm handleGetPostByPostId={handleGetPostByPostId} handleGetAllComments={handleGetAllComments} postId={id} />}
      {comments  &&
        comments.map((item, index) => {
          return (
            <div className="flex flex-col " key={index}>
              <CommentCard
                author={item.author}
                text={item.text}
                profilePic={item.profilePic?.url}
                createdAt={item.createdAt}
                id={item._id}
                handleGetAllComments = {handleGetAllComments}
              />
            </div>
          );
        })}
    </div>
  );
};



function formatTimeAgo(createdTime) {
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

export default PostPage;
