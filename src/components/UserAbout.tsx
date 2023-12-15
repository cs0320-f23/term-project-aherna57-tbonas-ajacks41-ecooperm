import "../styles/UserAbout.module.css";

const UserAbout = () => {
  const userItem = localStorage.getItem("user");
  const user =
    userItem && userItem !== "undefined"
      ? JSON.parse(userItem)
      : localStorage.clear();
  return (
    <div className="ab-container">
      {/* About Section */}
      <div className="wrapper-about">
        <span className="header-text">About</span>
        <hr className="divider" />
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

export default UserAbout;
