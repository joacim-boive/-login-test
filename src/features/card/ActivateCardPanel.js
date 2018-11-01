import React from 'react';
import PropTypes from 'prop-types';
// Ecster imports
import { getText as i18n } from '@ecster/ecster-i18n/lib/Translate';
import { Button } from '@ecster/ecster-components';

export default class ActivateCardPanel extends React.Component {
    render() {
        return (
            <div className="card-activate-card-panel">
              Component content: card/ActivateCardPanel
            </div>
        );
    }
}

ActivateCardPanel.propTypes = {};
ActivateCardPanel.defaultProps = {};