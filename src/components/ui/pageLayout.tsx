"use client";
import Navbar from "./navbar";
import styles from "./PageLayout.module.scss";

interface PageLayoutProps {
  children: React.ReactNode;
  showBack?: boolean;
  onBack?: () => void;
  onRefresh?: () => void;
  footer?: React.ReactNode; 
}

export default function PageLayout({
  children,
  showBack = false,
  onBack,
  onRefresh,
  footer,
}: PageLayoutProps) {
  return (
    <div className={styles.container}>
      <Navbar showBack={showBack} onBack={onBack} onRefresh={onRefresh ?? (() => {})} />
      <main className={styles.content}>{children}</main>
      {footer && <div className={styles.footer}>{footer}</div>}
    </div>
  );
}
