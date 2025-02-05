import styles from "../styles.module.css";

export const Fraction = ({ top = 1, bottom = 1 }) => (
  <div className={styles.frac}>
    <span className={styles.top}>{top}</span>
    <span className={styles.symbol}>/</span>
    <span className={styles.bottom}>{bottom}</span>
  </div>
);
