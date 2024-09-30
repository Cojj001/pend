"use client";

import React, { useState, useEffect } from "react";
import { Bell, X } from "lucide-react";
import PrimaryBtn from "@/components/PrimaryBtn";
import Loader from "@/components/Loader";
import styles from "../styles/Notifications.module.css";
import { db } from "@/lib/firebase";
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  doc,
  deleteDoc,
  writeBatch,
} from "firebase/firestore";
import { useUser } from "@clerk/nextjs";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user, isLoaded, isSignedIn } = useUser();

  useEffect(() => {
    if (!isLoaded || !isSignedIn) return;

    const notificationsRef = collection(db, "notifications");
    const q = query(
      notificationsRef,
      where("userId", "==", user.id),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const newNotifications = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate().toLocaleString(), // Convert Firestore Timestamp to string
        }));
        setNotifications(newNotifications);
        setLoading(false);
      },
      (err) => {
        console.error("Failed to fetch notifications", err);
        setError("Failed to load notifications. Please try again later.");
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [isLoaded, isSignedIn, user]);

  const handleDismiss = async (id) => {
    try {
      await deleteDoc(doc(db, "notifications", id));
      // No need to update state, as the real-time listener will handle this
    } catch (err) {
      console.error("Failed to dismiss notification", err);
    }
  };

  const handleClearAll = async () => {
    try {
      const batch = writeBatch(db);
      notifications.forEach((notification) => {
        const notificationRef = doc(db, "notifications", notification.id);
        batch.delete(notificationRef);
      });
      await batch.commit();
      // No need to update state, as the real-time listener will handle this
    } catch (err) {
      console.error("Failed to clear all notifications", err);
    }
  };

  if (!isLoaded || !isSignedIn) {
    return (
      <div className={styles.container}>
        <div className={styles.loadingContainer}>
          <Loader />
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loadingContainer}>
          <Loader />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>{error}</div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        <Bell size={24} />
        Notifications
      </h1>
      {notifications.length > 0 ? (
        <>
          <PrimaryBtn onClick={handleClearAll} className={styles.clearAllBtn}>
            Clear All
          </PrimaryBtn>
          <ul className={styles.notificationList}>
            {notifications.map((notification) => (
              <li key={notification.id} className={styles.notificationItem}>
                <div className={styles.notificationContent}>
                  <p>{notification.body}</p>
                  <span className={styles.timestamp}>
                    {notification.createdAt}
                  </span>
                </div>
                <button
                  onClick={() => handleDismiss(notification.id)}
                  className={styles.dismissBtn}
                  aria-label="Dismiss notification"
                >
                  <X size={16} />
                </button>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p className={styles.emptyMessage}>No new notifications</p>
      )}
    </div>
  );
};

export default Notifications;
