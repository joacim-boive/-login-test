import React from 'react';
import PropTypes from 'prop-types';
// Ecster imports
import { getText as i18n } from '@ecster/ecster-i18n/lib/Translate';
import { Button } from '@ecster/ecster-components';

export default class ApplyForCardFailurePanel extends React.Component {
    render() {
        return (
            <div className="card-apply-for-card-failure-panel">
              Component content: card/ApplyForCardFailurePanel
            </div>
        );
    }
}

ApplyForCardFailurePanel.propTypes = {};
ApplyForCardFailurePanel.defaultProps = {};