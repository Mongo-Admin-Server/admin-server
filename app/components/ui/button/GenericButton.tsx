import styles from './button.module.scss';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  width?: string;
  height?: string;
}

const GenericButton = ({ children, onClick, type = 'button', disabled = false, width, height,
}: ButtonProps) => {
  return (
    <button 
      className={styles.button}
      onClick={onClick} 
      type={type}
      disabled={disabled}
      style={{ 
        width, 
        height,
      }}
    >
      {children}
    </button>
  );
}

export default GenericButton;