import React from "react";
import styles from "../styles/MilestoneTracker.module.css";

const MilestoneTracker = ({ milestones }) => {
  return (
    <div className={styles.tracker}>
      {milestones.map((milestone, index) => (
        <div key={index} className={styles.milestone}>
          <span
            className={
              milestone.completed ? styles.completed : styles.incomplete
            }
          >
            {milestone.title}
          </span>
        </div>
      ))}
    </div>
  );
};

export default MilestoneTracker;
