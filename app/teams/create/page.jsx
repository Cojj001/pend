"use client";

import React, { useState } from "react";
import axios from "axios";

const TeamCreationForm = () => {
  const [teamName, setTeamName] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("/api/teams", { name: teamName });
      setSuccess("Team created successfully!");
      setError("");
    } catch (err) {
      setError("Failed to create team");
      setSuccess("");
    }
  };

  return (
    <div>
      <h1>Create Team</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Team Name:
          <input
            type="text"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            required
          />
        </label>
        <button type="submit">Create Team</button>
        {error && <div className="error">{error}</div>}
        {success && <div className="success">{success}</div>}
      </form>
    </div>
  );
};

export default TeamCreationForm;
