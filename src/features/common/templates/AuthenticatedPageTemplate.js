import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Mobile, TabletOrDesktop } from '@ecster/ecster-components';
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
