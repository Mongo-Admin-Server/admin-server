/* eslint-disable no-undef */
import React from 'react';
import { render, screen } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import { store } from '@/store/store';
import { Provider } from 'react-redux';
import LanguageModal from '@/app/[locale]/components/modal/language/LanguageModal';

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

describe("LanguageModal", () => {
  const locale = 'fr';
  const message = require(`../../shared/locales/${locale}.json`)
  it("renders", () => {
    const handleClose = jest.fn();
    const { container } = render(
      <Provider store={store}>
        <NextIntlClientProvider locale={locale} messages={message}>
          <LanguageModal 
            open={false}
            onClose={handleClose}
          />
        </NextIntlClientProvider>
      </Provider>
    );
    const title = screen.getByText('Langue');
    expect(title).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  })
})