import styles from './select.module.scss';

import SvgIcon from '@components/ui/icon/SvgIcon';

interface SelectInputProps {
  label?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { value: string; label: string}[];
  error?: string;
}

const SelectInput = ({ label, value, onChange, options, error }: SelectInputProps) => {
  return (
    <div className={styles.container}>
      <label>{label}</label>
      <select
        className={`${styles.select} ${error ? styles.selectError : ''}`}
        value={value}
        onChange={onChange}
      >
        <option value="" disabled>Choisir</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))}
      </select>
      <div className={styles.iconContainer}>
        <SvgIcon icon_name='caretUpDown' />
      </div>

      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
}

export default SelectInput;