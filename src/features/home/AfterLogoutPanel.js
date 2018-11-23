import React from 'react';
import PropTypes from 'prop-types';

// Ecster imports
import { getText as i18n } from '@ecster/ecster-i18n/lib/Translate';
import { Panel, ButtonGroup, LinkButton, Button } from '@ecster/ecster-components';

import { SURVEY_URL } from '../../common/surveyUrl';
import icon from '../../common/images/icon-rocket.svg';

export default class AfterLogoutPanel extends React.Component {
    static propTypes = {
        loginAgain: PropTypes.func.isRequired,
    };

    static defaultProps = {};

    render() {
        const { loginAgain } = this.props;

        return (
            <Panel withMixedContent centeredContent sideMarginsInMobile className="after-logout-info">
                <div className="mixed-content">
                    <img src={icon} className="mb-4x" />
                    <h2>{i18n('home.after-logout.header')}</h2>
                    <p className="info-text">{i18n('home.after-logout.info')}</p>
                    <ButtonGroup alignCenter>
                        <LinkButton
                            iconRight="icon-external-link"
                            href={SURVEY_URL}
                            target="_blank"
                            outline
                            round
                            id="after-logout-start-feedback"
                        >
                            {i18n('home.feedback.link')}
                        </LinkButton>
                    </ButtonGroup>
                    <ButtonGroup alignCenter spaceBelow={false}>
                        <Button transparent onClick={loginAgain}>
                            <strong>{i18n('home.after-logout.login-link')}</strong>
                        </Button>
                    </ButtonGroup>
                </div>
            </Panel>
        );
    }
}
