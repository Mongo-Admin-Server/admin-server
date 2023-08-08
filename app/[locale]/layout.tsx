'use client';
import { Inter } from 'next/font/google';

import { I18nProviderClient } from '@/shared/locales/clients';
import fr from '@/shared/locales/fr';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string }
}) {
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
