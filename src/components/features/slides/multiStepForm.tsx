"use client";

import { useState } from "react";
import TextInput from "@/components/ui/textInput";
import styles from "@/styles/multistepform.module.scss";
import Button from "@/components/ui/button";
import Lottie from "lottie-react";

interface FormStepProps {
  questionText: string;
  inputType?: "text" | "email";
  placeholder?: string;
  initialValue?: string;  
  error?: string;
  buttonText: string;
  onNext?: (value: string) => void; 
  animationData: object;  
}

export default function FormStep({
  questionText,
  inputType = "text",
  placeholder,
  initialValue = "",
  error,
  buttonText,
  onNext,
  animationData,
}: FormStepProps) {
  const [inputValue, setInputValue] = useState(initialValue);

  const handleSubmit = () => {
    if (onNext) {
      onNext(inputValue); // kirim ke parent
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.animation}>
        <Lottie animationData={animationData} loop={true} className={styles.lottie} autoplay={false} />
      </div>
      <h1 className={styles.question}>{questionText}</h1>

      <TextInput
        label={questionText}
        type={inputType}
        placeholder={placeholder}
        value={inputValue}
        onChange={(val) => setInputValue(val)} // simpan lokal
        error={error}
        required
        onSubmit={handleSubmit}
      />

      {/* <div className={styles.footer}>
        <Button variant="purple" onClick={handleSubmit}>
          {buttonText}
        </Button>
      </div> */}
    </div>
  );
}
