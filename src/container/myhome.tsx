import React from "react";
import Link from "next/link";
import Image from "next/image";
import router from "next/router";
import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
import styles from "../styles/Home.module.css";
import Cookies from "js-cookie";


interface UserInfo {
  id: any;
  name: any;
  profileImageUrl: any;
}

const MyHome = () => {
  
  const { user, isLoaded: userLoaded, isSignedIn } = useUser();

  // const userInfo = JSON.parse(Cookies.get("user") || "null");
  // const user: UserInfo = {
  //   id: userInfo?.id,
  //   name: userInfo?.fullName,
  //   profileImageUrl: userInfo?.imageUrl,
  // };

  const handleHomeClick = () => {
    // Navigate to the home page
    router.push("/home");
  };

  const handleSignOut = () => {
    router.push("/");
  }


  //Return empty div if user isn't loaded
  if (!userLoaded) return <div />;

  if (user) {
    Cookies.set("user", JSON.stringify(user));
  }


  return (
    <div>
      {!isSignedIn && (
        <div className="flex justify-center">
          <SignInButton />
        </div>
      )}

      {isSignedIn && (
        <h1 className={styles.header}>
          <div
            className={styles.title}
            onClick={handleHomeClick}
            aria-label="Navigate to Home Page"
          >
            Bear{" "}
            <img className={styles.iconTop} src="/logo.png" alt="Logo"></img>{" "}
            Bites
          </div>
          <div className={styles.userIm}>
            <Link href={`/users/${user.id}`}>
              <Image
                src={user.imageUrl}
                alt={`@${user.fullName}'s profile picture`}
                className="h-14 w-14 rounded-full"
                width={56}
                height={56}
              />
            </Link>
            <div className={styles.dropdownMenu}>
              <SignOutButton>
                <button className={styles.dropbtn} onClick={handleSignOut}>
                  Sign out
                </button>
              </SignOutButton>
            </div>
          </div>
        </h1>
      )}
    </div>
  );
};

export default MyHome;
