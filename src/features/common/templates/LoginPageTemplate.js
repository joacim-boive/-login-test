import React from 'react';
import PropTypes from 'prop-types';
import Logo from '@ecster/ecster-components/Logo';
import cloudinary from '../../../common/images/Lazyload/cloudinary';

import MessagePanel from '../MessagePanel';

/**
 *
 * @param props
 * @returns {*}
 * @constructor
 */
const LoginPage = props => {
    const { children } = props;

    /*
    Temporary fix for getting the correct background image size request.
    data-widths isn't respected for some reason in this context.
    Works for the IMG-tag.
     */
    window.lazySizesConfig.rias.widths = [768, 1536, 1024, 2048, 1920, 3840];
    return (
        <>
            <article
                className="home-login-page lazyload"
                data-bgset={`${cloudinary.defaults},o_40${cloudinary.scaling}/v1/backgrounds/login.jpg`}
                data-absurl="false"
                data-sizes="auto"
                data-widths="768, 1536, 1024, 2048, 1920, 3840"
            >
                <header className="home-login-page__logo">
                    <a href="https://www.ecster.se" rel="noopener" className="login__link--logo" title="ecster.se">
                        <Logo withName isNoWrap />
                    </a>
                </header>
                {children}
            </article>
            <MessagePanel />
        </>
    );
};

LoginPage.propTypes = {
    children: PropTypes.node.isRequired,
};

export default LoginPage;
