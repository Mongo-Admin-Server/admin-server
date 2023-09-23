/* eslint-disable no-undef */
import React from 'react';
import { render } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import { store } from '@/store/store';
import { Provider } from 'react-redux';
import DocumentModal from '@/app/[locale]/components/modal/document/DocumentModal';

describe('Document Modal', () => {
  const locale = 'fr';
  const message = require(`../../shared/locales/${locale}.json`)
  it('renders', () => {
    const handleClose = jest.fn();
    const handleValidate= jest.fn();
    const { container } = render(
      <Provider store={store}>
        <NextIntlClientProvider locale={locale} messages={message}>
          <DocumentModal 
            open={false}
            onClose={handleClose}
            onValidate={handleValidate}
          />
        </NextIntlClientProvider>
      </Provider>
    );
    expect(container).toMatchSnapshot();
  })
})