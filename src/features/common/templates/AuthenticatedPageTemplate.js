import React from 'react';
import PropTypes from 'prop-types';
import { Mobile } from '@ecster/ecster-components';
import MobileNavigation from '../navigation/MobileNavigation';

export default class AuthenticatedPageTemplate extends React.Component {
    render() {
        return (
            <div className="common-authenticated-page">
                <div className="page-content">{this.props.children}</div>
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
