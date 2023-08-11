'use client';
import { useEffect } from 'react';
import { Inter } from 'next/font/google';

import { I18nProviderClient } from '@/shared/locales/clients';
import fr from '@/shared/locales/fr';

import { useDispatch } from '@/store/store';
import { setTheme } from '@/domain/usecases/setting-slice';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string }
}) {
  const dispatch = useDispatch();

  useEffect(() => {
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
      const newColorScheme = e.matches ? "dark" : "light";
      dispatch(setTheme(newColorScheme));
    });
  }, [dispatch]);
  return (
    <html lang={locale}>
      <body className={inter.className} cz-shortcut-listen="true">
        <I18nProviderClient locale={locale} fallback={<p> Loading...</p>} fallbackLocale={fr}>
          {children}
        </I18nProviderClient>
      </body>
    </html>
  );
}
