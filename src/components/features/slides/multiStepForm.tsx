"use client";

import { useState } from "react";
import TextInput from "@/components/ui/textInput";
import styles from "@/styles/multistepform.module.scss";
import Button from "@/components/ui/button";

interface FormStepProps {
  questionText: string;
  inputType?: "text" | "email";
  placeholder?: string;
  initialValue?: string;            // 👈 ambil default dari parent
  error?: string;
  buttonText: string;
  onNext?: (value: string) => void; // 👈 kirim value pas submit
}

export default function FormStep({
  questionText,
  inputType = "text",
  placeholder,
  initialValue = "",
  error,
  buttonText,
  onNext,
}: FormStepProps) {
  const [inputValue, setInputValue] = useState(initialValue);

  const handleSubmit = () => {
    if (onNext) {
      onNext(inputValue); // kirim ke parent
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.icon}></div>

      <h2 className={styles.question}>{questionText}</h2>

      <TextInput
        label={questionText}
        type={inputType}
        placeholder={placeholder}
        value={inputValue}
        onChange={(val) => setInputValue(val)} // simpan lokal
        error={error}
        required
      />

      <div className={styles.footer}>
        <Button variant="purple" onClick={handleSubmit}>
          {buttonText}
        </Button>
      </div>
    </div>
  );
}
