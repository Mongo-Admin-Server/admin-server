import { Inter } from 'next/font/google';
import { notFound } from 'next/navigation';
import { createTranslator, NextIntlClientProvider } from 'next-intl';
import { ReactNode } from 'react';

import ToastList from '@components/ui/list/toast/ToastList';

const inter = Inter({subsets: ['latin']});

type Props = {
  children: ReactNode;
  params: {locale: string};
};

async function getMessages(locale: string) {
  try {
    return (await import(`../../shared/locales/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }
}

export async function generateStaticParams() {
  return ['en', 'fr', 'es'].map((locale) => ({locale}));
}

export async function generateMetadata({params: {locale}}: Props) {
  const messages = await getMessages(locale);
  const t = createTranslator({locale, messages});

  return {
    title: t('metadata.title')
  };
}

export default async function LocaleLayout({
  children,
  params: {locale}
}: Props) {
  const messages = await getMessages(locale);

  return (
    <html lang={locale}>
      <body className={inter.className} cz-shortcut-listen="true">
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
          <ToastList />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
