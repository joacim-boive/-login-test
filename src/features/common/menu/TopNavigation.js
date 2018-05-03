import React from 'react';
import PropTypes from 'prop-types';

import './TopNavigation.scss';

export const TopNavigation = ({ children }) => <div className="top-navigation">{children}</div>;

TopNavigation.propTypes = {
    children: PropTypes.node.isRequired,
};
