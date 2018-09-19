import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { Mobile, TabletOrDesktop } from '@ecster/ecster-components';
import MessagePanel from '../MessagePanel';
import MobileNavigation from '../navigation/MobileNavigation';
import TabletDesktopNavigation from '../navigation/TabletDesktopNavigation';
import Footer from '../footer';

class AuthenticatedPageTemplate extends React.Component {
    render() {
        const { className, customerId, header, children } = this.props;

        const classes = classNames({
            'common-authenticated-page': true,
            [className]: className,
        });

        const thisHeader = header && (
            <div className="hero-header">
                <h1>{header}</h1>
            </div>
        );

        return (
            <>
                <div className={classes}>
                    <TabletOrDesktop>
                        <TabletDesktopNavigation customerId={customerId} />
                    </TabletOrDesktop>
                    <div className="page-container">
                        {thisHeader}
                        <div className="page-content">{children}</div>
                    </div>
                    <Mobile>
                        <MobileNavigation customerId={customerId} />
                    </Mobile>
                </div>
                <MessagePanel />
                <Footer />
            </>
        );
    }
}

AuthenticatedPageTemplate.propTypes = {
    customerId: PropTypes.number.isRequired,
    className: PropTypes.string,
    header: PropTypes.string,
    children: PropTypes.node.isRequired,
};

AuthenticatedPageTemplate.defaultProps = {
    className: '',
    header: undefined,
};

/* istanbul ignore next */
function mapStateToProps({ authentication }) {
    return {
        customerId: authentication.person && authentication.person.id,
    };
}

export default connect(mapStateToProps)(AuthenticatedPageTemplate);
