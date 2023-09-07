'use client';

import { useEffect, useMemo, useState } from 'react';

import styles from './toast.module.scss';

import SvgIcon from '@components/ui/icon/SvgIcon';

import eventEmitter from "@/shared/emitter/events";

interface ToastProps {
  type: 'success' | 'error';
  message: string;
}

const Toast = () => {
  const [visible, setVisible] = useState(false);
  const [status, setStatus] = useState<ToastProps['type'] | null>(null);
  const [message, setMessage] = useState<ToastProps['message']>('');

  useEffect(() => {
    eventEmitter.subscribe('alert', (event: ToastProps) => {
      setStatus(event.type);
      setMessage(event.message);
      setVisible(true);
      
      setTimeout(() => {
        setVisible(false);
      }, 5000);
    });
  }, [visible]);

  const toastClasses = useMemo(() => {
    const _arr = [styles['toast']];
    if (visible) _arr.push(styles['toast--open']);
    if (status) _arr.push(styles[`toast--${status}`]);

    return _arr.join(' ');
  }, [visible, status]);

  const iconMap = useMemo(() => {
    return {
      success: <SvgIcon className={styles['toast--success--icon']} icon_name="success" />,
      error: <SvgIcon className={styles['toast--error--icon']} icon_name="error" />,
    };
  }, []);

  const toastIcon = status ? iconMap[status] : null;

  return (
    <div className={toastClasses} role="alert">
      <div className={styles['toast--message']}>
        {toastIcon}
        <h3>{message}</h3>
      </div>
      <SvgIcon className={styles['toast--close']} icon_name="close" onClick={() => setVisible(false)} />
    </div>
  );
}

export default Toast;