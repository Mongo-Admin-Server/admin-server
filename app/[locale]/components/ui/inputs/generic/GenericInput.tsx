import { useMemo, useState } from 'react';

import styles from './input.module.scss';

import SvgIcon from '@/app/[locale]/components/ui/icon/SvgIcon';

interface GenericInputProps {
  label?: string;
  value: string;
  // eslint-disable-next-line no-unused-vars
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDownEnter?: () => void;
  type: 'text' | 'password' | 'email' | 'number';
  placeholder?: string;
  error?: string;
  className?: string;
}

const GenericInput = ({
  label,
  value,
  onChange,
  onKeyDownEnter,
  type,
  placeholder,
  error,
  className,
}: GenericInputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const inputClass = useMemo(() => {
    const _arr = [styles['input-container']];
    if (className) _arr.push(className);

    return _arr.join(' ');
  }, [className]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && onKeyDownEnter) onKeyDownEnter();
  };

  return (
    <div className={inputClass}>
      {label && <label className={styles.label}>{label}</label>}
      <input
        className={`${styles.input} ${error ? styles.inputError : ''}`}
        type={type === 'password' && showPassword ? 'text' : type}
        value={value}
        onChange={onChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
      />

      {type === 'password' && (
        <div
          className={styles.iconContainer}
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? (
            <SvgIcon icon_name="eye" />
          ) : (
            <SvgIcon icon_name="eyeSlash" />
          )}
        </div>
      )}

      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};

export default GenericInput;
