"use client";

import Button from "@/components/ui/button";
import styles from "@/styles/finishslides.module.scss";
import Lottie from "lottie-react";

interface FinishSlideProps {
  animationData: object; 
  title: string;
  subtitle?: string;
  buttonText: string;
  onFinish?: () => void;
  formValues?: Record<string, string>;
}

export default function FinishSlide({
  animationData,
  buttonText,
  onFinish,
  formValues = {},
}: FinishSlideProps) {
  return (
    <div className={styles.container}>
      <div className={styles.animation}>
        <Lottie animationData={animationData} loop={true} />
      </div>

      {/* tampilkan hasil form */}
      <div className={styles.userInfo}>
        <p>Thanks, {formValues["name"]}! Now it&apos;s time to get a reality check.</p>
        This will take 2-3 minutes
      </div>

      <div className={styles.footer}>
        <Button variant="white" onClick={onFinish}>
          {buttonText}
        </Button>
      </div>
    </div>
  );
}