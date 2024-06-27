import React, { useState, useRef, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context api/Auth";
import { toast } from "react-toastify";
import data from "../data/image";
const ProfileMenu = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [username, setUsername] = useState("username");
  const [profilePic, setProfilePic] = useState(data.profileImage);
  const navigate = useNavigate();
  const menuRef = useRef(null);
  const auth = useAuth();
  // Toggle menu visibility
  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    setUsername(user?.username);
    if (localStorage.getItem("profilePic")) {
      setProfilePic(localStorage.getItem("profilePic"));
    }
  }, []);
  // Close menu if clicking outside of it
  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setShowMenu(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle logout
  const handleLogout = () => {
    auth.setAuth(false);
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    localStorage.removeItem("profilePic");
    //toast.success("Sign out successful!");
    toast.success("sign out successful!");
    navigate("/signin");
  };

  return (
    <div className="relative" ref={menuRef}>
      {auth.auth === true ? (
        <>
          <div onClick={toggleMenu} className="cursor-pointer ">
            <img
              src={profilePic} // Replace with actual profile image URL
              alt="Profile"
              className="h-8 w-8 rounded-full border-solid border-2 border-sky-500 "
            />
          </div>
          {showMenu && (
            <div className="absolute right-0 mt-2 w-56 bg-white border rounded-md shadow-lg z-20">
              <div className="p-4 flex items-center border-b">
                <img
                  src={profilePic} // Replace with actual profile image URL
                  alt="Profile"
                  className="h-10 w-10 rounded-full border-solid border-2 border-sky-500"
                />
                <span className="ml-2 font-medium">{username}</span>
              </div>
              <button
                className="w-full text-left px-4 py-2  font-sans text-white-700 hover:bg-gray-100"
                onClick={() => navigate("/profile")}
              >
                My Profile
              </button>
              <hr className="my-2" />
              <button
                className="w-full text-center px-4 py-2 text-red-600 font-sans font-semibold hover:bg-gray-100"
                onClick={handleLogout}
              >
                LOGOUT
              </button>
            </div>
          )}
        </>
      ) : (
        <>
          <FaUserCircle
            size={40}
            color="white"
            className="cursor-pointer"
            onClick={toggleMenu}
          />
          {showMenu && (
            <div className="absolute right-0 mt-2 w-56 bg-white border  shadow-lg z-20 font-sans ">
              <div className="p-4 flex items-center border-b">
                <img
                  src={data.profileImage} // Replace with actual profile image URL
                  alt="Profile"
                  className="h-14 w-14 rounded-full"
                />
                <span className="ml-2 font-medium">User</span>
              </div>
              <button
                className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 font-semibold text-sm"
                onClick={() => navigate("/signup")}
              >
                Sign Up
              </button>
              <button
                className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 font-semibold text-sm"
                onClick={() => navigate("/signin")}
              >
                Sign In
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ProfileMenu;
