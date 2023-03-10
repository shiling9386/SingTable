import styles from "./RadioButton.module.scss";

interface RadioButtonProps {
  onSelect: (selected: boolean) => void;
  checked: boolean;
}
const RadioButton = ({ onSelect, checked }: RadioButtonProps) => {
  return (
    <label className={styles.radioDonut}>
      <input
        type="checkbox"
        name="radio-group"
        checked={checked}
        onChange={(event) => onSelect(event.target.checked)}
      />
      <span className={styles.donut}></span>
    </label>
  );
};
export default RadioButton;
