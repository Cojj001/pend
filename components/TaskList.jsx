"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import TaskCard from "./TaskCard";
import Loader from "./Loader";
import styles from "../styles/TaskList.module.css";

const dummyTask = [
  {
    id: "dummy",
    title: "Complete Project Proposal",
    description: "Finish writing the project proposal for the new client",
    dueDate: "2023-06-15T14:00:00",
    priority: "High",
    createdAt: "2023-06-01T09:00:00",
    status: "In Progress",
    milestones: [
      { title: "Draft outline", completed: true },
      { title: "Write introduction", completed: true },
      { title: "Develop main content", completed: false },
      { title: "Create conclusion", completed: false },
    ],
    comments: [
      "Remember to include the budget breakdown",
      "Don't forget to address the timeline concerns from the last meeting",
    ],
  },
  {
    id: "dummy2",
    title: "Complete hooki",
    description: "Finish w",
    dueDate: "2023-06-15T14:00:00",
    priority: "low",
    createdAt: "2023-06-01T09:00:00",
    status: "not started",
    milestones: [
      { title: "Write introduction", completed: false },
      { title: "Develop main content", completed: false },
      { title: "Create conclusion", completed: false },
    ],
    comments: ["abeg start", "Don't forget"],
  },
  {
    id: "dummy3",
    title: "Complete hooki",
    description: "Finish w",
    dueDate: "2023-06-15T14:00:00",
    priority: "medium",
    createdAt: "2023-06-01T09:00:00",
    status: "completed",
    milestones: [
      { title: "Write introduction", completed: true },
      { title: "Develop main content", completed: true },
      { title: "Create conclusion", completed: true },
    ],
    comments: ["nice start", "good job"],
  },
];

export default function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get("/api/tasks");
        setTasks(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch tasks");
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  if (loading)
    return (
      <div className={styles.loading}>
        <Loader />
      </div>
    );
  if (error) return <div className={styles.error}>{error}</div>;

  return (
    <div className={styles.taskList}>
      {tasks.length === 0
        ? dummyTask.map((dummyTask) => (
            <TaskCard key={dummyTask.id} task={dummyTask} />
          ))
        : tasks.map((task) => <TaskCard key={task.id} task={task} />)}
    </div>
  );
}
