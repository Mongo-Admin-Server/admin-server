/* eslint-disable no-undef */
import React from 'react';
import { render } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import { store } from '@/store/store';
import { Provider } from 'react-redux';
import SideMenu from '@/app/[locale]/components/menu/SideMenu';

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
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: () => jest.fn(),
      replace: () => jest.fn(),
    };
  },
}));
const locale = 'fr';
const message = require(`../../shared/locales/${locale}.json`)

describe("SideMenu", () => {
  it('renders', () => {
    const handleClose = jest.fn();
    const { container } = render(
      <Provider store={store}>
        <NextIntlClientProvider locale={locale} messages={message}>
          <SideMenu />
        </NextIntlClientProvider>
      </Provider>
    );
    expect(container).toMatchSnapshot();
  })
})