import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';
import ConnectedDefaultPage, { LoginPage } from 'src/features/home/LoginPage';

describe('features/home/DefaultPage', () => {
  it('redux connect works', () => {
    const pageProps = {
      home: {},
      actions: {},
    };
    const store = createStore(state => state, pageProps);

    const wrapper = mount(
      <Provider store={store}>
        <ConnectedDefaultPage />
      </Provider>
    );

    expect(
      wrapper.find('.home-login-page').length
    ).to.equal(1);
  });

  it('should render node with correct class name', () => {
    const pageProps = {
      home: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <LoginPage {...pageProps} />
    );

    expect(
      renderedComponent.find('.home-login-page').getElement()
    ).to.exist;
  });

});
