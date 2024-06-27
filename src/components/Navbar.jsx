import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context api/Auth";
import { toast } from "react-toastify";
import { CgProfile } from "react-icons/cg";
import { RxHamburgerMenu } from "react-icons/rx";
import { RxCross2 } from "react-icons/rx";
import ProfileMenu from "./ProfileMenu";

const Navbar = () => {
  const auth = useAuth();
  console.log(auth);
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navigate = useNavigate();
  //console.log(auth);
  const handleSignOut = () => {
    auth.setAuth(false);
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    //toast.success("Sign out successful!");
    toast.success("sign out successful!");
    navigate("/signin");
  };
  return (
    <>
      <nav className="bg-gray-800 lg:px-40">
        <div className="container mx-auto flex justify-between items-center ">
          <div className="flex items-center">
            <img
              src={`${process.env.PUBLIC_URL}/logo.png`}
              alt="Logo"
              className="h-14 w-20"
            />
            
          </div>

          <div className="hidden md:flex space-x-4 items-center">
            <Link to="/" className="text-gray-300 hover:text-white">
              Home
            </Link>
            <Link to="/my-blog" className="text-gray-300 hover:text-white">
              My Blog
            </Link>
            <Link to="/create-blog" className="text-gray-300 hover:text-white">
              Create Blog
            </Link>
            <ProfileMenu />
          </div>
          <div className="md:hidden flex justify-between items-center ">
            <div className="mr-5">
              <ProfileMenu />
                
            </div>
            <div className="md:hidden">
              {isOpen ? (
                <RxCross2 size={25} color="white" onClick={toggleMenu} />
              ) : (
                <RxHamburgerMenu size={25} color="white" onClick={toggleMenu} />
              )}
            </div>
          </div>
        </div>

        {isOpen && (
          <div className="bg-blue md:hidden ">
            <Link
              to="/"
              className="block px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white"
            >
              Home
            </Link>
            <Link
              to="/my-blog"
              className="block px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white"
            >
              My Blog
            </Link>
            <Link
              to="/create-blog"
              className="block px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white"
            >
              Create Blog
            </Link>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
