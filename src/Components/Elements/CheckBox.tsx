import styles from "./CheckBox.module.scss";

interface CheckBoxProps {
  onSelect: (selected: boolean) => void;
  checked: boolean;
}
const CheckBox = ({ onSelect, checked }: CheckBoxProps) => {
  return (
    <label className={styles.checkbox}>
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onSelect(event.target.checked)}
      />
      <span className={styles.checkmark}></span>
    </label>
  );
};

export default CheckBox;
