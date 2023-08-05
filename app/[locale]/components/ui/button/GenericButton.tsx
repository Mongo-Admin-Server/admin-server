import styles from './button.module.scss';

import SvgIcon from '@/app/[locale]/components/ui/icon/SvgIcon';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  width?: string;
  height?: string;
  padding?: string;
  border?: string;
  color?: string;
  background?: string;
  center?: boolean;
  icon_name?: string;
}

const GenericButton = ({
  children,
  onClick,
  type = 'button',
  disabled = false,
  width,
  height,
  padding,
  border,
  background,
  color,
  center,
  icon_name,
}: ButtonProps) => {
  return (
    <button
      className={`${styles.button} ${center ? styles.center : ''}`}
      onClick={onClick}
      type={type}
      disabled={disabled}
      style={{
        width,
        height,
        padding,
        border,
        color,
        background,
      }}
    >
      {icon_name && <SvgIcon icon_name={icon_name} />}
      {children}
    </button>
  );
};

export default GenericButton;
