import React, { useCallback, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import BlogCard from "../components/BlogCard";
import Loading from "../components/Loading";

import { useAuth } from "../context api/Auth";

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const baseUri = process.env.REACT_APP_API_URL;
  const auth = useAuth();
  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        throw new Error("No token found");
      }

      const res = await fetch(`${baseUri}api/profile`, {
        headers: {
          method: "GET",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (data?.user?.profilePic) {
        localStorage.setItem("profilePic", data?.user?.profilePic?.url);
      }

      console.log(data);
    } catch (err) {
      console.error("Error fetching photos:", err);
    }
  };
  if (auth.auth === true) {
    fetchProfile();
  }
  const fetchBlogs = async () => {
    try {
      const res = await fetch(`${baseUri}api/post/all`);
      const data = await res.json();
      setBlogs(data);
      console.log(data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching photos:", err);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

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
    <div className="overflow-x-hidden">
      <div className="flex flex-col  max-w-100">
        {blogs.length > 0 &&
          blogs.map((item, index) => {
            return (
              <div key={index}>
                <BlogCard id={item._id} />
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Home;
