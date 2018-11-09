/* eslint-disable react/no-danger */
import React from 'react';
import PropTypes from 'prop-types';

import { getText as i18n } from '@ecster/ecster-i18n/lib/Translate';
import { Panel } from '@ecster/ecster-components';

export default class BlockCardPanel extends React.Component {
    static propTypes = {};

    static defaultProps = {};

    state = {};

    render() {
        return (
            <Panel withMixedContent yellowBG className="card-block-card-panel">
                <div className="mixed-content">
                    <h1 className="h2">{i18n('card.block-card.header')}</h1>
                    <p>
                        <span dangerouslySetInnerHTML={{ __html: i18n('card.block-card.info') }} />
                    </p>
                </div>
            </Panel>
        );
    }
}
