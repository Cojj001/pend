import React from 'react'
import styles from "../styles/SecBtn.module.css";

const SecBtn = ({name}) => {
  return (
    <div className={styles.btn}>{name}</div>
  )
}

export default SecBtn