/*
 * Package Import
 */
import React from 'react';
import { should } from 'chai';
import { shallow } from 'enzyme';


/*
 * Local Import
 */
import App from 'src/components/App';


/*
 * Code
 */
should();


/*
 * Test
 */
describe('__Component: <App />__', () => {
  it('should be a function', () => {
    App.should.be.a('function');
  });

  it('should render', () => {
    const wrapper = shallow(<App />);
    wrapper.should.have.length(1);
  });
});
