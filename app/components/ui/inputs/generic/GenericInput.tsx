import { useState } from 'react';

import styles from './input.module.scss';

import SvgIcon from '@components/ui/icon/SvgIcon';

interface GenericInputProps {
  label: string;
  value: string;
  // eslint-disable-next-line no-unused-vars
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type: 'text' | 'password' | 'email';
  placeholder?: string;
  error?: string;
}

const GenericInput = ({ label, value, onChange, type, placeholder, error }: GenericInputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={styles.container}>
      <label className={styles.label}>{label}</label>
      <input
        className={`${styles.input} ${error ? styles.inputError : ''}`}
        type={type === 'password' && showPassword ? 'text' : type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />

      {type === 'password' && (
        <div className={styles.iconContainer} onClick={() => setShowPassword(!showPassword)}>
          {showPassword ? <SvgIcon icon_name='eye' /> : <SvgIcon icon_name='eyeSlash' />}
        </div>
      )}
      
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
}

export default GenericInput;