"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";

const AssignTaskForm = ({ taskId }) => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchTeamMembers = async () => {
      const { data } = await axios.get(`/api/teams/members?taskId=${taskId}`);
      setTeamMembers(data);
    };

    fetchTeamMembers();
  }, [taskId]);

  const handleMemberChange = (e) => {
    setSelectedMembers(
      Array.from(e.target.selectedOptions, (option) => option.value)
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("/api/tasks/assign", {
        taskId,
        userIds: selectedMembers,
      });
      setSuccess("Task assigned successfully!");
      setError("");
    } catch (err) {
      setError("Failed to assign task");
      setSuccess("");
    }
  };

  return (
    <div>
      <h1>Assign Task</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Team Members:
          <select
            multiple
            value={selectedMembers}
            onChange={handleMemberChange}
            required
          >
            {teamMembers.map((member) => (
              <option key={member.id} value={member.id}>
                {member.name}
              </option>
            ))}
          </select>
        </label>
        <button type="submit">Assign Task</button>
        {error && <div className="error">{error}</div>}
        {success && <div className="success">{success}</div>}
      </form>
    </div>
  );
};

export default AssignTaskForm;
