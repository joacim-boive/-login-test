import React from 'react';
import PropTypes from 'prop-types';
import { Logo } from '@ecster/ecster-components';

import MessagePanel from '../MessagePanel';

import './PublicPageTemplate.scss';

const PublicPageTemplate = props => {
    const { children } = props;

    return (
        <>
            <article className="common-public-page-template">
                <header className="logo-header">
                    <a href="https://www.ecster.se" rel="noopener" title="ecster.se">
                        <Logo withName width="150px" />
                    </a>
                </header>
                <div className="page-content">{children}</div>
            </article>
            <MessagePanel />
        </>
    );
};

PublicPageTemplate.propTypes = {
    children: PropTypes.node.isRequired,
};

export default PublicPageTemplate;
