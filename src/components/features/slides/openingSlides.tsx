// components/OpeningSlide.tsx
"use client";

import Hexagon from "@/components/ui/hexagon";
import styles from "@/styles/openingslides.module.scss";
import Button from "@/components/ui/button";

interface OpeningSlideProps {
  title: string;
  content: string;
  buttonText: string;
  onNext: () => void;
}

export default function OpeningSlide({
  title,
  content,
  buttonText,
  onNext,
}: OpeningSlideProps) {
  return (
    <div className={styles.container}>
      <Hexagon variant="opening" animate />
      <h1>{title}</h1>
      <p>{content}</p>
      <Button variant="purple" onClick={onNext}>
        {buttonText}
      </Button>
    </div>
  );
}
