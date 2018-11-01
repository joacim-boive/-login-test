import React from 'react';
import PropTypes from 'prop-types';
// Ecster imports
import { getText as i18n } from '@ecster/ecster-i18n/lib/Translate';
import { Button } from '@ecster/ecster-components';

export default class ShowExtraCardsPanel extends React.Component {
    render() {
        return (
            <div className="card-show-extra-cards-panel">
              Component content: card/ShowExtraCardsPanel
            </div>
        );
    }
}

ShowExtraCardsPanel.propTypes = {};
ShowExtraCardsPanel.defaultProps = {};