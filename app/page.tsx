'use client';

import { useEffect } from 'react';

import { useDispatch } from '@/store/store';
import { setTheme } from '@/domain/usecases/setting-slice';

import { redirect } from 'next/navigation';

export default function RootPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('RootPage useEffect');
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
      const newColorScheme = e.matches ? "dark" : "light";
      dispatch(setTheme(newColorScheme));
    });

    const colorScheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    dispatch(setTheme(colorScheme));
  }, [dispatch]);

  redirect('/en');
}