'use client';

import { useCallback, useEffect } from 'react';

import { useDispatch, useSelector } from '@/store/store';
import { setTheme } from '@/domain/usecases/setting-slice';
import { testInstance, selectLoadingAuth, selectErrorAuth } from '@/domain/usecases/auth-slice';

import { useRouter } from 'next/navigation';

export default function RootPage() {
  const dispatch = useDispatch();
  const router = useRouter();

  const loading = useSelector(selectLoadingAuth);
  const error = useSelector(selectErrorAuth);

  const testConnexionInstance = useCallback(async () => {
    const { payload } = await dispatch(testInstance());
    if (payload) router.push('dashboard');
  }, [dispatch, router]);

  useEffect(() => {
    testConnexionInstance();
  }, [testConnexionInstance]);

  useEffect(() => {
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
      const newColorScheme = e.matches ? "dark" : "light";
      dispatch(setTheme(newColorScheme));
    });

    const colorScheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    dispatch(setTheme(colorScheme));
  }, [dispatch]);

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
    </div>
  );
}