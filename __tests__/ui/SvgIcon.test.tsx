/* eslint-disable no-undef */
import React from 'react';
import { render } from '@testing-library/react';
import SvgIcon from '@/app/[locale]/components/ui/icon/SvgIcon';
import CaretUpDown from '@/public/icons/caretUpDown.svg';

describe("SvgIcon", () => {
  it("renders SvgIcon", () => {
    const { container } = render(<SvgIcon icon_name='caretUpDown' />);
    expect(container).toMatchSnapshot();
  })
})