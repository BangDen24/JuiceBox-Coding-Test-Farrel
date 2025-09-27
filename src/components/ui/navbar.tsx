"use client";

import { ArrowLeft, MoveLeft, RefreshCcw } from "lucide-react";
import styles from "../../styles/navbar.module.scss";
import Image from "next/image";

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
  return (
    <nav className={styles.navbar}>
      {/* Back button */}
      {showBack ? (
        <button aria-label="Back" onClick={onBack} className={styles.navButton}>
          <ArrowLeft strokeWidth={2.75} width={20} height={20} className={styles.navButtonIcon} />
        </button>
      ) : (
        <div className={styles.spacer} />
      )}
     <Image src="/navlogo.svg" alt="Logo" className={styles.navLogo} width={100} height={24} />
      <button
        aria-label="Refresh"
        onClick={onRefresh}
        className={`${styles.navButton}`}
      >
        <RefreshCcw strokeWidth={2.75} width={20} height={20} className={styles.navButtonIcon} />
      </button>
    </nav>
  );
}
