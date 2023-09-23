/* eslint-disable no-undef */
import React from 'react';
import { render, screen } from '@testing-library/react';
import ConfirmModal from '@/app/[locale]/components/modal/confirm/ConfirmModal';
import { NextIntlClientProvider } from 'next-intl';

describe('ConfirmModal', () => {
  const locale = 'fr';
  const message = require(`../../shared/locales/${locale}.json`)
  it('renders', () => {
    const handleClose = jest.fn();
    const handleConfirm = jest.fn();
    const { container } = render(
      <NextIntlClientProvider locale={locale} messages={message}>
        <ConfirmModal 
          open={true}
          description='Common Confirm Modal'
          onClose={handleClose}
          onConfirm={handleConfirm} 
        />
      </NextIntlClientProvider>
    )
    expect(container).toMatchSnapshot();
  })
})