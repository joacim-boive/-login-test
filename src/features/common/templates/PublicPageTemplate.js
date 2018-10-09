import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Logo } from '@ecster/ecster-components';

import MessagePanel from '../MessagePanel';

import './PublicPageTemplate.scss';

const PublicPageTemplate = props => {
    const { className, children, footer } = props;
    const classes = classNames({
        'common-public-page-template': true,
        [className]: className,
    });
    return (
        <>
            <div className={classes}>
                <header className="logo-header">
                    <a href="https://www.ecster.se" rel="noopener" title="ecster.se">
                        <Logo withName width="150px" />
                    </a>
                </header>
                <div className="page-content">{children}</div>
                {footer}
            </div>
            <MessagePanel />
        </>
    );
};

PublicPageTemplate.propTypes = {
    className: PropTypes.string,
    children: PropTypes.node.isRequired,
    footer: PropTypes.node,
};

PublicPageTemplate.defaultProps = {
    className: '',
    footer: undefined,
};

export default PublicPageTemplate;
