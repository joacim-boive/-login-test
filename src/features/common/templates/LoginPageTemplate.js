import React from 'react';
import PropTypes from 'prop-types';

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
                    <svg
                        role="img"
                        aria-label="[title+description]"
                        id="logo__ecster"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 1875 500"
                    >
                        <title>Ecster.se huvudsite</title>
                        <description>
                            Ecster samarbetar med tusentals säljföretag över hela Sverige och erbjuder betallösningar
                            för både e-handel och fysisk butik. Vi finns lokalt representerade i hela landet och har
                            vårt huvudkontor i Stockholm.
                        </description>
                        <path fill="none" d="M0 0h1870.8v500H0z" />
                        <path d="M622.3 226.3c10.3-24 28.4-37.6 50.2-37.6 15.5 0 34.3 4.8 34.3 28 0 3.3-.4 6.3-.7 9.6h-83.8zm49.4-91.5c-67.5 0-120.3 59-120.3 134.3 0 63.1 52.8 96.3 105.2 96.3 31.7 0 51.3-4.1 74.5-15.1l2.2-1.1 12.9-61.6-9.6 5.2a142.5 142.5 0 0 1-68.3 18.5c-32.5 0-53.5-14.8-54.6-38h144.7l1.1-3.7c5.2-17 8.1-32.8 8.1-47.6.8-53.6-36.5-87.2-95.9-87.2m246.6 0c-72.7 0-131.7 57.9-131.7 128.8 0 59.8 45.8 101.9 111.5 101.9a135 135 0 0 0 77.5-21.8l2.2-1.5.7-59.4-8.1 5.5a124 124 0 0 1-69 22.9c-30.3 0-50.9-20.7-50.9-51.3 0-52 39.9-70.9 66.4-70.9 7 0 13.3 1.1 18.1 3a35.8 35.8 0 0 0 30.6 54.3c21.8 0 37.6-18.5 37.6-43.5-.4-38.1-37.3-68-84.9-68m205.5 0c-63.8 0-93 37.3-93 72 0 42.4 39.9 58.3 60.9 66.8l8.1 3.3c18.8 7.7 35.1 14.8 35.1 25.5 0 11.1-18.1 14.8-33.2 14.8a84.7 84.7 0 0 1-33.2-5.9l-3.3-1.8a32 32 0 0 0-30.2-41.7c-18.8 0-32.8 14.8-32.8 35.1 0 11.8 5.5 23.6 15.5 33.6 18.1 18.1 48.3 28 83.4 28 60.5 0 97.1-27.3 97.1-72.7 0-35.1-28.8-52.8-59.8-66.4l-7.4-3c-18.8-8.1-36.9-15.9-36.9-26.2 0-10.7 16.2-14.4 30.3-14.4a71 71 0 0 1 22.1 3.7c.7.4 1.5.4 1.8.7a24.9 24.9 0 0 0-1.5 8.9 32.7 32.7 0 0 0 32.1 32.1c18.8 0 32.8-14.8 32.8-34.7 0-11.8-5.2-23.6-14-32.8-15.6-15-43.3-24.9-73.9-24.9m211.8 58.7h64.6l13.7-55h-64.6L1367 68l-71.2 25.8-11.4 45h-39.9l-12.5 54.6h39.1l-21.4 86c-3 12.2-4.4 21.4-4.4 29.9 0 34.7 21.8 56.1 57.2 56.1 29.2 0 55.4-11.4 80.1-35.1l3.3-3-22.9-31.7-4.1 2.6c-20.7 13.7-28 16.2-38 16.2-2.6 0-10.3 0-10.3-14.4 0-3.3 1.1-10.3 3.3-18.1l21.7-88.4zm140.3 32.8c10.3-24 28.4-37.6 50.6-37.6 15.5 0 34.3 4.8 34.3 28 0 3.3-.4 6.3-.7 9.6h-84.2zm49.4-91.5c-67.5 0-120.3 59-120.3 134.3 0 63.1 52.8 96.3 105.2 96.3 31.7 0 51.3-4.1 74.5-15.1l2.2-1.1 12.9-61.6-9.6 5.2a142.5 142.5 0 0 1-68.3 18.5c-32.5 0-53.5-14.8-54.6-38H1612l1.1-3.7c5.2-17 8.1-32.8 8.1-47.6.4-53.6-36.5-87.2-95.9-87.2m284.9 0c-22.1 0-43.5 14.8-64.2 43.5l8.5-39.5h-93.4l-14 54.6h39.1l-42.4 168.3h65l25.1-100.4c9.2-37.6 29.5-62.4 43.2-70.1a38.7 38.7 0 0 0 73.8-16.2 40.7 40.7 0 0 0-40.7-40.2M259.5 265c11.8 0 22.9-1.8 33.6-5.5 8.5-3 15.9-6.6 22.5-11.4-6.6-4.8-14-8.5-22.5-11.4a101.6 101.6 0 0 0-33.6-5.5c-11.8 0-22.9 1.8-33.6 5.5-8.1 3-15.9 6.6-22.5 11.4 6.6 4.8 14 8.5 22.5 11.4 10.4 3.7 21.8 5.5 33.6 5.5z" />
                        <path d="M248.4 20a228.3 228.3 0 1 0-.1 456.7 228.3 228.3 0 0 0 .1-456.7zm-65.7 295.2c3.7 7.4 9.6 14 16.6 19.6 7.7 5.9 16.6 10.7 26.6 14.4 10.7 3.7 21.8 5.5 33.6 5.5s22.9-1.8 33.6-5.5c10-3.3 18.8-8.1 26.6-14.4a22.2 22.2 0 0 1 31 3.3 22.2 22.2 0 0 1-3.3 31 135 135 0 0 1-39.9 21.8 147 147 0 0 1-47.6 7.7 148 148 0 0 1-47.6-7.7 127.6 127.6 0 0 1-39.9-21.8c-11.8-9.6-21.4-21-28-33.6-7-13.7-10.7-28-10.7-42.8s3.7-29.5 10.7-42.8l1.1-1.8-1.1-1.8c-7-13.7-10.7-28-10.7-42.8s3.7-29.5 10.7-42.8a110 110 0 0 1 28-33.6 135 135 0 0 1 39.9-21.8 147 147 0 0 1 47.6-7.7 148 148 0 0 1 47.6 7.7 127.6 127.6 0 0 1 39.9 21.8 21.8 21.8 0 0 1 3.3 31 21.8 21.8 0 0 1-31 3.3 101.2 101.2 0 0 0-26.6-14.4 101.6 101.6 0 0 0-33.6-5.5c-11.8 0-22.9 1.8-33.6 5.5a83.4 83.4 0 0 0-26.6 14.4 61.7 61.7 0 0 0-16.6 19.6c-3.7 7-5.5 14.4-5.5 22.1 0 3 .4 5.9.7 8.5 10-7 21.4-12.9 34-17a147 147 0 0 1 47.6-7.7 148 148 0 0 1 47.6 7.7 127.6 127.6 0 0 1 39.9 21.8l2.2 1.8a38.4 38.4 0 0 1-5.9 64.3c-10.7 7.7-22.9 14-36.2 18.8a147 147 0 0 1-47.6 7.7 142.3 142.3 0 0 1-81.6-24.7c-.4 3-.7 5.5-.7 8.5-.4 8 1.5 15.4 5.5 22.4z" />
                    </svg>
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
