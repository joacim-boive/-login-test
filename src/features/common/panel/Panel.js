// TODO: move to ecster-components

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './Panel.scss';

const Panel = ({ children, className, ...rest }) => (
    <section
        {...rest}
        className={classNames({
            panel: true,
            [className]: true,
        })}
    >
        {children}
    </section>
);

export default Panel;

Panel.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
};

Panel.defaultProps = {
    className: '',
};
