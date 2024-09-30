"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import TaskCard from "../components/TaskCard";
import TaskForm from "../components/TaskForm";
import styles from "../styles/Dashboard.module.css";
import DetailCard from "@/components/DetailCard";

const DashboardPage = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get("/api/tasks");
        setTasks(response.data);
      } catch (error) {
        console.error("Failed to fetch tasks", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const handleTaskCreated = async (newTask) => {
    setLoading(true);
    try {
      await axios.post("/api/tasks", newTask);
      // Fetch updated task list
      const response = await axios.get("/api/tasks");
      setTasks(response.data);
      setShowForm(false); // Hide form after task creation
    } catch (error) {
      console.error("Failed to create task", error);
    } finally {
      setLoading(false);
    }
  };

  const upcomingTasks = tasks.filter(
    (task) => new Date(task.dueDate) > new Date()
  );
  const priorityTasks = tasks.reduce((acc, task) => {
    acc[task.priority] = [...(acc[task.priority] || []), task];
    return acc;
  }, {});

  if (loading) return <div className={styles.loading}>Loading...</div>;

  return (
    <div className={styles.dashboard}>
      <div className={styles.dashboard_head}>
        <div className={styles.greeting}>
          <h1>Welcome user !</h1>
          <p>we hope you are having a good day</p>
        </div>
        <div>
          <button
            onClick={() => setShowForm(!showForm)}
            className={styles.addTaskButton}
          >
            {showForm ? "x" : "+"}
          </button>
        </div>
      </div>

      <div className={styles.dashboard_overview}>
        <span>you have</span>
        <div className={styles.overview}>
          <DetailCard name={"pending"} number={upcomingTasks.length} />
          <DetailCard name={"completed"} number={0} />
          <DetailCard name={"stuck"} number={0} />
          {/* <DetailCard name={pending} number={12} /> */}
        </div>
      </div>
      {showForm && (
        <div className={styles.task_form}>
          <TaskForm onSubmit={handleTaskCreated} />
        </div>
      )}
      <section className={styles.section}>
        <h2>Active Tasks</h2>
        {upcomingTasks.length ? (
          <div className={styles.taskList}>
            {upcomingTasks.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
        ) : (
          <p>No Active tasks</p>
        )}
      </section>
      <section className={styles.section}>
        <h2>Upcoming Tasks</h2>
        {upcomingTasks.length ? (
          <div className={styles.taskList}>
            {upcomingTasks.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
        ) : (
          <p>No upcoming tasks</p>
        )}
      </section>
      <section className={styles.section}>
        <h2>Tasks by Priority</h2>
        <div className={styles.priorityContainer}>
          {Object.entries(priorityTasks).map(([priority, tasks]) => (
            <div key={priority} className={styles.prioritySection}>
              <h3>{priority} Priority</h3>
              <div className={styles.taskList}>
                {tasks.map((task) => (
                  <TaskCard key={task.id} task={task} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default DashboardPage;
