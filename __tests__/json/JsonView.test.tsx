/* eslint-disable no-undef */
import React from 'react';
import { render } from '@testing-library/react';
import { store } from '@/store/store';
import { Provider } from 'react-redux';
import JsonView from '@/app/[locale]/components/json/JsonView';

describe("JsonView", () => {
  it('renders', () => {
    const { container } = render(
      <Provider store={store}>
        <JsonView json={JSON} />
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });
})