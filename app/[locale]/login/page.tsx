'use client'
import LoginForm from '@components/form/login/LoginForm';
import LoginIllustration from '@components/form/login-illustration/LoginIllustration';
import styles from './connexion.module.scss';

export default function LoginPage() {
  return (
    <main className={styles.main}>
      <section className={styles.left}>
        <LoginForm />
      </section>
      <section className={styles.right}>
        <LoginIllustration />
      </section>
    </main>
  );
}
