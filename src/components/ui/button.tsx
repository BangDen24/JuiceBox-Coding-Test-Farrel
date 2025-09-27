"use client";
import styles from "@/styles/button.module.scss";

interface ButtonProps {
  children: string;
  variant?: "purple" | "black" | "white";
  onClick?: () => void;
}

export default function Button({ children, variant = "purple", onClick }: ButtonProps) {
  return (
    <button
      className={`${styles.base} ${styles[variant]}`} 
      onClick={onClick}
    >
      {children}
    </button>
  );
}
