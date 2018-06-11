import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Mobile, TabletOrDesktop } from '@ecster/ecster-components';
import MessagePanel from '../MessagePanel';
import MobileNavigation from '../navigation/MobileNavigation';
import TabletDesktopNavigation from '../navigation/TabletDesktopNavigation';

export default class AuthenticatedPageTemplate extends React.Component {
    render() {
        const { className } = this.props;

        const classes = classNames({
            'common-authenticated-page': true,
            [className]: className,
        });

        const header = this.props.header && (
            <div className="hero-header">
                <h1>{this.props.header}</h1>
            </div>
        );

        return (
            <React.Fragment>
                <div className={classes}>
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
    className: PropTypes.string,
    header: PropTypes.string,
    children: PropTypes.node.isRequired,
};

AuthenticatedPageTemplate.defaultProps = {
    className: '',
    header: undefined,
};
