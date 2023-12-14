import "../styles/UserAbout.css";

/**The UserAbout component is a React functional component that retrieves and displays user information stored in local storage. 
 * It includes sections for the user's bio, email, phone, and location. In case of any parsing errors or missing user data, 
 * the component returns a message indicating the absence of user data. Additionally, the component displays a section for restaurant 
 * suggestions with placeholder names. The overall purpose of the file is to present a structured and visually appealing display of 
 * user information and restaurant suggestions. */

// Functional component definition for the UserAbout component
const UserAbout = () => {
  // Retrieving user data from local storage
  const userItem = localStorage.getItem("user");
  let user = null;

  // Parsing user data and handling potential errors
  if (userItem && userItem !== "undefined") {
    try {
      user = JSON.parse(userItem);
    } catch (e) {
      // Log and clear local storage in case of parsing error
      console.error("Error parsing user data:", e);
      localStorage.clear();
    }
  }

  // Return a message if no user data is available
  if (!user) {
    return <div>No user data available</div>;
  }

  // JSX structure for the UserAbout component
  return (
    <div className="ab-container">
      {/* About Section */}
      <div className="wrapper-about">
        <span className="header-text">About</span>
        <hr className="divider" />

        {/* Displaying user bio, email, phone, and location */}
        <div className="about-row">
          <span className="about-info">Bio:</span>
          <span className="about-info-ans">{user.bio}</span>
        </div>
        <div className="about-row">
          <span className="about-info">Email:</span>
          <span className="about-info-ans">{user.email}</span>
        </div>
        <div className="about-row">
          <span className="about-info">Phone:</span>
          <span className="about-info-ans">{user.phone}</span>
        </div>
        <div className="about-row">
          <span className="about-info">Location:</span>
          <span className="about-info-ans">{user.location}</span>
        </div>
      </div>

      {/* Suggestions Section */}
      <div className="sug-container">
        <span className="header-text">Suggestions</span>
        <hr className="divider" />

        {/* Wrapper for restaurant suggestions */}
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
  );
};

// Default export for the UserAbout component
export default UserAbout;
