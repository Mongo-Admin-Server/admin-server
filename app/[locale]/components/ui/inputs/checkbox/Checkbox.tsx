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
}

const Checkbox = ({
  id,
  label,
  value,
  disabled,
  onChange,
  error,
  color,
}: CheckboxProps) => {
  
  return (
    <div className={styles.container}>
      <label htmlFor={id} className={`${styles.label} ${color && styles[color]} ${value && styles.checked}`}>
        <input
          id={id}
          className={`${styles.input} ${error ? styles.inputError : ''} ${color && styles[color]}`}
          type="checkbox"
          disabled={disabled}
          checked={value}
          onChange={onChange}
        />
        {label}
      </label>
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};

export default Checkbox;
