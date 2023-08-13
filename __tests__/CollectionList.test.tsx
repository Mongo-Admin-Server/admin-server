/* eslint-disable no-undef */
import React from 'react';
import { render } from '@testing-library/react';
import CollectionList from '@/app/[locale]/components/ui/list/collection/CollectionList';

const mock = {
  collections: ['mock1', 'mock2']
};

describe('CollectionsList', () => {
  it('renders', () => {
    const { container } = render(<CollectionList collections={mock.collections} />)
    expect(container).toMatchSnapshot();
  })
})
