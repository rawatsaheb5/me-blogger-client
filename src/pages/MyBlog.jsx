// components/PhotoGallery.js
import React, { useState, useEffect } from "react";
import BlogCard from "../components/BlogCard";
import MyCard from "../components/MyCard";
const PhotoGallery = () => {
  const baseUri = process.env.REACT_APP_API_URL;
  const [myBlogs, setMyBlogs] = useState([]);

  const fetchMyBlogs = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        throw new Error("No token found");
      }

      const res = await fetch(`${baseUri}api/post/all-posts`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setMyBlogs(data);
      console.log(data);
      // Update state with fetched photos
    } catch (err) {
      //console.error('Error fetching photos:', err);
    }
  };

  useEffect(() => {
    fetchMyBlogs(); // Fetch photos on component mount
  }, []);

  console.log(myBlogs);
  return (
     myBlogs.length > 0 && (
      <div>
        <h2 className="text-center font-extrabold text-3xl my-10">My Blogs</h2>
        <div >
          {myBlogs &&
            myBlogs.map((item, index) => {
              return (
                <div key={index}>
                  
                  <MyCard id={item._id} fetchMyBlogs={fetchMyBlogs}/>
                </div>
              );
            })}
        </div>
      </div>
    )
  );
};

export default PhotoGallery;
