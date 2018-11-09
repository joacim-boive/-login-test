import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Panel } from '@ecster/ecster-components';

import infoIcon from './images/icon-info-circle.svg';

import './AlertPanel.scss';

const AlertPanel = ({ header, body, icon, large, className }) => {
    const ctrClasses = classNames({
        'alert-ctr': true,
        large,
    });
    const HTag = large ? 'h3' : 'strong';
    return (
        <Panel withNoPadding stretchInMobile className={className}>
            <div className={ctrClasses}>
                <img src={icon} />
                <div>
                    <HTag>{header}</HTag>
                    <p>{body}</p>
                </div>
            </div>
        </Panel>
    );
};

AlertPanel.propTypes = {
    header: PropTypes.string.isRequired,
    body: PropTypes.node.isRequired,
    icon: PropTypes.node,
    className: PropTypes.string,
    large: PropTypes.bool,
};

AlertPanel.defaultProps = {
    className: '',
    icon: infoIcon,
    large: false,
};

export default AlertPanel;
