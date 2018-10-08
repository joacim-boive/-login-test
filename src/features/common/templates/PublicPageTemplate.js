import React from 'react';
import PropTypes from 'prop-types';
import { Logo } from '@ecster/ecster-components';

import MessagePanel from '../MessagePanel';

const PublicPageTemplate = props => {
    const { children } = props;

    return (
        <>
            <article className="common-public-page-template">
                <header className="logo-header">
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

PublicPageTemplate.propTypes = {
    children: PropTypes.node.isRequired,
};

export default PublicPageTemplate;
