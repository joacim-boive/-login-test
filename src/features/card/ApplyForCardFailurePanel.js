import React from 'react';
// import PropTypes from 'prop-types';

import { getText as i18n } from '@ecster/ecster-i18n/lib/Translate';
import { Panel, Link } from '@ecster/ecster-components';
import disappointedFace from '../../common/images/face-disappointed.svg';

export default class ApplyForCardFailurePanel extends React.Component {
    static propTypes = {};

    static defaultProps = {};

    render() {
        return (
            <Panel withMixedContent centeredContent className="card-apply-for-card-failure-panel">
                <div className="mixed-content">
                    <img src={disappointedFace} aria-hidden="true" alt="sad face icon" />
                    <h1 className="h2">{i18n('card.apply-for-card.failure.header')}</h1>
                    <p dangerouslySetInnerHTML={{__html: i18n('card.apply-for-card.failure.info')}} />
                    <Link iconLeft="icon-chevron-left" to="/account/overview">{i18n('card.apply-for-card.failure.link')}</Link>
                </div>
            </Panel>
        );
    }
}
