import React from 'react';
import PropTypes from 'prop-types';
import { Panel } from '@ecster/ecster-components';

import infoIcon from './images/icon-info-circle.svg';

import './AlertPanel.scss';

const AlertPanel = ({ header, body, className }) => {
    return (
        <Panel withNoPadding stretchInMobile className={className}>
            <div className="alert-ctr">
                <img src={infoIcon} />
                <div>
                    <strong>{header}</strong>
                    <p>{body}</p>
                </div>
            </div>
        </Panel>
    );
};

AlertPanel.propTypes = {
    header: PropTypes.string.isRequired,
    body: PropTypes.node.isRequired,
    className: PropTypes.string,
};

AlertPanel.defaultProps = {
    className: '',
};

export default AlertPanel;
