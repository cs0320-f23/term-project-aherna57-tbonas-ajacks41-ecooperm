// Importing necessary dependencies and styles
import React from "react";
import Link from "next/link";
import Image from "next/image";
import router from "next/router";
import {
  SignInButton,
  SignOutButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import styles from "../styles/home.module.css";

// Functional component for rendering the home page header
const MyHome = ({ user }: any) => {
  // Handler function for navigating to the home page
  const handleHomeClick = () => {
    // Navigate to the home page
    router.push("/home");
  };

  // Logging user information to the console
  console.log("chchch", user);

  // Main component rendering the home page header
  return (
    <h1 className={styles.header}>
      {/* Title and logo, clickable to navigate to the home page */}
      <div
        className={styles.title}
        onClick={handleHomeClick}
        aria-label="Navigate to Home Page"
      >
        Bear <img className={styles.iconTop} src="/logo.png" alt="Logo" />
        Bites
      </div>

      {/* User information and profile image */}
      <div className={styles.userIm}>
        {/* Link to the user's profile page */}
        <Link href={`/users/${user.id}`}>
          <Image
            src={user.profileImageUrl}
            alt={`@${user.firstName}'s profile picture`}
            className="h-14 w-14 rounded-full"
            width={56}
            height={56}
          />
        </Link>

        {/* Dropdown menu with a sign-out button */}
        <div className={styles.dropdownMenu}>
          <SignOutButton>
            <button className={styles.dropbtn}>Sign out</button>
          </SignOutButton>
        </div>
      </div>
    </h1>
  );
};

// Exporting the MyHome component as the default export
export default MyHome;
