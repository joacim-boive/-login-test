import React from 'react';
import PropTypes from 'prop-types';

export const Value = ({ label, value, strong }) => (
    <p className="flex-row card-info">
        <span>{label}</span>
        {strong ? <strong>{value}</strong> : <span>{value}</span>}
    </p>
);

Value.propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    strong: PropTypes.bool,
};

Value.defaultProps = {
    strong: true,
};
