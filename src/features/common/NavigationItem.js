import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class NavigationItem extends Component {
    static propTypes = {
        text: PropTypes.string.isRequired,
        target: PropTypes.string.isRequired,
    };

    render() {
        const { text, target } = this.props;

        return (
            <li className="common-navigation__item">
                <a href={target}>{text}</a>
                <i className="icon-chevron-right e-green" />
            </li>
        );
    }
}
