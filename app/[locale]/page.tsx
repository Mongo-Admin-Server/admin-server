'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import LoginForm from '@components/form/login/LoginForm';
import styles from './login.module.scss';

import { selectIsLogged } from '@/domain/usecases/auth-slice';
import { useSelector } from '@/store/store';

export default function LoginPage() {
  const router = useRouter();
  const isLogged = useSelector(selectIsLogged);

  useEffect(() => {
    if (isLogged) router.push('/dashboard');
  }, [isLogged, router]);

  
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
