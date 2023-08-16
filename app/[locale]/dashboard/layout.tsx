'use client';
import { useEffect } from 'react';

import { I18nProviderClient } from '@/shared/locales/clients';
import fr from '@/shared/locales/fr';

import styles from './dashboard.module.scss';

import SideMenu from '@components/menu/SideMenu';

import { useDispatch } from '@/store/store';
import { fetchAllDatabase } from '@/domain/usecases/database-slice';

export default function DashboardLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string }
}) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllDatabase());
  }, [dispatch]);

  return (
    <I18nProviderClient locale={locale} fallback={<p> Loading...</p>} fallbackLocale={fr}>
      <main className={styles.main}>
        <SideMenu />
          <section className={styles.container}>{children}</section>
      </main>
    </I18nProviderClient>
  );
}
