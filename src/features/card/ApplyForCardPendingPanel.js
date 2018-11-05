import React from 'react';
// import PropTypes from 'prop-types';

import { getText as i18n } from '@ecster/ecster-i18n/lib/Translate';
import { Panel, Link } from '@ecster/ecster-components';
import almostHappyFace from '../../common/images/face-almost-happy.svg';
import './ApplyForCardMessagePanel.scss';

export default class ApplyForCardSuccessPanel extends React.Component {
    static propTypes = {
        // account: PropTypes.shape().isRequired,
    };

    static defaultProps = {};

    render() {
        return (
            <Panel withMixedContent centeredContent className="card-apply-for-card-message-panel">
                <div className="mixed-content">
                    <img src={almostHappyFace} aria-hidden="true" alt="almost happy face icon" />
                    <h1 className="h2">{i18n('card.apply-for-card.pending.header')}</h1>
                    <p>{i18n('card.apply-for-card.pending.info')}</p>
                    <Link iconLeft="icon-chevron-left" to="/account/overview">
                        {i18n('card.apply-for-card.pending.link')}
                    </Link>
                </div>
            </Panel>
        );
    }
}
