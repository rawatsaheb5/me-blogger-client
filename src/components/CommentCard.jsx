import React, { useEffect, useState } from "react";
import { formatTimeAgo } from "./BlogCard";
import { MdModeEditOutline } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import EditCommentCard from "./EditCommentCard";
import { toast } from "react-toastify";
import data from "../data/image";

const CommentCard = ({ author, text, profilePic, createdAt, id, handleGetAllComments }) => {
  const baseUri = process.env.REACT_APP_API_URL;
  const formatedTime = formatTimeAgo(createdAt);
  const [yourComment, setYourComment] = useState(false);
  const [toggleEditComment, setToggleEditComment] = useState(false);
  const [avatar, setAvatar] = useState(profilePic || data.profileImage
  );
  //console.log('author',author)
  const handleToggleEditComment = () => {
    setToggleEditComment(!toggleEditComment);
  };
  useEffect(() => {
    handleCheckYourComment();
  },[])
  const handleCheckYourComment = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const username = user?.username;
    //console.log("username => ", username);
    setYourComment(author === username);
  };
  
  const handleDeleteYourComment = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const res = await fetch(
        `${baseUri}api/comment/delete-comment/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      handleGetAllComments()
      toast.success('comment deleted successfully!')
    } catch (error) {
      toast.error('failed to delete comment')
      console.log(error);
    }
  };
  

  return (
    <div className="flex flex-col p-4 m-2 bg-zinc-500 rounded">
      <div className="flex items-center justify-between ">
        <span className="flex items-center ">
          <img
            className="rounded-full h-10 w-10 object-cover border-2 border-red-600 mr-4	"
            src={avatar}
            alt="pic"
          />
          <span>
            <h4 className="text-base font-semibold">{author}</h4>
            <p className="text-xs font-normal">{formatedTime}</p>
          </span>
        </span>
        {yourComment === true && (
          <span className=" cursor-pointer">
            <MdModeEditOutline onClick={handleToggleEditComment} size={30} />
          </span>
        )}
        {yourComment === true && (
          <span className=" cursor-pointer">
            <MdDelete onClick={handleDeleteYourComment} size={30} />
          </span>
        )}
      </div>
          <div className="text-base font-medium mt-4">{text}</div>
          {toggleEditComment===true && <EditCommentCard handleGetAllComments={handleGetAllComments} commentId={id}/>}
    </div>
  );
};

export default CommentCard;
