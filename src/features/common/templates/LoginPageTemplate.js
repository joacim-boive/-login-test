import React from 'react';
import PropTypes from 'prop-types';
import Logo from '@ecster/ecster-components/Logo';

// eslint-disable-next-line no-unused-vars
import respimg from 'lazysizes/plugins/respimg/ls.respimg.min';
// eslint-disable-next-line no-unused-vars
import bgset from 'lazysizes/plugins/bgset/ls.bgset.min'; // Used for backgrounds.
// eslint-disable-next-line no-unused-vars
import rias from 'lazysizes/plugins/rias/ls.rias.min'; // required to calculate the width and send to CDN
// eslint-disable-next-line no-unused-vars
import lazySizes from 'lazysizes';

const LoginPage = props => {
    const { children } = props;

    return (
        <article
            className="home-login-page lazyload"
            data-bgset="//res.cloudinary.com/ecster/f_auto,o_40,q_auto:good,dpr_auto,{scaling}/v1/login.jpg"
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
    );
};

LoginPage.propTypes = {
    children: PropTypes.node.isRequired,
};

export default LoginPage;
