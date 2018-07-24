import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { Mobile, TabletOrDesktop } from '@ecster/ecster-components';
import MobileNavigation from '../navigation/MobileNavigation';
import TabletDesktopNavigation from '../navigation/TabletDesktopNavigation';
import MessagePanel from '../MessagePanel';

export default class AuthenticatedSubPageTemplate extends React.Component {
    render() {
        const { className, linkTo, header } = this.props;

        const classes = classNames({
            'common-authenticated-sub-page': true,
            [className]: className,
        });

        const renderHeader = header && (
            <div className="hero-header">
                <div>
                    <Link to={linkTo} href={linkTo}>
                        <i className="icon-arrow-left" />
                    </Link>
                    <h1>{header}</h1>
                </div>
            </div>
        );

        return (
            <React.Fragment>
                <div className={classes}>
                    <TabletOrDesktop>
                        <TabletDesktopNavigation />
                    </TabletOrDesktop>
                    <div className="page-container">
                        {renderHeader}
                        <div className="page-content">{this.props.children}</div>
                    </div>
                    <Mobile>
                        <MobileNavigation />
                    </Mobile>
                </div>
                <MessagePanel />
            </React.Fragment>
        );
    }
}

AuthenticatedSubPageTemplate.propTypes = {
    className: PropTypes.string,
    header: PropTypes.string,
    linkTo: PropTypes.string,
    children: PropTypes.node.isRequired,
};

AuthenticatedSubPageTemplate.defaultProps = {
    className: '',
    header: undefined,
    linkTo: '',
};
