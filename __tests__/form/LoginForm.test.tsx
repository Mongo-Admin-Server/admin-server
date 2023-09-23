/* eslint-disable no-undef */
import React from 'react';
import { render } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import { store } from '@/store/store';
import { Provider } from 'react-redux';
import LoginForm from '@/app/[locale]/components/form/login/LoginForm';

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

describe("LoginForm", () => {
  it('renders', () => {
    const locale = 'fr';
    const message = require(`../../shared/locales/${locale}.json`)
    const { container } = render(
      <Provider store={store}>
        <NextIntlClientProvider locale={locale} messages={message}>
          <LoginForm />
        </NextIntlClientProvider>
      </Provider>
    );
    expect(container).toMatchSnapshot();
  })
})