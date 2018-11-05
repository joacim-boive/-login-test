import React from 'react';
import PropTypes from 'prop-types';
import { Logo, Link } from '@ecster/ecster-components';
import cloudinary from '../../../common/images/Lazyload/cloudinary';

import MessagePanel from '../MessagePanel';

const LoginPageTemplate = props => {
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
                className="common-login-page-template lazyload"
                data-bgset={`${cloudinary.defaults},o_40${cloudinary.scaling}/v1/backgrounds/login.jpg`}
                data-absurl="false"
                data-sizes="auto"
                data-widths="768, 1536, 1024, 2048, 1920, 3840"
            >
                <header className="logo-header">
                    <Link href="https://www.ecster.se" target="_blank" title="ecster.se" id="login-page-logo-link">
                        <Logo withName isNoWrap />
                    </Link>
                </header>
                {children}
            </article>
            <MessagePanel />
        </>
    );
};

LoginPageTemplate.propTypes = {
    children: PropTypes.node.isRequired,
};

export default LoginPageTemplate;
