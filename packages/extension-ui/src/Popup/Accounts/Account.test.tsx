// Copyright 2019 @polkadot/extension-ui authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import Adapter from 'enzyme-adapter-react-16';
import { configure, mount, ReactWrapper } from 'enzyme';
import { MemoryRouter } from 'react-router';
import React from 'react';

import Account from './Account';

configure({ adapter: new Adapter() });

describe('Account component', () => {
  let wrapper: ReactWrapper;
  const VALID_ADDRESS = 'HjoBp62cvsWDA3vtNMWxz6c9q13ReEHi9UGHK7JbZweH5g5';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mountAccountComponent = (additionalAccountProperties: any): ReactWrapper => mount(
    <MemoryRouter>
      <Account
        {...{ address: VALID_ADDRESS, ...additionalAccountProperties }}>
      </Account>
    </MemoryRouter>);

  it('shows Export option if account is not external', () => {
    wrapper = mountAccountComponent({ isExternal: false });

    expect(wrapper.find('a').length).toBe(3);
    expect(wrapper.find('a').at(0).text()).toContain('Rename');
    expect(wrapper.find('a').at(1).text()).toContain('Export Account');
    expect(wrapper.find('a').at(2).text()).toContain('Forget Account');
  });

  it('does not show Export option if account is external', () => {
    wrapper = mountAccountComponent({ isExternal: true });

    expect(wrapper.find('a').length).toBe(2);
    expect(wrapper.find('a').at(0).text()).toContain('Rename');
    expect(wrapper.find('a').at(1).text()).toContain('Forget Account');
  });
});
