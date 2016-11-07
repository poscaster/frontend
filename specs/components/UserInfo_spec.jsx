import { expect } from 'chai';
import { render } from 'enzyme';
import { describe, it } from 'mocha';
import React from 'react';

import UserInfo from '../../src/components/UserInfo/UserInfo';

describe('UserInfo', () => {
  it('has proper login', () => {
    const user = { login: 'testlogin' };
    const component = render(<UserInfo user={user} />);

    expect(component.find('.UserInfo__Line')).to.have.text('Logged in as: testlogin');
  });
});
