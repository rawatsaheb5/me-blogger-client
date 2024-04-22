import React, { useCallback, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import BlogCard from "../components/BlogCard";

const Home = () => {
  const [blogs, setBlogs] = useState([]);

  const baseUri = process.env.REACT_APP_API_URL;
  const fetchBlogs = async () => {
    try {
      const res = await fetch(`${baseUri}api/post/all`);
      const data = await res.json();
      setBlogs(data);
      console.log(data);
    } catch (err) {
      console.error("Error fetching photos:", err);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className="overflow-x-hidden">
      <Navbar />
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

      <Footer />
    </div>
  );
};

export default Home;
