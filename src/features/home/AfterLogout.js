import React from 'react';
import { Link } from 'react-router-dom';

// Ecster imports
import { getText as i18n } from '@ecster/ecster-i18n/lib/Translate';
import { Panel, ButtonGroup, LinkButton } from '@ecster/ecster-components';

import PublicPageTemplate from '../common/templates/PublicPageTemplate';
import { SURVEY_URL } from '../../common/surveyUrl';
import icon from '../../common/images/icon-rocket.svg';

export default class AfterLogout extends React.Component {
    render() {
        const footer = (
            <footer>
                <a href="https://www.ecster.se" rel="noopener noreferer" target="_blank">
                    www.ecster.se
                </a>
            </footer>
        );
        return (
            <PublicPageTemplate footer={footer} className="home-after-logout">
                <Panel withMixedContent centeredContent stretchInMobile>
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
                                gaLabel="after-logout-start-feedback"
                            >
                                {i18n('home.feedback.link')}
                            </LinkButton>
                        </ButtonGroup>
                        <ButtonGroup alignCenter spaceBelow={false}>
                            <Link to="/">
                                <strong>{i18n('home.after-logout.login-link')}</strong>
                            </Link>
                        </ButtonGroup>
                    </div>
                </Panel>
            </PublicPageTemplate>
        );
    }
}

AfterLogout.propTypes = {};
AfterLogout.defaultProps = {};
