import React, { Component } from 'react';
import { whyDidYouUpdate } from 'why-did-you-update';
import PropTypes from 'prop-types';

if (process.env.NODE_ENV !== 'production') {
    whyDidYouUpdate(React);
}

/*
  This is the root component of your app. Here you define the overall layout
  and the container of the react router. The default one is a two columns layout.
  You should adjust it according to the requirement of your app.
*/
export default class App extends Component {
    static propTypes = {
        children: PropTypes.node,
    };

    static defaultProps = {
        children: 'No content.',
    };

    render() {
        return (
            <div className="home-app">
                <div className="page-container">{this.props.children}</div>
            </div>
        );
    }
}
