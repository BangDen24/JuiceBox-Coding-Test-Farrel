"use client";

import Button from "@/components/ui/button";
import styles from "@/styles/descriptionSlides.module.scss";

interface DescriptionSlideProps {
  title: string;
  content: string;
  buttonText: string;
  buttonVariant?: "purple" | "black" | "white";
  onNext?: () => void;
}

export default function DescriptionSlide({
  title,
  content,
  buttonText,
  buttonVariant = "purple",
  onNext,
}: DescriptionSlideProps) {
  return (
    <div className={styles.container}>
      {/* Hexagon / Icon */}
      <div className={styles.icon}></div>

      {/* Text */}
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.content}>{content}</p>

      {/* Button */}
      <div className={styles.footer}>
        <Button variant={buttonVariant} onClick={onNext}>
          {buttonText}
        </Button>
      </div>
    </div>
  );
}
