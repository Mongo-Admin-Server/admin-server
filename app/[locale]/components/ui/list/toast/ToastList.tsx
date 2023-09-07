'use client';

import { useEffect, useState } from "react";

import styles from './toastList.module.scss';

import Toast from '@components/ui/toast/Toast';

import eventEmitter from '@/shared/emitter/events';

interface ToastListProps {
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
}

const ToastList = () => {
  const [listNotification, setListNotification] = useState<ToastListProps[]>([]);

  useEffect(() => {
    eventEmitter.subscribe('alert', (event) => {
      setListNotification((prev) => [event, ...prev]);
    });
  }, []);

  const handleClose = (index: number) => {
    setListNotification((prev) => prev.filter((_, i) => i !== index));
    console.log('close', listNotification);
  };

  return (
    <div className={styles['toast-list']}>
      {listNotification.map((notification, index) => (
        <Toast key={index} type={notification.type} message={notification.message} onClose={() => handleClose(index)} />
      ))}
    </div>
  );
}

export default ToastList;