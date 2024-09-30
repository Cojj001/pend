"use client";
import React, { useState } from "react";
import styles from "../styles/TaskForm.module.css";
import PriorityBadge from "./PriorityBadge";
import PrimaryBtn from "./PrimaryBtn";
import SecBtn from "./SecBtn";

const TaskForm = ({ task, onSubmit }) => {
  const [taskMilestones, setTaskMilestones] = useState([]);

  const [title, setTitle] = useState(task ? task.title : "");
  const [description, setDescription] = useState(task ? task.description : "");
  const [dueDate, setDueDate] = useState(
    task ? task.dueDate.split("T")[0] : ""
  );
  const [priority, setPriority] = useState(task ? task.priority : "Low");
  const [status] = useState(task ? task.status : "PENDING");
  const [assignedTo, setAssignedTo] = useState(task ? task.assignedTo : []);
  const [milestones, setMilestones] = useState(task ? task.milestones : []);
  const [newMilestone, setNewMilestone] = useState("");

  const handleAddMilestone = () => {
    setMilestones([...milestones, { name: newMilestone, status: "PENDING" }]);
    setNewMilestone("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      title,
      description,
      dueDate,
      priority,
      status,
      milestones,
      assignedTo,
    });
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.formItem}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div className={styles.formItem}>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>

      <div className="formItem">
        <label htmlFor="dueDate">Due Date</label>
        <input
          id="dueDate"
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          required
        />
      </div>

      <div className={styles.select_details}>
        <div className={styles.formItem}>
          <label htmlFor="priority">Priority</label>
          <select
            id="priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            required
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        <div className={styles.formItem}>
          <label htmlFor="assignedTo">assign to</label>
          <select
            id="assignedTo"
            value={priority}
            onChange={(e) => setAssignedTo(e.target.value)}
            required
          >
            <option value="unassigned">unassigned</option>
            <option value="team member">team member</option>
            <option value="team member">team member</option>
          </select>
        </div>
      </div>

      <div className={styles.formItem}>
        <label htmlFor="milestones">Milestones</label>
        <div className={styles.milestoneSection}>
          <div className={styles.milestoneInput}>
            <input
              id="milestoneInput"
              type="text"
              value={newMilestone}
              onChange={(e) => setNewMilestone(e.target.value)}
              placeholder="Add new milestone"
            />
            <button type="button" onClick={handleAddMilestone}>
              <SecBtn onClick={handleAddMilestone} name={"Add milestone"} />
            </button>
          </div>
          <ul className={styles.milestonesList}>
            {milestones.map((milestone, index) => (
              <li key={index} className={styles.milestoneItem}>
                {milestone.name}
                <input type="checkbox" />
              </li>
            ))}
          </ul>
        </div>
      </div>
      <button type="submit">
        <PrimaryBtn name={task ? "Update Task" : "Create Task"} />
      </button>
    </form>
  );
};

export default TaskForm;
