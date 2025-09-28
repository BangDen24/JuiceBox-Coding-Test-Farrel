"use client";

import styles from "@/styles/descriptionslides.module.scss";

interface DescriptionSlideProps {
  content: string;
}

export default function DescriptionSlide({ content }: DescriptionSlideProps) {
  return (
    <div className={styles.container}>
      <div className={styles.inner}>
        <h1 className={styles.content}>{content}</h1>
      </div>
    </div>
  );
}
