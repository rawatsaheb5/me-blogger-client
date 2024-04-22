import React, { useEffect, useState } from "react";
import { CiHeart } from "react-icons/ci";
import { FaRegComment } from "react-icons/fa";
import CommentForm from "./CommentForm";
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { formatTimeAgo } from "./BlogCard";
import { toast } from "react-toastify";

const userImage =
  "https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png";



const BlogCard = ({ id, fetchMyBlogs }) => {
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
  }, [post?.likes?.length ]);

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
  

  const handleDeletePost = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const res = await fetch(
        `${baseUri}api/post/delete-post/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();
      toast.success('post deleted successfully!')
      fetchMyBlogs()
    } catch (error) {
      toast.error('failed to delete post!')
      console.log(error);
    }
  };
  
  console.log(post);
  const formattedTime = formatTimeAgo(post?.createdAt);



  if (!post) {
    return <div>
      Loading...
    </div>
  }
  if (!postAuthor) {
    return <div>Loading...</div>;
  }
  const handlePostEdit = async () => {
    navigate(`/post-edit/`, {
      state: {
        id,
        data: {
          title:post.title,
          description: post.description,
          image:post.image,
        },
      },
    });
  };
  let Avator =
    "https://png.pngtree.com/png-clipart/20230404/original/pngtree-male-avator-icon-png-image_9025232.png";
  if (postAuthor?.author?.profilePic !== "default_post_image.jpg") {
    Avator = `${baseUri}uploads/` + postAuthor?.author?.profilePic;
  }
  return (
    <div className="flex flex-col max-w-lg w-full mx-auto mb-[4%] rounded-lg shadow-lg  overflow-hidden">
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
            {postAuthor ? postAuthor?.author?.username : "username"}
          </h4>
          <p className="text-sm font-medium">
            {formattedTime ? formattedTime : "00:00"}
          </p>
        </div>
      </div>
      <div className="p-6 pt-0">
        <h3 className="text-xl font-semibold text-gray-800 mt-0 ">{post.title }</h3>
      </div>

      <div>
        <img
          src={`${baseUri}uploads/`+post.image }
          alt="Blog Image"
          className=" h-48 w-full object-cover "
        />
      </div>

      <div className="pl-6 mt-2 mb-5">
        <p className="text-gray-700 font-medium text-base  mb-4">
          {post.description}
        </p>
      </div>
      <div className="pl-6 flex justify-start align-items pb-6">
        <span className="pr-20 flex cursor-pointer">
          <CiHeart onClick={clickToLikes} size={30} />
          <span className="pl-2 font-medium">{post?.likes?.length || 0}</span>
        </span>
        <span className=" pr-20 flex cursor-pointer">
          <FaRegComment onClick={toggleCommentForm} size={30} />
          <span className="pl-2 font-medium">{post?.comments?.length || 0}</span>
        </span>
        <span className=" pr-20 flex cursor-pointer">
          <MdEdit onClick={handlePostEdit} size={30} />
        </span>
        <span className=" pr-20 flex cursor-pointer">
          <MdDelete onClick={handleDeletePost} size={30} />
        </span>
      </div>

      {showCommentForm && <CommentForm postId={id} handleGetPostByPostId={handleGetPostByPostId} />}
    </div>
  );
};

export default BlogCard;
