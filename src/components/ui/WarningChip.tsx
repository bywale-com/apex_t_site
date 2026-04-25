import styles from "./WarningChip.module.css";

interface WarningChipProps {
  text: string;
}

export function WarningChip({ text }: WarningChipProps) {
  return (
    <div className={styles.chip}>
      <span className={styles.icon}>⚠</span>
      <span className={styles.text}>{text}</span>
    </div>
  );
}
