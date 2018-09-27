import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getText as i18n } from '@ecster/ecster-i18n/lib/Translate';

import classNames from 'classnames';

import './Footer.scss';

import { Logo, TabletOrDesktop } from '@ecster/ecster-components';

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
                <Logo withName width="140px" height="35px" />
                <div className="links ends">
                    <Link name="block-card" to="/customer/support">
                        {i18n('footer.block-card')}
                    </Link>
                    <Link name="contact" to="/customer/support">
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
