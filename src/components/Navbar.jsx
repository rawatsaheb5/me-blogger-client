import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context api/Auth";
import { toast } from "react-toastify";

const Navbar = () => {
  const auth = useAuth();
  console.log(auth);

  const navigate = useNavigate();
  //console.log(auth);
  const handleSignOut = () => {
    auth.setAuth(false);
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    //toast.success("Sign out successful!");
    toast.success('sign out successful!')
    navigate("/signin");
  };
  return (
    <div className="bg-gray-800 py-2 px-[10%]">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex-shrink-0  rounded-xl">
          <img
            src="https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg"
            alt="Logo"
            className="h-10 rounded-[4px]"
          />
        </div>

        {/* Navigation Links */}
        <ul className="flex space-x-4 text-white">
          <li>
            <Link to="/" className="hover:text-gray-300">
              Home
            </Link>
          </li>
          <li>
            <Link to="/my-blog" className="hover:text-gray-300">
              My Blog
            </Link>
          </li>
          <li>
            <Link to="/create-blog" className="hover:text-gray-300">
              Create Blog
            </Link>
          </li>
          {auth.auth === true ? (
            <>
              <li>
                <Link to="/profile" className="hover:text-gray-300">
                  Profile
                </Link>
              </li>
              <li>
                <Link
                  to="/signin"
                  onClick={handleSignOut}
                  className="hover:text-gray-300"
                >
                  Logout
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/signup" className="hover:text-gray-300">
                  Sign Up
                </Link>
              </li>
              <li>
                <Link to="/signin" className="hover:text-gray-300">
                  Sign In
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
