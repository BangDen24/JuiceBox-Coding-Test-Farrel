"use client";
import { useId } from "react";
import { ArrowUp } from "lucide-react";
import styles from "@/styles/textinput.module.scss";

interface TextInputProps {
  label: string;
  type?: "text" | "email";
  placeholder?: string;
  required?: boolean;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  onSubmit?: () => void;
  showButton?: boolean;
}

export default function TextInput({
  label,
  type = "text",
  placeholder,
  required,
  value,
  onChange,
  error,
  onSubmit,
  showButton = true
}: TextInputProps) {
  const id = useId();

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && onSubmit) {
      onSubmit();
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.inputContainer}>
        <input
          id={id}
          className={`${styles.input} ${error ? styles.errorInput : ""} ${showButton ? styles.inputWithButton : ""}`}
          type={type}
          placeholder={placeholder}
          required={required}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
        />
        {showButton && (
          <button
            type="button"
            className={styles.submitButton}
            onClick={onSubmit}
            aria-label="Submit"
          >
            <ArrowUp size={20} strokeWidth={2.5} />
          </button>
        )}
      </div>
      {error && (
        <span id={`${id}-error`} className={styles.errorMessage}>
          {error}
        </span>
      )}
    </div>
  );
}