import React from 'react';
import PropTypes from 'prop-types';

export const TopMenu = ({ children }) => <div className="top-menu">{children}</div>;

TopMenu.propTypes = {
    children: PropTypes.node.isRequired,
};
