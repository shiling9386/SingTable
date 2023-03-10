import styles from "./Switch.module.scss";

interface SwitchProps {
  checked: boolean;
  onToggle: () => void;
}
export const Switch = (props: SwitchProps) => {
  const { checked, onToggle } = props;

  return (
    <label className={styles.switch}>
      <input type="checkbox" checked={checked} onChange={onToggle} />
      <span className={styles.slider}></span>
    </label>
  );
};
