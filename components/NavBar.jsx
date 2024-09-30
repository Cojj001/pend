"use client";
import React from "react";
import Link from "next/link";
import { useUser, useClerk } from "@clerk/nextjs";

import styles from "../styles/NavBar.module.css";
import PrimaryBtn from "./PrimaryBtn";

const NavBar = () => {
  const { isSignedIn, user } = useUser();
  const { signOut } = useClerk();

  const handleLogout = () => {
    signOut({ redirectUrl: "/" });
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.navContent}>
        <Link href="/" className={styles.link}>
          <div className={styles.logo}>PENDI</div>
        </Link>
        {isSignedIn ? (
          <>
            <div className={styles.userDetail}>
              <span className={styles.userInfo}>Welcome, {user.firstName}</span>
              <button onClick={handleLogout}>
                <PrimaryBtn className={styles.button} name={"Logout"} />
              </button>
            </div>
          </>
        ) : (
          <Link href="/sign-in" className={styles.link}>
            <PrimaryBtn name={"sign in"} />
          </Link>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
