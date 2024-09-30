"use client";
import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import axios from "axios";
import { showNotification } from "../utils/notifications";
import { logActivity } from "../../utils/activityLogger";

const socket = io();

const CommentsSection = ({ taskId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`/api/comments?taskId=${taskId}`);
        setComments(response.data);
      } catch (err) {
        console.error("Failed to fetch comments", err);
      }
    };

    fetchComments();

    socket.on("taskUpdate", (updatedTask) => {
      if (updatedTask.id === taskId) {
        fetchComments();
      }
    });

    return () => {
      socket.off("taskUpdate");
    };
  }, [taskId]);

  const handleAddComment = async () => {
    if (newComment.trim() === "") {
      setError("Comment cannot be empty");
      return;
    }

    try {
      await axios.post("/api/comments", {
        taskId,
        userId: "current-user-id", // Replace with actual user ID
        comment: newComment,
      });
      setNewComment("");
      setError("");
      socket.emit("taskUpdate", { id: taskId });
      showNotification(
        "New Comment Added",
        "A new comment has been added to your task."
      );
      await logActivity("Added a comment", userId, taskId);
    } catch (err) {
      console.error("Failed to add comment", err);
    }
  };

  return (
    <div>
      <h3>Comments</h3>
      <ul>
        {comments.map((comment) => (
          <li key={comment.id}>
            {comment.comment} - {comment.user.name}
          </li>
        ))}
      </ul>
      <textarea
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        placeholder="Add a comment"
      />
      <button onClick={handleAddComment}>Add Comment</button>
      {error && <div className="error">{error}</div>}
    </div>
  );
};

export default CommentsSection;
