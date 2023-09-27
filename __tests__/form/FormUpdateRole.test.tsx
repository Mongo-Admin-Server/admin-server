/* eslint-disable no-undef */
import React from 'react';
import { render, screen } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import { store } from '@/store/store';
import { Provider } from 'react-redux';
import FormUpdateRole from '@/app/[locale]/components/form/form-update-role/FormUpdateRole';

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
const mockUser = {
  "userId": "b4c2885f-c976-4f1e-8de1-0481659eb5ce",
  "user": "itachiUchiwa",
  "db": "localDbUser",
  "roles": [
    {
      "role": "readWrite",
      "db": "localDbUser"
    }
  ]
}

describe("FormUpdateRole", () => {
  it('renders', () => {
    const handleClose = jest.fn();
    const { container } = render(
      <Provider store={store}>
        <NextIntlClientProvider locale={locale} messages={message}>
          <FormUpdateRole
            userName={mockUser}
            open={true}
            onClose={handleClose}
          />
        </NextIntlClientProvider>
      </Provider>
    );
    expect(container).toMatchSnapshot();
  })
})