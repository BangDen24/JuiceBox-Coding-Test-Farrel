"use client";

import { ArrowLeft, RefreshCcw } from "lucide-react";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import styles from "../../styles/navbar.module.scss";
import { J, U, I, C, E, B, O, X } from "./juiceboxLogo";

interface NavbarProps {
  onBack?: () => void; 
  onRefresh: () => void; 
  showBack?: boolean; 
}

export default function Navbar({
  onBack,
  onRefresh,
  showBack = false,
}: NavbarProps) {
  const logoRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const logoElement = logoRef.current;
    if (!logoElement) return;

    const letters = logoElement.querySelectorAll('svg');
    const jLetter = letters[0]; // J
    const uLetter = letters[1]; // U
    const iLetter = letters[2]; // I
    const cLetter = letters[3]; // C
    const eLetter = letters[4]; // E
    const bLetter = letters[5]; // B
    const oLetter = letters[6]; // O
    const xLetter = letters[7]; // X

    const movingLetters = [uLetter, iLetter, cLetter, eLetter, oLetter, xLetter];
    

    const handleMouseEnter = () => {
      gsap.to(movingLetters, {
        x: -50,
        opacity: 0,
        duration: 0.3,
        ease: "power2.out",
        // stagger: 0.03
      });

      gsap.to(jLetter, {
        x: 55,
        duration: 0.2,
        ease: "power4.inOut"
      });
      gsap.to(bLetter, {
        x: -10,
        duration: 0.4,
        ease: "power4.inOut"
      });
    };

    const handleMouseLeave = () => {
      gsap.to(movingLetters, {
        x: 0,
        opacity: 1,
        duration: 0.4,
        ease: "power2.out",
        // stagger: 0.04
      });

      gsap.to(jLetter, {
        x: 0,
        duration: 0.3,
        ease: "power2.out"
      });

      gsap.to(bLetter, {
        x: 0,
        duration: 0.3,
        ease: "power2.out"
      })
    };

    logoElement.addEventListener('mouseenter', handleMouseEnter);
    logoElement.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      logoElement.removeEventListener('mouseenter', handleMouseEnter);
      logoElement.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <nav className={styles.navbar}>
      {showBack ? (
        <button aria-label="Back" onClick={onBack} className={styles.navButton}>
          <ArrowLeft strokeWidth={2.75} width={20} height={20} className={styles.navButtonIcon} />
        </button>
      ) : (
        <div className={styles.spacer} />
      )}
      
      <div className={styles.logo} ref={logoRef}>
        <J />
        <U />
        <I />
        <C />
        <E />
        <B />
        <O />
        <X />
      </div>

      <button
        aria-label="Refresh"
        onClick={onRefresh}
        className={styles.navButton}
      >
        <RefreshCcw strokeWidth={2.75} width={20} height={20} className={styles.navButtonIcon} />
      </button>
    </nav>
  );
}