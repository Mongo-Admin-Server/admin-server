import styles from './checkbox.module.scss';

interface CheckboxProps {
  id?: string;
  label: string;
  value: boolean;
  disabled?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

const Checkbox = ({ id, label, value, disabled, onChange, error }: CheckboxProps) => {
  return (
    <div className={styles.container}>
      <label htmlFor={id} className={styles.label}>
        <input
          id={id}
          className={`${styles.input} ${error ? styles.inputError : ''}`}
          type='checkbox'
          disabled={disabled}
          checked={value}
          onChange={onChange}
        />
        {label}
      </label>

      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
}

export default Checkbox;