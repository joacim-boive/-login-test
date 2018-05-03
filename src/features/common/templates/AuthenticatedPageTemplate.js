import React from 'react';
import PropTypes from 'prop-types';
import { Mobile, TabletOrDesktop } from '@ecster/ecster-components';
import MobileNavigation from '../navigation/MobileNavigation';
import TopNavigation from '../navigation/DesktopTabletNavigation';

export default class AuthenticatedPageTemplate extends React.Component {
    render() {
        return (
            <div className="common-authenticated-page">
                <TabletOrDesktop>
                    <TopNavigation />
                </TabletOrDesktop>
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
