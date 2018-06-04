import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { Mobile, TabletOrDesktop } from '@ecster/ecster-components';
import MobileNavigation from '../navigation/MobileNavigation';
import TabletDesktopNavigation from '../navigation/TabletDesktopNavigation';

export default class InfoPageTemplate extends React.Component {
    static propTypes = {
        children: PropTypes.node.isRequired,
    };

    render() {
        const { className, linkTo, header } = this.props;

        const classes = classNames({
            'common-info-page': true,
            [className]: className,
        });

        const renderHeader = header && (
            <div className="hero-header">
                <Link to={linkTo} href={linkTo}>
                    <i className="icon-arrow-left" />
                </Link>
                <h1>{header}</h1>
            </div>
        );

        return (
            <div className={classes}>
                <TabletOrDesktop>
                    <TabletDesktopNavigation />
                </TabletOrDesktop>
                <div className="page-content">
                    {renderHeader}
                    {this.props.children}
                </div>
                <Mobile>
                    <MobileNavigation />
                </Mobile>
            </div>
        );
    }
}

InfoPageTemplate.propTypes = {
    className: PropTypes.string,
    header: PropTypes.string,
    linkTo: PropTypes.string,
    children: PropTypes.node.isRequired,
};

InfoPageTemplate.defaultProps = {
    className: '',
    header: undefined,
    linkTo: '',
};
