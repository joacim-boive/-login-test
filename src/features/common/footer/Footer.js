import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { getText as i18n } from '@ecster/ecster-i18n/lib/Translate';
import { Logo, TabletOrDesktop, Link } from '@ecster/ecster-components';

import './Footer.scss';

export const Footer = ({ className, ...rest }) => {
    const classes = classNames({
        [className]: className,
    });

    return (
        <TabletOrDesktop>
            <footer className={classes} {...rest}>
                <div className="copyright ends">
                    &copy; {i18n('footer.copyright')}
                    {new Date().getFullYear()}
                </div>
                <Logo id="footer-logo" withName width="140px" height="35px" />
                <div className="links ends">
                    <Link id="block-card-link" to="/customer/support">
                        {i18n('footer.block-card')}
                    </Link>
                    <Link id="customer-support-link" to="/customer/support">
                        {i18n('footer.contact')}
                    </Link>
                </div>
            </footer>
        </TabletOrDesktop>
    );
};

Footer.propTypes = {
    className: PropTypes.string,
};

Footer.defaultProps = {
    className: '',
};

export default Footer;
