import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './HtmlPanel.scss';

export const HtmlPanel = ({ className, html }) => {
    const classes = classNames({
        'html-panel': true,
        [className]: className,
    });

    const body = { __html: html };

    return html ? <div className={classes} dangerouslySetInnerHTML={body} /> : null;
};

HtmlPanel.propTypes = {
    className: PropTypes.string,
    html: PropTypes.string,
};

HtmlPanel.defaultProps = {
    className: '',
    html: '',
};
