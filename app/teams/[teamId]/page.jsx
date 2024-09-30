"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import { Users, UserPlus, Trash2 } from "lucide-react";
import NavBar from "@/components/NavBar";
import Sidebar from "@/components/Sidebar";
import styles from "../../../styles/TeamDetails.module.css";

const TeamDetails = () => {
  const { teamId } = useParams();
  const [team, setTeam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newMember, setNewMember] = useState({ name: "", email: "" });

  useEffect(() => {
    const fetchTeamDetails = async () => {
      try {
        const response = await axios.get(`/api/teams/${teamId}`);
        setTeam(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load team details");
        setLoading(false);
      }
    };

    fetchTeamDetails();
  }, [teamId]);

  const handleAddMember = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `/api/teams/${teamId}/members`,
        newMember
      );
      setTeam({ ...team, members: [...team.members, response.data] });
      setNewMember({ name: "", email: "" });
    } catch (err) {
      setError("Failed to add team member");
    }
  };

  const handleRemoveMember = async (memberId) => {
    try {
      await axios.delete(`/api/teams/${teamId}/members/${memberId}`);
      setTeam({
        ...team,
        members: team.members.filter((member) => member.id !== memberId),
      });
    } catch (err) {
      setError("Failed to remove team member");
    }
  };

  if (loading) {
    return (
      <main className="container">
        <NavBar />
        <div className="flex-row">
          <Sidebar />
          <div className={styles.loadingContainer}>
            <div className={styles.loadingSpinner}></div>
            <p>Loading team details...</p>
          </div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="container">
        <NavBar />
        <div className="flex-row">
          <Sidebar />
          <div className={styles.errorContainer}>
            <p>{error}</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="container">
      <NavBar />
      <div className="flex-row">
        <Sidebar />
        <div className={styles.teamDetailsContainer}>
          <h1 className={styles.teamName}>{team.name}</h1>
          <div className={styles.teamInfo}>
            <Users size={20} />
            <span>{team.members.length} members</span>
          </div>

          <h2 className={styles.sectionTitle}>Team Members</h2>
          <ul className={styles.memberList}>
            {team.members.map((member) => (
              <li key={member.id} className={styles.memberItem}>
                <div className={styles.memberInfo}>
                  <span className={styles.memberName}>{member.name}</span>
                  <span className={styles.memberEmail}>{member.email}</span>
                </div>
                <button
                  onClick={() => handleRemoveMember(member.id)}
                  className={styles.removeButton}
                  aria-label={`Remove ${member.name}`}
                >
                  <Trash2 size={18} />
                </button>
              </li>
            ))}
          </ul>

          <h2 className={styles.sectionTitle}>Add New Member</h2>
          <form onSubmit={handleAddMember} className={styles.addMemberForm}>
            <input
              type="text"
              placeholder="Name"
              value={newMember.name}
              onChange={(e) =>
                setNewMember({ ...newMember, name: e.target.value })
              }
              required
              className={styles.input}
            />
            <input
              type="email"
              placeholder="Email"
              value={newMember.email}
              onChange={(e) =>
                setNewMember({ ...newMember, email: e.target.value })
              }
              required
              className={styles.input}
            />
            <button type="submit" className={styles.addButton}>
              <UserPlus size={18} />
              Add Member
            </button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default TeamDetails;
