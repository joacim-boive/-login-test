import React from 'react';
import PropTypes from 'prop-types';
import { Logo, Link } from '@ecster/ecster-components';
import VideoCover from 'react-video-cover';

import detectDevice from '@ecster/ecster-components/util/detect-device';

import cloudinary from '../../../common/images/Lazyload/cloudinary';

import MessagePanel from '../MessagePanel';

const Wrapper = ({ children }) => {
    const videoOptions = {
        src: 'https://res.cloudinary.com/ecster/video/upload/v1/backgrounds/kustlinje.mp4',
        remeasureOnWindowResize: true,
        autoPlay: true,
        muted: true,
        loop: true,
    };

    return detectDevice().isDesktop ? (
        <article className="common-login-page-template is-desktop">
            <VideoCover videoOptions={videoOptions} />
            {children}
        </article>
    ) : (
        <article
            className="common-login-page-template lazyload"
            data-bgset={`${cloudinary.defaults},o_40${cloudinary.scaling}/v1/backgrounds/login.jpg`}
            data-absurl="false"
            data-sizes="auto"
            data-widths="768, 1536, 1024, 2048, 1920, 3840"
        >
            {children}
        </article>
    );
};

Wrapper.propTypes = {
    children: PropTypes.node.isRequired,
};

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
            <Wrapper>
                <header className="logo-header">
                    <Link href="https://www.ecster.se" target="_blank" title="ecster.se" id="login-page-logo-link">
                        <Logo withName isNoWrap />
                    </Link>
                </header>
                {children}
            </Wrapper>

            <MessagePanel />
        </>
    );
};

LoginPageTemplate.propTypes = {
    children: PropTypes.node.isRequired,
};

export default LoginPageTemplate;
