import SideMenu from "@components/menu/SideMenu";

import styles from './dashboard.module.scss';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className={styles.main}>
      <SideMenu />
      <section className={styles.container}>
        {children}
      </section>
    </main>
  );
}