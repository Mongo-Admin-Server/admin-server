'use client'
import { I18nProviderClient } from '../../locales/clients';
import fr from '../../locales/fr';
import './globals.css';
import { Inter } from 'next/font/google';

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
      <body className={inter.className}>
        <I18nProviderClient locale={locale} fallback={<p> Loading...</p>} fallbackLocale={fr}>
          {children}
        </I18nProviderClient>
      </body>
    </html>
  );
}
