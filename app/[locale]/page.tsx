'use client';

import LoginForm from '@components/form/login/LoginForm';
import styles from './login.module.scss';

export default function LoginPage() {
  return (
    <main className={styles['login-page']}>
      <section className={styles['login-page--form']}>
        <LoginForm />
      </section>
      <section className={styles['login-page--image']}>
        <div className={styles.container}>
          <div className={styles.imageDecorative} />
        </div>
      </section>
    </main>
  );
}
