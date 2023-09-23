/* eslint-disable no-undef */
import React from 'react';
import { render, screen } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import { store } from '@/store/store';
import { Provider } from 'react-redux';
import FormCreateCollection from '@/app/[locale]/components/form/form-create-collection/FormCreateCollection';

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

  describe("FormCreateCollection", () => {
    it('renders', () => {
      const handleClose = jest.fn();
      const { container } = render(
        <Provider store={store}>
          <NextIntlClientProvider locale={locale} messages={message}>
            <FormCreateCollection 
              open={true}
              onClose={handleClose}
            />
          </NextIntlClientProvider>
        </Provider>
      );
      expect(container).toMatchSnapshot();
    })
  })