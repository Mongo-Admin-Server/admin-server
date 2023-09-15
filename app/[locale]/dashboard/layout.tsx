'use client';
import { useEffect } from 'react';

import styles from './dashboard.module.scss';

import SideMenu from '@components/menu/SideMenu';

import { useDispatch } from '@/store/store';
import { fetchAllDatabase } from '@/domain/usecases/database-slice';

export default function DashboardLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllDatabase());
  }, [dispatch]);

  return (
    <main className={styles.main}>
      <SideMenu />
      <section className={styles.container}>{children}</section>
    </main>
  );
}
