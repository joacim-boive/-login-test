import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link } from '@ecster/ecster-components';
import './ArrowLink.scss';

export const ArrowLink = ({ icon, text, onClick, to, badge }) => {
    const classes = classNames({
        'arrow-link': true,
        'no-underline': true,
    });

    //    const theBadge = badge ? <div className="badge">{badge}</div> : undefined;

    return (
        <Link to={to} onClick={onClick} className={classes} underline={false}>
            {icon ? <i className={icon} /> : null}
            <div className="arrow-link__wrapper">
                <div>{text}</div>
                {badge ? <div className="badge">{badge}</div> : ''}
                <i className="icon-chevron-right" />
            </div>
        </Link>
    );
};

ArrowLink.propTypes = {
    className: PropTypes.string,
    icon: PropTypes.string,
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    to: PropTypes.string,
};

ArrowLink.defaultProps = {
    className: '',
    icon: '',
    onClick: () => {},
    to: '',
};
