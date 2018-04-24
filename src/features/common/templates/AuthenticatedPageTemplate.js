import React from 'react';
import PropTypes from 'prop-types';
import { Mobile } from '@ecster/ecster-components';
import MobileNavigation from '../navigation/MobileNavigation';

export default class AuthenticatedPageTemplate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showSubMenu: false,
        };
    }

    componentDidUpdate(prevProps, prevState) {
        console.log('did update: ', this.state, prevProps, prevState);
    }

    showSubMenu = e => {
        e.stopPropagation();
        e.preventDefault();
        this.setState({ showMoreSubMenu: true }, () => {
            console.log('I setted de state', this.state);
        });
    };

    closeSubMenu = () => {
        this.setState({ showMoreSubMenu: false }, () => {
            console.log('I setted de state');
        });
    };

    render() {
        return (
            <div className="common-authenticated-page">
                <div className="page-content">
                    {this.props.children}
                </div>
                <Mobile>
                    <MobileNavigation />
                </Mobile>
            </div>
        );
    }
}

AuthenticatedPageTemplate.propTypes = {
    children: PropTypes.node.isRequired,
};
