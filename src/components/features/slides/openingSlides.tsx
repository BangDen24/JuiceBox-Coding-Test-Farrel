// components/OpeningSlide.tsx
"use client";

import Hexagon from "@/components/ui/hexagon";
import Button from "@/components/ui/button";
import styles from "@/styles/openingslides.module.scss";

interface OpeningSlideProps {
  title: string;
  buttonText: string;
  onNext: () => void;
}

export default function OpeningSlide({
  title,
  buttonText,
  onNext,
}: OpeningSlideProps) {
  const bullets = [
    "WA businesses feel confident about future growth",
    "AI can't replace creativity",
    "Sales measure true success",
    "Human connection drives WA business",
    "The primary barrier to digital transformation is financial investment",
  ];

  const renderTitle = () => {
    const words = title.split(" ");
    return words
      .map((word, index) => {
        if (word.toLowerCase() === "technology") {
          return (
            <span key={index} className={styles.gradientText}>
              {word}
            </span>
          );
        }
        return <span key={index}>{word}</span>;
      })
      .reduce((prev: (JSX.Element | string)[], curr: JSX.Element | string) => {
        return [...prev, " ", curr];
      }, [] as (JSX.Element | string)[]);
  };

  return (
    <main className={styles.openingWrapper}>
      <div className={styles.container}>
        <div className={styles.bulletsWrapper}>
          <ul className={styles.bullets}>
            {bullets.map((text, idx) => (
              <li key={idx}>{text}</li>
            ))}
          </ul>
        </div>

        <h1 className={styles.title}>{renderTitle()}</h1>
          <Button variant="purple" onClick={onNext}>
            {buttonText}
          </Button>
      </div>
    </main>
  );
}
