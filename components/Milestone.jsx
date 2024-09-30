import React, { useState } from "react";
import { PlusCircle, X } from "lucide-react";
import styles from "../styles/Milestones.module.css";

const MilestoneCreator = ({ onAddMilestone }) => {
  const [milestones, setMilestones] = useState([]);
  const [newMilestone, setNewMilestone] = useState("");

  const handleAddMilestone = () => {
    if (newMilestone.trim()) {
      const updatedMilestones = [
        ...milestones,
        { id: Date.now(), name: newMilestone },
      ];
      setMilestones(updatedMilestones);
      onAddMilestone(updatedMilestones);
      setNewMilestone("");
    }
  };

  const handleRemoveMilestone = (id) => {
    const updatedMilestones = milestones.filter(
      (milestone) => milestone.id !== id
    );
    setMilestones(updatedMilestones);
    onAddMilestone(updatedMilestones);
  };

  return (
    <div className={styles.milestoneCreator}>
      <h3 className={styles.title}>Milestones</h3>
      <div className={styles.inputContainer}>
        <input
          type="text"
          value={newMilestone}
          onChange={(e) => setNewMilestone(e.target.value)}
          placeholder="Add a milestone"
          className={styles.input}
        />
        <button onClick={handleAddMilestone} className={styles.addButton}>
          <PlusCircle size={20} />
        </button>
      </div>
      <ul className={styles.milestoneList}>
        {milestones.map((milestone) => (
          <li key={milestone.id} className={styles.milestoneItem}>
            <span>{milestone.text}</span>
            <button
              onClick={() => handleRemoveMilestone(milestone.id)}
              className={styles.removeButton}
            >
              <X size={16} />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MilestoneCreator;
