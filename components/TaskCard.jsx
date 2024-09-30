// "use client";
// import React from "react";
// import PriorityBadge from "./PriorityBadge";
// import MilestoneTracker from "./MilestoneTracker";
// import styles from "../styles/TaskCard.module.css";
// import { FaComments } from "react-icons/fa";

// const TaskCard = ({ task }) => {
//   const {
//     title,
//     description,
//     dueDate,
//     priority,
//     createdAt,
//     status,
//     milestones,
//     comments,
//   } = task;

//   return (
//     <div className={`${styles.card} ${styles[priority.toLowerCase()]}`}>
//       <header className={styles.header}>
//         <h3 className={styles.title}>{title}</h3>
//         <PriorityBadge priority={priority} />
//       </header>
//       <p className={styles.description}>{description}</p>
//       <div className={styles.details}>
//         <span className={styles.createdAt}>
//           Created: {new Date(createdAt).toLocaleDateString()}
//         </span>
//         <span className={styles.status}>Status: {status}</span>
//         <span className={styles.dueDate}>
//           Due: {new Date(dueDate).toLocaleDateString()}
//         </span>
//       </div>
//       <MilestoneTracker milestones={milestones} />
//       {comments && comments.length > 0 && (
//         <div className={styles.commentsWrapper}>
//           <FaComments className={styles.commentsIcon} />
//           <div className={styles.commentsDropdown}>
//             {comments.map((comment, index) => (
//               <div key={index} className={styles.comment}>
//                 <p>{comment}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default TaskCard;


"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, MessageSquare, CheckCircle } from "lucide-react";
import { format } from "date-fns";
import styles from "../styles/TaskCard.module.css";

function PriorityBadge({ priority }) {
  return (
    <span
      className={`${styles.priorityBadge} ${styles[priority.toLowerCase()]}`}
    >
      {priority}
    </span>
  );
}

function MilestoneTracker({ milestones }) {
  return (
    <div className={styles.milestoneTracker}>
      <h4 className={styles.milestoneTitle}>Milestones</h4>
      <div className={styles.milestoneList}>
        {milestones.map((milestone, index) => (
          <div key={index} className={styles.milestone}>
            <CheckCircle
              className={`${styles.milestoneIcon} ${
                milestone.completed ? styles.completed : ""
              }`}
            />
            <span
              className={`${styles.milestoneText} ${
                milestone.completed ? styles.completedText : ""
              }`}
            >
              {milestone.title}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function TaskCard({ task }) {
  const [isHovered, setIsHovered] = useState(false);
  const [showComments, setShowComments] = useState(false);

  const {
    title,
    description,
    dueDate,
    priority,
    createdAt,
    status,
    milestones,
    comments,
  } = task;

  return (
    <div >
      <motion.article
        className={`${styles.card} ${styles[priority.toLowerCase()]}`}
        whileHover={{ scale: 1.02 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        <div className={styles.content}>
          <header className={styles.header}>
            <h3 className={styles.title}>{title}</h3>
            <PriorityBadge priority={priority} />
          </header>
          <p className={styles.description}>{description}</p>
          <div className={styles.details}>
            <div className={styles.detailItem}>
              <Calendar className={styles.icon} />
              <span>Created: {format(new Date(createdAt), "MMM d, yyyy")}</span>
            </div>
            <div className={styles.detailItem}>
              <Clock className={styles.icon} />
              <span>Due: {format(new Date(dueDate), "MMM d, yyyy")}</span>
            </div>
            <div
              className={`${styles.statusBadge} ${
                styles[status.toLowerCase().replace(" ", "")]
              }`}
            >
              {status}
            </div>
          </div>
          {/* <MilestoneTracker milestones={milestones} /> */}
          {comments && comments.length > 0 && (
            <div className={styles.commentsSection}>
              <button
                className={styles.commentsToggle}
                onClick={() => setShowComments(!showComments)}
              >
                <MessageSquare className={styles.icon} />
                <span>
                  {comments.length} Comment{comments.length !== 1 && "s"}
                </span>
              </button>
              {showComments && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className={styles.commentsList}
                >
                  {comments.map((comment, index) => (
                    <div key={index} className={styles.comment}>
                      {comment}
                    </div>
                  ))}
                </motion.div>
              )}
            </div>
          )}
        </div>
      </motion.article>
    </div>
  );
}