/* eslint-disable no-undef */
import React from 'react';
import { render, screen } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import { store } from '@/store/store';
import { Provider } from 'react-redux';
import FormCreateDB from '@/app/[locale]/components/form/from-create-db/FormCreateDB';

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
      <Provider store={store}>
        <NextIntlClientProvider locale={locale} messages={message}>
          <FormCreateDB 
            open={true}
            onClose={handleClose}
          />
        </NextIntlClientProvider>
      </Provider>
    );
    const title = screen.getByText('Créer une base de données');
    expect(title).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  })
})