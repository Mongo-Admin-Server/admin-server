import type { Metadata } from 'next'
import { Inter } from 'next/font/google';
import { notFound } from 'next/navigation';
import { createTranslator, NextIntlClientProvider } from 'next-intl';
import { ReactNode } from 'react';

import '@/shared/styles/main.scss';

import ToastList from '@components/ui/list/toast/ToastList';

import StoreProvider from '@/store/provider';

const inter = Inter({subsets: ['latin']});

export const metadata: Metadata = {
  title: 'Mongo Admin Server',
  description: 'Mongo Database Manager',
}

type Props = {
  children: ReactNode;
  params: {locale: string};
};

export function generateStaticParams() {
  return [{locale: 'en'}, {locale: 'fr'}, {locale: 'es'}];
}

export default async function LocaleLayout({
  children,
  params: {locale}
}: Props) {
  let messages;
  try {
    messages = (await import(`../../shared/locales/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body className={inter.className} cz-shortcut-listen="true">
        <StoreProvider>
          <NextIntlClientProvider locale={locale} messages={messages}>
            {children}
            <ToastList />
          </NextIntlClientProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
