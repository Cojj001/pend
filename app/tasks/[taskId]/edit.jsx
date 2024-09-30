"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

const EditTaskPage = () => {
  const router = useRouter();
  const { taskId } = router.query;

  const [task, setTask] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("Low");
  const [milestones, setMilestones] = useState([]);
  const [newMilestone, setNewMilestone] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!taskId) return;

    const fetchTask = async () => {
      try {
        const response = await axios.get(`/api/tasks/${taskId}`);
        const taskData = response.data;
        setTask(taskData);
        setTitle(taskData.title);
        setDescription(taskData.description);
        setDueDate(taskData.dueDate);
        setPriority(taskData.priority);
        setMilestones(taskData.milestones || []);
        setLoading(false);
      } catch (err) {
        setError("Failed to load task");
        setLoading(false);
      }
    };

    fetchTask();
  }, [taskId]);

  const handleSave = async () => {
    if (milestones.length === 0) {
      setError("At least one milestone is required.");
      return;
    }

    setSaving(true);
    try {
      await axios.put(`/api/tasks/${taskId}`, {
        title,
        description,
        dueDate,
        priority,
        milestones,
      });
      router.push(`/app/features/tasks/${taskId}`);
    } catch (err) {
      setError("Failed to save task");
      setSaving(false);
    }
  };

  const handleAddMilestone = () => {
    if (newMilestone.trim() === "") return;
    setMilestones([...milestones, newMilestone.trim()]);
    setNewMilestone("");
  };

  const handleRemoveMilestone = (index) => {
    setMilestones(milestones.filter((_, i) => i !== index));
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="edit-task-page">
      <h1>Edit Task</h1>
      <div className="task-form">
        <label>Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <label>Due Date</label>
        <input
          type="date"
          value={dueDate.split("T")[0]} // Format the date for input
          onChange={(e) => setDueDate(e.target.value)}
        />
        <label>Priority</label>
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <label>Milestones</label>
        {milestones.map((milestone, index) => (
          <div key={index} className="milestone-item">
            <span>{milestone}</span>
            <button type="button" onClick={() => handleRemoveMilestone(index)}>
              Remove
            </button>
          </div>
        ))}
        <input
          type="text"
          value={newMilestone}
          onChange={(e) => setNewMilestone(e.target.value)}
          placeholder="Add a new milestone"
        />
        <button type="button" onClick={handleAddMilestone}>
          Add Milestone
        </button>
        <button onClick={handleSave} disabled={saving}>
          {saving ? "Saving..." : "Save"}
        </button>
      </div>
    </div>
  );
};

export default EditTaskPage;
