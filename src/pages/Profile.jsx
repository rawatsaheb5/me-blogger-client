import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import data from "../data/image";
import Loading from "../components/Loading";
const Profile = () => {
  const baseUri = process.env.REACT_APP_API_URL;
  const [userProfile, setUserProfile] = useState();
  const [avatar, setAvatar] = useState(data?.profileImage);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  useEffect(() => {
    getYourProfile();
  }, []);

  const handleEditProfile = () => {
    navigate("/edit-profile");
  };
  const getYourProfile = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const res = await fetch(`${baseUri}api/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setUserProfile(data.user);
      if (data?.user?.profilePic?.url) {
        setAvatar(data?.user?.profilePic?.url )
      }
      
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return (
      <div>
        <div className="flex justify-center items-center h-screen">
          <Loading

          loading={loading} />
        </div>
      </div>
    );
  }
  

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg flex flex-col">
      <h2 className="text-2xl text-center font-bold text-gray-800 mb-4">
        My Profile
      </h2>
      <div className="flex items-center ">
        <img
          className="rounded-full h-20 w-20 object-cover border-2 border-red-600	mr-14"
          src={avatar}
          alt="profile-pic"
        />
        <h3 className="font-bold text-2xl">{userProfile?.username}</h3>
      </div>
      <div className="flex flex-col mt-10 ">
        {userProfile?.firstname && (
          <div className="flex justify-between bg-gray-300 p-2 mb-2">
            <h3>First Name</h3>

            <div className="font-medium text-base">
              {userProfile?.firstname}
            </div>
          </div>
        )}
        {userProfile?.lastname && (
          <div className="flex justify-between bg-gray-300 p-2 mb-2">
            <h3>Last Name</h3>

            <div className="font-medium text-base">{userProfile?.lastname}</div>
          </div>
        )}

        <div className="flex flex-wrap justify-between rounded bg-gray-300 p-2 mb-2">
          <h3>Email</h3>

          <div className="font-medium text-base">{userProfile?.email}</div>
        </div>
      </div>
      <button onClick={handleEditProfile} className="flex justify-center font-bold text-blue-950 bg-red-300 rounded p-2  mb-2 mt-4">
        Edit Profile
      </button>
    </div>
    
  );
};

export default Profile;
