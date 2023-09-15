import styles from './checkbox.module.scss';

interface CheckboxProps {
  id?: string;
  label: string;
  value: boolean;
  disabled?: boolean;
  // eslint-disable-next-line no-unused-vars
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  color?: string;
  switchCheckbox?: boolean;
}

const Checkbox = ({
  id,
  label,
  value,
  disabled,
  onChange,
  error,
  color,
  switchCheckbox
}: CheckboxProps) => {
  
  return (
    <div className={styles.container}>
      <label htmlFor={id} className={`${styles.label} ${color && styles[color]} ${switchCheckbox && styles.switch} ${value && styles.checked}`}>
        <input
          id={id}
          className={`${styles.input} ${error ? styles.inputError : ''} ${color && styles[color]}`}
          type="checkbox"
          disabled={disabled}
          checked={value}
          onChange={onChange}
        />
        {!switchCheckbox ?
            label
          :
            <div className={`${styles.slider} ${styles.round}`}><label>JSON</label></div>
        }
      </label>
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};

export default Checkbox;
