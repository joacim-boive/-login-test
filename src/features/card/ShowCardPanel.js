import React from 'react';
import PropTypes from 'prop-types';
// Ecster imports
import { getText as i18n } from '@ecster/ecster-i18n/lib/Translate';
import { Button } from '@ecster/ecster-components';

export default class ShowCardPanel extends React.Component {
    render() {
        return (
            <div className="card-show-card-panel">
              Component content: card/ShowCardPanel
            </div>
        );
    }
}

ShowCardPanel.propTypes = {};
ShowCardPanel.defaultProps = {};