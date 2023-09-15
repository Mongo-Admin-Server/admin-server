'use client';

import { useEffect } from 'react';

import { useDispatch } from '@/store/store';
import { setTheme } from '@/domain/usecases/setting-slice';

export default function RootPage({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();

  useEffect(() => {
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
      const newColorScheme = e.matches ? "dark" : "light";
      dispatch(setTheme(newColorScheme));
    });

    const colorScheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    dispatch(setTheme(colorScheme));
  }, [dispatch]);

  return (
    <>
      {children}
    </>
  );
}