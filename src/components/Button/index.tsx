import React from "react";
import styles from "./index.module.css";

type Props = {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
};

export default function Button({ children, onClick, disabled }: Props) {
  return (
    <button onClick={onClick} disabled={disabled} className={styles.button}>
      {children}
    </button>
  );
}
