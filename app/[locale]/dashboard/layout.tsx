'use client'
import SideMenu from '@/app/[locale]/components/menu/SideMenu';
import { I18nProviderClient } from '../../../shared/locales/clients';
import fr from '../../../shared/locales/fr';
import styles from './dashboard.module.scss';

export default function DashboardLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string }
}) {
  return (
    <I18nProviderClient locale={locale} fallback={<p> Loading...</p>} fallbackLocale={fr}>
      <main className={styles.main}>
        <SideMenu />
          <section className={styles.container}>{children}</section>
      </main>
    </I18nProviderClient>
  );
}
