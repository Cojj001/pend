import React from "react";
import { CheckCircle, Circle } from "lucide-react";
import styles from "../styles/MilestonesView.module.css";

const MilestonesView = ({ milestones, onToggleMilestone }) => {
  return (
    <div className={styles.milestonesView}>
      <h2 className={styles.title}>Milestones</h2>
      <ul className={styles.milestoneList}>
        {milestones.map((milestone) => (
          <li
            key={milestone.id}
            className={`${styles.milestoneItem} ${
              milestone.completed ? styles.completed : ""
            }`}
            onClick={() => onToggleMilestone(milestone.id)}
          >
            <span className={styles.icon}>
              {milestone.completed ? (
                <CheckCircle size={20} />
              ) : (
                <Circle size={20} />
              )}
            </span>
            <span className={styles.text}>{milestone.text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MilestonesView;
