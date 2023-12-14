import { CSSProperties, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../styles/UserProfile.css";
import UserAbout from "./UserAbout";
import Review from "./Review";

/** The UserProfile component is a React functional component responsible for rendering a user's profile page. 
 * It includes sections for the user's profile picture, name, and membership status based on the number of reviews. 
 * The component utilizes the UserAbout and Review components to display additional details about the user and their reviews. 
 * The overall purpose of the file is to provide a visually appealing and informative user profile page. */

// Interface placeholder for reviews (to be updated when reviews are implemented)
interface Review {
  // Define review properties
}

// Interface definition for the User object
interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  profilePictureURL: string;
  updatedAt: Date;
  createdAt: Date;
  reviews: Review[];
}

// Functional component definition for the UserProfile component
const UserProfile = () => {
  // State variable to manage user data
  const [user, setUser] = useState<User | null>(null);

  // Style for setting the background image of the user container
  const userBackground: CSSProperties = {
    backgroundImage: `url('https://www.mowglistreetfood.com/wp-content/uploads/2023/01/Landing_image_Desktop-1024x576.jpg')`,
  };

  // Extracting userId from the route parameters
  const { userId } = useParams();

  // useEffect hook to fetch and set user data from local storage
  useEffect(() => {
    const userItem = localStorage.getItem("user");
    if (userItem && userItem !== "undefined") {
      let user = JSON.parse(userItem);
      setUser(user);
    }
  }, [userId]);

  // Function to determine membership status based on the number of reviews
  const getMembershipStatus = (reviews: Review[]) => {
    const numberOfReviews = reviews.length;
    if (numberOfReviews <= 3) return "Brunonian Bites Novice";
    if (numberOfReviews <= 6) return "Pembroke Palate Explorer";
    if (numberOfReviews <= 10) return "Ivy League Gastronome";
    if (numberOfReviews <= 20) return "College Hill Culinary Connoisseur";
    return "President's Table Elite";
  };

  // JSX structure for the UserProfile component
  return (
    <div>
      {/* User Container with Background Image */}
      <div className="user-container" style={userBackground}>
        {/* User Top Container */}
        <div className="user-content">
          {/* User Image */}
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

          {/* User Information */}
          <div className="user-info">
            {/* Displaying user name and membership status */}
            <span className="user-name">
              {user && `${user.firstName} ${user.lastName}`}
            </span>
            <span className="user-class">
              {user && getMembershipStatus(user.reviews)}
            </span>
          </div>
        </div>
      </div>

      {/* Main User Container */}
      <div className="main-user-container">
        {/* Left Container for User Reviews */}
        <div className="left-container">
          {/* Review Component */}
          <Review />
        </div>

        {/* Right Container for User About & Suggestions */}
        <div className="right-container">
          {/* UserAbout Component */}
          <UserAbout />
        </div>
      </div>
    </div>
  );
};

// Default export for the UserProfile component
export default UserProfile;
