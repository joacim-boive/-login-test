import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';
import ConnectedDefaultPage, { StartPage } from 'src/features/home/StartPage';

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
      wrapper.find('.home-start-page').length
    ).to.equal(1);
  });

  it('should render node with correct class name', () => {
    const pageProps = {
      home: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <StartPage {...pageProps} />
    );

    expect(
      renderedComponent.find('.home-start-page').getElement()
    ).to.exist;
  });

});
