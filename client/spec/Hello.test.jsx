import { configure, shallow } from 'enzyme';
import { expect } from 'chai';

import Adapter from 'enzyme-adapter-react-16';

import React from 'react';
import Hello from '@Components/Hello';

configure({ adapter: new Adapter() });

describe('Hello Component', () => {
  it('it should render name props when supplied.', () => {
    const name = 'DuHyun Kim';

    const wrapper = shallow(<Hello name={name} />);

    const expectedContainedHeader = <h1>Hello, DuHyun Kim!</h1>;

    const actualValue = wrapper.contains(expectedContainedHeader);

    expect(actualValue).to.equal(true);
  });
});
