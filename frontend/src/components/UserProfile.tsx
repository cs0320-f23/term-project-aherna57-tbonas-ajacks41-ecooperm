import React, { CSSProperties, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../index.css";

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  profilePictureURL: string;
  updatedAt: Date;
  createdAt: Date;
  // reviews: Review[];
  // favorites: Restaurant[];
}

const UserProfile = () => {
  const [user, setUser] = useState<User | null>(null);
  const userBackground: CSSProperties = {
    backgroundImage: `url('https://www.mowglistreetfood.com/wp-content/uploads/2023/01/Landing_image_Desktop-1024x576.jpg')`,
  };
  const { userId } = useParams();

  useEffect(() => {
    const userItem = localStorage.getItem("user");
    console.log("userItem", userItem);
    if (userItem && userItem !== "undefined") {
      setUser(JSON.parse(userItem));
    }
  }, [userId]);

  return (
    <div className="user-container" style={userBackground}>
      <div className="user-content">
        <div className="user-image">
          {user && (
            <>
              <img
                src={user.profilePictureURL}
                alt="Avatar"
                className="avatar"
              />
            </>
          )}
        </div>

        <div className="user-info">
          <span className="user-name">
            {user && `${user.firstName} ${user.lastName}`}
          </span>
          <span className="user-class">Other information</span>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
