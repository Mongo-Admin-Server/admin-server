'use client';

import { useEffect, useMemo, useState } from 'react';

import styles from './toast.module.scss';

import SvgIcon from '@components/ui/icon/SvgIcon';

interface ToastProps {
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  onClose: () => void;
}

const Toast = ({ type, message, onClose }: ToastProps) => {
  const [visible, setVisible] = useState<boolean>(false);
  
  useEffect(() => {
    setVisible(true);
    setTimeout(() => {
      setVisible(false);
      onClose();
    }, 5000);
  }, [onClose]);

  const handleClose = () => {
    setVisible(false);
    onClose();
  };

  const toastClasses = useMemo(() => {
    const _arr = [styles['toast']];
    if (visible) _arr.push(styles['toast--open']);
    if (type) _arr.push(styles[`toast--${type}`]);

    return _arr.join(' ');
  }, [type, visible]);

  const iconMap = useMemo(() => {
    return {
      success: <SvgIcon className={styles['toast--success--icon']} icon_name="success" />,
      error: <SvgIcon className={styles['toast--error--icon']} icon_name="error" />,
      warning: <SvgIcon className={styles['toast--warning--icon']} icon_name="warning" />,
      info: <SvgIcon className={styles['toast--info--icon']} icon_name="info" />,
    };
  }, []);

  const toastIcon = type ? iconMap[type] : null;

  return (
    <div className={toastClasses} role="alert">
      <div className={styles['toast--message']}>
        {toastIcon}
        <h3>{message}</h3>
      </div>
      <SvgIcon className={styles['toast--close']} icon_name="close" onClick={handleClose} />
    </div>
  );
}

export default Toast;