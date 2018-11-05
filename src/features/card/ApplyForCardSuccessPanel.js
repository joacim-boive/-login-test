import React from 'react';
// import PropTypes from 'prop-types';

import { getText as i18n } from '@ecster/ecster-i18n/lib/Translate';
import { Panel, Link } from '@ecster/ecster-components';
import happyFace from '../../common/images/face-happy.svg';

export default class ApplyForCardSuccessPanel extends React.Component {
    static propTypes = {
        // account: PropTypes.shape().isRequired,
    };

    static defaultProps = {};

    render() {
        return (
            <Panel withMixedContent centeredContent className="card-apply-for-card-success-panel">
                <div className="mixed-content">
                    <img src={happyFace} aria-hidden="true" alt="happy face icon" />
                    <h1 className="h2">{i18n('card.apply-for-card.success.header')}</h1>
                    <p>{i18n('card.apply-for-card.success.info')}</p>
                    <Link iconLeft="icon-chevron-left" to="/account/overview">
                        {i18n('card.apply-for-card.success.link')}
                    </Link>
                </div>
            </Panel>
        );
    }
}
