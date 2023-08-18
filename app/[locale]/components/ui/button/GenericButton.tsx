import { useMemo } from 'react';

import styles from './button.module.scss';

import SvgIcon from '@components/ui/icon/SvgIcon';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  size?: 'small' | 'auto' | 'full';
  disabled?: boolean;
  padding?: string;
  outline?: boolean;
  center?: boolean;
  transparent?: boolean;
  icon_name?: string;
  variant?: 'danger' | 'warning' | 'success' | 'info'; 
}

const GenericButton = ({
  children,
  onClick,
  type = 'button',
  disabled = false,
  size = 'full',
  padding,
  outline = false,
  center,
  transparent,
  variant,
  icon_name,
}: ButtonProps) => {

  const buttonClass = useMemo(() => {
    const dimensions = {
      small: styles["small"],
      auto: styles["auto"],
      full: styles["full"],
    };
    const variants = {
      danger: styles["danger"],
      warning: styles["warning"],
      success: styles["success"],
      info: styles["info"],
    };

    const _arr = [styles["button"]];
    _arr.push(dimensions[size]);
    if (outline) _arr.push(styles.outline);
    if (center) _arr.push(styles.center);
    if (transparent) _arr.push(styles.transparent);
    if (variant) _arr.push(variants[variant]);

    return _arr.join(' ');
  }, [size, outline, center, transparent, variant]);

  const icon = useMemo(() => {
    if (icon_name) {
      return <SvgIcon icon_name={icon_name} className={styles.icon} />;
    }
  }, [icon_name]);

  return (
    <button
      className={buttonClass}
      onClick={onClick}
      type={type}
      disabled={disabled}
      style={{ padding }}
    >
      {icon}
      {children}
    </button>
  );
};

export default GenericButton;
