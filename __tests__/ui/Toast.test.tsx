/* eslint-disable no-undef */
import React from 'react';
import { render, screen } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import Toast from '@/app/[locale]/components/ui/toast/Toast';

jest.mock('next-intl/client', () => ({
  usePathname() {
    return '';
  },
  useRouter() {
    return {
      push: () => jest.fn(),
      replace: () => jest.fn(),
    };
  },
}));

const locale = 'fr';
const message = require(`../../shared/locales/${locale}.json`)

describe("FormCreateDB", () => {
  it('renders', () => {
    const handleClose = jest.fn();
    const { container } = render(
      <NextIntlClientProvider locale={locale} messages={message}>
        <Toast
          type='success'
          message='Mock success message'
          onClose={handleClose}
        />
      </NextIntlClientProvider>
     
    );
    expect(container).toMatchSnapshot();
  })
})