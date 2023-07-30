import styles from './button.module.scss';

import SvgIcon from '@components/ui/icon/SvgIcon';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  width?: string;
  height?: string;
  padding?: string;
  icon_name?: string
}

const GenericButton = ({ children, onClick, type = 'button', disabled = false, width, height, padding, icon_name }: ButtonProps) => {
  return (
    <button 
      className={styles.button}
      onClick={onClick} 
      type={type}
      disabled={disabled}
      style={{ 
        width, 
        height,
        padding,
      }}
    >
      {icon_name && <SvgIcon icon_name={icon_name} />}
      {children}
    </button>
  );
}

export default GenericButton;