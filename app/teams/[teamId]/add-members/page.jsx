"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";

const AddMembersToTeamForm = ({ teamId }) => {
  const [userEmails, setUserEmails] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userIds = await Promise.all(
      userEmails.split(",").map(async (email) => {
        const { data } = await axios.get(`/api/users?email=${email.trim()}`);
        return data.id;
      })
    );

    try {
      await axios.post(`/api/teams/${teamId}/members`, { userIds });
      setSuccess("Users added to team!");
      setError("");
    } catch (err) {
      setError("Failed to add users to team");
      setSuccess("");
    }
  };

  return (
    <div>
      <h1>Add Members to Team</h1>
      <form onSubmit={handleSubmit}>
        <label>
          User Emails (comma separated):
          <input
            type="text"
            value={userEmails}
            onChange={(e) => setUserEmails(e.target.value)}
            required
          />
        </label>
        <button type="submit">Add Members</button>
        {error && <div className="error">{error}</div>}
        {success && <div className="success">{success}</div>}
      </form>
    </div>
  );
};

export default AddMembersToTeamForm;
