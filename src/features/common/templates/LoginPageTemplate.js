import React from 'react';
import PropTypes from 'prop-types';
import Logo from '@ecster/ecster-components/Logo';
import cloudinary from '../../../common/images/Lazyload/cloudinary';

import MessagePanel from '../MessagePanel';

const LoginPage = props => {
    const { children } = props;

    return (
        <>
            <article
                className="home-login-page lazyload"
                data-bgset={`${cloudinary.defaults},o_40${cloudinary.scaling}/v1/backgrounds/login.jpg`}
                data-absurl="false"
                data-sizes="auto"
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
