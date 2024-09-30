"use client";

import React, { useState } from "react";
import { User, Mail, Phone, MapPin, Briefcase, Calendar } from "lucide-react";
import PrimaryBtn from "@/components/PrimaryBtn";
import styles from "../../styles/Profile.module.css";

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState({
    name: "Jane Doe",
    email: "jane.doe@example.com",
    phone: "+1 (555) 123-4567",
    location: "New York, NY",
    occupation: "Product Manager",
    joinDate: "January 2022",
    avatar: "/placeholder.svg",
  });

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = (e) => {
    e.preventDefault();
    // Here you would typically send the updated user data to your backend
    setIsEditing(false);
  };

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>User Profile</h1>
      <div className={styles.profileCard}>
        <div className={styles.avatarSection}>
          <div className={styles.avatar}>
            <img
              src={user.avatar}
              alt={user.name}
              className={styles.avatarImage}
            />
            <div className={styles.avatarFallback}>
              {user.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </div>
          </div>
          <PrimaryBtn onClick={handleEdit} className={styles.editButton}>
            {isEditing ? "Cancel" : "Edit Profile"}
          </PrimaryBtn>
        </div>
        <form onSubmit={handleSave} className={styles.profileForm}>
          <div className={styles.formGroup}>
            <label htmlFor="name" className={styles.label}>
              <User size={18} />
              Name
            </label>
            {isEditing ? (
              <input
                id="name"
                name="name"
                value={user.name}
                onChange={handleChange}
                className={styles.input}
              />
            ) : (
              <p>{user.name}</p>
            )}
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.label}>
              <Mail size={18} />
              Email
            </label>
            {isEditing ? (
              <input
                id="email"
                name="email"
                type="email"
                value={user.email}
                onChange={handleChange}
                className={styles.input}
              />
            ) : (
              <p>{user.email}</p>
            )}
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="phone" className={styles.label}>
              <Phone size={18} />
              Phone
            </label>
            {isEditing ? (
              <input
                id="phone"
                name="phone"
                value={user.phone}
                onChange={handleChange}
                className={styles.input}
              />
            ) : (
              <p>{user.phone}</p>
            )}
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="location" className={styles.label}>
              <MapPin size={18} />
              Location
            </label>
            {isEditing ? (
              <input
                id="location"
                name="location"
                value={user.location}
                onChange={handleChange}
                className={styles.input}
              />
            ) : (
              <p>{user.location}</p>
            )}
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="occupation" className={styles.label}>
              <Briefcase size={18} />
              Occupation
            </label>
            {isEditing ? (
              <input
                id="occupation"
                name="occupation"
                value={user.occupation}
                onChange={handleChange}
                className={styles.input}
              />
            ) : (
              <p>{user.occupation}</p>
            )}
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>
              <Calendar size={18} />
              Member Since
            </label>
            <p>{user.joinDate}</p>
          </div>
          {isEditing && (
            <PrimaryBtn type="submit" className={styles.saveButton}>
              Save Changes
            </PrimaryBtn>
          )}
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
