'use client'
import LoginForm from '../components/login/login-form/LoginForm';
import LoginIllustration from '../components/login/login-illustration/LoginIllustration';
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
