import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './ArrowLink.scss';
import { ButtonPanel } from './../button_panel/ButtonPanel';

export const ArrowLink = ({ className, icon, text, onClick, ...rest }) => {
    const classes = classNames({
        'arrow-link': true,
        [className]: className,
    });

    return (
        <ButtonPanel {...rest} className={classes} onClick={onClick}>
            {icon ? <i className={icon} /> : null}
            <div className="arrow-link__wrapper">
                <label>{text}</label>
                <i className="icon-chevron-right" />
            </div>
        </ButtonPanel>
    );
};

ArrowLink.propTypes = {
    className: PropTypes.string,
    icon: PropTypes.string,
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func,
};

ArrowLink.defaultProps = {
    className: '',
    icon: '',
    onClick: () => {console.log('Clicked ArrorLink');},
};
