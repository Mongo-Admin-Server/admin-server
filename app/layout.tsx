'use client';
import { useEffect } from 'react';

import '@/shared/styles/main.scss';

import { store } from '@/store/store';
import { Provider } from 'react-redux';

// import { useDispatch } from '@/store/store';
// import { setTheme } from '@/domain/usecases/setting-slice';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
  //     const newColorScheme = e.matches ? "dark" : "light";
  //     dispatch(setTheme(newColorScheme));
  //   });

  //   const colorScheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  //   dispatch(setTheme(colorScheme));
  // }, [dispatch]);

  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
}

