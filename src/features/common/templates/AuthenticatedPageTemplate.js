import React from 'react';
import PropTypes from 'prop-types';
// import classNames from 'classnames';
import { Mobile, TabletOrDesktop } from '@ecster/ecster-components';
import MessagePanel from '../MessagePanel';
import MobileNavigation from '../navigation/MobileNavigation';
import TabletDesktopNavigation from '../navigation/TabletDesktopNavigation';

export default class AuthenticatedPageTemplate extends React.Component {
    render() {
        const header = this.props.header && (
            <div className="hero-header">
                <h1>{this.props.header}</h1>
            </div>
        );

        return (
            <React.Fragment>
                <div className="common-authenticated-page">
                    <TabletOrDesktop>
                        <TabletDesktopNavigation />
                    </TabletOrDesktop>
                    {header}
                    <div className="page-content">{this.props.children}</div>
                    <Mobile>
                        <MobileNavigation />
                    </Mobile>
                </div>
                <MessagePanel />
            </React.Fragment>
        );
    }
}

AuthenticatedPageTemplate.propTypes = {
    header: PropTypes.string,
    children: PropTypes.node.isRequired,
};

AuthenticatedPageTemplate.defaultProps = {
    header: undefined,
};
