/* eslint-disable no-undef */
import React from 'react';
import { render } from '@testing-library/react';
import Title from '@/app/[locale]/components/title/Title';

describe('Title', () => {
    it('renders', () => {
      const handleClose = jest.fn();
      const { container } = render(
        <Title 
          title='Mock Title'
          isViewSearch
          searchPlaceholder='Mock placeholder'
          actions={['refresh','add']}
          searchValue='Rearch value'
          onClick={handleClose}
        />
      )
      expect(container).toMatchSnapshot();
    })
  })