"use client";
import { useId } from "react";
import styles from "@/styles/textInput.module.scss";

interface TextInputProps {
  label: string;
  type?: "text" | "email";
  placeholder?: string;
  required?: boolean;
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export default function TextInput({
  label,
  type = "text",
  placeholder,
  required,
  value,
  onChange,
  error,
}: TextInputProps) {
  const id = useId();

  return (
    <div className={styles.wrapper}>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      <input
        id={id}
        className={`${styles.input} ${error ? styles.errorInput : ""}`}
        type={type}
        placeholder={placeholder}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
      />
      {error && (
        <span id={`${id}-error`} className={styles.errorMessage}>
          {error}
        </span>
      )}
    </div>
  );
}
