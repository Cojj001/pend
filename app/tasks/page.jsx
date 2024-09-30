"use client";

import React from "react";
import TaskList from "@/components/TaskList";
import styles from "./TasksPage.module.css";
import NavBar from "@/components/NavBar";
import Sidebar from "@/components/Sidebar";

const TasksPage = () => {
  return (
    <main className="container">
      <NavBar />
      <div className="flex-row">
        <Sidebar />
        <div className={styles.container}>
          <h1 className={styles.title}> All Tasks</h1>
          <TaskList />
        </div>
      </div>
    </main>
  );
};

export default TasksPage;
