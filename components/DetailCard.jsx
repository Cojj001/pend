import React from "react";
import styles from "../styles/DetailCard.module.css";
import { ESLINT_DEFAULT_DIRS } from "next/dist/lib/constants";

const DetailCard = ({ name, number }) => {
  let color = "";
  if (name === "pending") {
    color = "rgba(206, 206, 48, 0.781)";
  } else if ((name === "completed")) {
    color = "rgba(50, 173, 50, 0.719)";
  } else {
    color = "rgba(255, 63, 63, 0.795)";
  }

  return (
    <div className={styles.DetailCard} style={{ backgroundColor: color }}>
      <h1>{number}</h1>
      <p>{name}</p>
    </div>
  );
};

export default DetailCard;
