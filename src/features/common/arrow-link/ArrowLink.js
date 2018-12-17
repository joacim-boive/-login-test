import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link } from '@ecster/ecster-components';
import './ArrowLink.scss';

export const ArrowLink = ({ icon, text, onClick, to, badge, id }) => {
    const classes = classNames({
        'arrow-link': true,
        'no-underline': true,
    });

    return (
        <Link to={to} onClick={onClick} className={classes} underline={false} id={id}>
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
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
    icon: PropTypes.string,
    onClick: PropTypes.func,
    badge: PropTypes.string,
};

ArrowLink.defaultProps = {
    icon: undefined,
    onClick: () => {},
    badge: undefined,
};
