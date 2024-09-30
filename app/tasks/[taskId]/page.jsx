"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import TaskCard from "@/components/TaskCard";
import MilestoneTracker from "@/components/MilestoneTracker";
import CommentsSection from "@/components/CommentsSection";
import FileUpload from "@/components/FileUpload";
import AttachmentsList from "@/components/AttachmentsList";

const TaskPage = () => {
  const router = useRouter();
  const { taskId } = router.query;

  const [task, setTask] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!taskId) return;

    const fetchTask = async () => {
      try {
        const response = await axios.get(`/api/tasks/${taskId}`);
        setTask(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load task");
        setLoading(false);
      }
    };

    fetchTask();
  }, [taskId]);

  const handleEdit = () => {
    router.push(`/app/features/tasks/${taskId}/edit`);
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this task?")) return;

    try {
      await axios.delete(`/api/tasks/${taskId}`, {
        data: { id: taskId },
      });
      router.push("/app/features/dashboard"); // Redirect to dashboard or task list
    } catch (err) {
      setError("Failed to delete task");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="task-page">
      <h1>{task.title}</h1>
      <TaskCard
        title={task.title}
        description={task.description}
        dueDate={task.dueDate}
        priority={task.priority}
        assignedUsers={task.assignedUsers}
      />
      <MilestoneTracker milestones={task.milestones} />
      <FileUpload taskId={task.id} />
      <CommentsSection taskId={task.id} />
      <AttachmentsList attachments={task.attachments} />
      <button onClick={handleEdit}>Edit Task</button>
      <button onClick={handleDelete}>Delete Task</button>
    </div>
  );
};

export default TaskPage;
