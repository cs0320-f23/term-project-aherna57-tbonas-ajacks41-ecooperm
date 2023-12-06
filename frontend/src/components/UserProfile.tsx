import React, { CSSProperties, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../index.css";

/// intrface placeholder for now --- update when reviews are implemented
interface Review {

}


interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  profilePictureURL: string;
  updatedAt: Date;
  createdAt: Date;
  reviews: Review[];
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
      let user = JSON.parse(userItem);
      setUser(user);
    }
  }, [userId]);

  const getMembershipStatus = (reviews: Review[]) => {
    const numberOfReviews = reviews.length;
    if (numberOfReviews <= 3) return "Brunonian Bites Novice";
    if (numberOfReviews <= 6) return "Pembroke Palate Explorer";
    if (numberOfReviews <= 10) return "Ivy League Gastronome";
    if (numberOfReviews <= 20) return "College Hill Culinary Connoisseur";
    return "President's Table Elite";
  };

  return (
    <div>
      <div className="user-container" style={userBackground}>
        {/* User Top Container */}
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
            <span className="user-class">
              {user && getMembershipStatus(user.reviews)}
            </span>
          </div>
        </div>
      </div>

      <div className="ab-container">
        {/* About Section */}
        <div className="wrapper-about">
          <span className="header-text">About</span>
          <hr className="divider" />
          <span className="about-info">bio</span>
          <span className="about-info">Email: </span>
          <span className="about-info-ans">nikjone@demoo.com</span>
          <span className="about-info">Phone:</span>
          <span className="about-info-ans">001235125612</span>
          <span className="about-info">Location:</span>
          <span className="about-info-ans">USA</span>
        </div>

        {/* Suggestions Section */}
        <div className="sug-container">
          <span className="header-text">Suggestions</span>
          <hr className="divider" />
          <div className="wrapper-suggestions">
            <span>restaurant 1</span>
            <hr className="divider" />
            <span>restaurant 2</span>
            <hr className="divider" />
            <span>restaurant 3</span>
            <hr className="divider" />
            <span>restaurant 4</span>
            <hr className="divider" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
