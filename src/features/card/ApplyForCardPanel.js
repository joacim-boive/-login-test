import React from 'react';
import PropTypes from 'prop-types';

import { getText as i18n } from '@ecster/ecster-i18n/lib/Translate';
import { Panel, FlexPanel, UnorderedList } from '@ecster/ecster-components';

export default class ApplyForCardPanel extends React.Component {
    render() {
        return (
            <div className="card-apply-for-card-panel">
                <Panel withMixedContent>
                    <h1 className="h2">Ansök om ett Ecster-kort</h1>
                    <FlexPanel>
                        <div className="column-1" />
                        <div className="column-2">
                            <UnorderedList icon="icon-check" iconClass="e-purple">
                                {i18n('card.apply-for-card.info-list', {
                                    returnObjects: true,
                                    wrapper: { tag: 'span', dangerouslySetInnerHTML: true },
                                })}
                            </UnorderedList>
                        </div>
                    </FlexPanel>
                </Panel>
            </div>
        );
    }
}

ApplyForCardPanel.propTypes = {
    account: PropTypes.shape().isRequired,
};
ApplyForCardPanel.defaultProps = {};
