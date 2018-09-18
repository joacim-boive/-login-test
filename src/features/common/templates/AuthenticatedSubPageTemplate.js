import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Mobile, TabletOrDesktop } from '@ecster/ecster-components';
import MobileNavigation from '../navigation/MobileNavigation';
import TabletDesktopNavigation from '../navigation/TabletDesktopNavigation';
import MessagePanel from '../MessagePanel';
import AlphaLabel from '../alpha/AlphaLabel';

class AuthenticatedSubPageTemplate extends React.Component {
    render() {
        const { className, linkTo, header, customerId, children } = this.props;

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
            <>
                <div className={classes}>
                    <AlphaLabel />
                    <TabletOrDesktop>
                        <TabletDesktopNavigation customerId={customerId} />
                    </TabletOrDesktop>
                    <div className="page-container">
                        {renderHeader}
                        <div className="page-content">{children}</div>
                    </div>
                    <Mobile>
                        <MobileNavigation customerId={customerId} />
                    </Mobile>
                </div>
                <MessagePanel />
            </>
        );
    }
}

AuthenticatedSubPageTemplate.propTypes = {
    customerId: PropTypes.number.isRequired,
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

/* istanbul ignore next */
function mapStateToProps({ authentication }) {
    return {
        customerId: authentication.person && authentication.person.id,
    };
}

export default connect(mapStateToProps)(AuthenticatedSubPageTemplate);
