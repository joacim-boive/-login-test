import React from 'react';
import PropTypes from 'prop-types';
import { getText as i18n } from '@ecster/ecster-i18n/lib/Translate';
import { ButtonGroup, LinkButton, Panel } from '@ecster/ecster-components';

import './TerminateAccountIntro.scss';

class TerminateAccountIntro extends React.Component {
    render() {
        const url = `/account/${this.props.accountRef}/customer/${this.props.customerId}/terminate`;
        return (
            <div className="account-terminate-intro">
                <h1>{i18n('account.terminate.terminate-account')}</h1>
                <Panel key="account-terminate-panel" className="account-terminate-panel" sideBordersMobile>
                    {i18n('account.terminate.intro.info-text', {
                        returnObjects: true,
                        wrapper: { tag: 'p', dangerouslySetInnerHTML: true },
                    })}
                    <ButtonGroup>
                        <LinkButton outline round to={url}>
                            {i18n('account.terminate.terminate-account')}
                        </LinkButton>
                    </ButtonGroup>
                </Panel>
            </div>
        );
    }
}

TerminateAccountIntro.propTypes = {
    accountRef: PropTypes.string.isRequired,
    customerId: PropTypes.string.isRequired,
};

export default TerminateAccountIntro;
