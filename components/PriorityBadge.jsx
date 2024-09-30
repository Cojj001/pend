import React from "react";
import styles from "../styles/PriorityBadge.module.css";

const PriorityBadge = ({ priority }) => {
  const priorityClass = {
    Low: styles.low,
    Medium: styles.medium,
    High: styles.high,
  }[priority];

  return <span className={`${styles.badge} ${priorityClass}`}>{priority}</span>;
};

export default PriorityBadge;
