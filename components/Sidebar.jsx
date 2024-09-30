"use client";
import React from "react";
import { useRouter } from "next/navigation";
import styles from "../styles/Sidebar.module.css";

const Sidebar = () => {
  const router = useRouter();

  return (
    <aside className={styles.sidebar}>
      <h2>Menu</h2>
      <ul>
        <li onClick={() => router.push("/dashboard")}>
          Dashboard
        </li>
        <li onClick={() => router.push("/tasks")}>Tasks</li>
        <li onClick={() => router.push("/teams")}>Teams</li>
        {/* <li onClick={() => router.push("/profile")}>Profile</li> */}
        <li onClick={() => router.push("/notifications")}>
          Notifications
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
