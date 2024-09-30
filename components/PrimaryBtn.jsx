import React from 'react'
import styles from "../styles/PrimaryBtn.module.css";

const PrimaryBtn = ({name}) => {
  return (
      <div className={styles.btn}>{ name }</div>
  )
}

export default PrimaryBtn