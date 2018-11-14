import React, { Component } from 'react';
import {
    Panel,
    ButtonGroup,
    LinkButton,
    UnorderedList,
    FlexPanel,
    Mobile,
    TabletOrDesktop,
} from '@ecster/ecster-components';
import { getText as i18n } from '@ecster/ecster-i18n/lib/Translate';
import Lazyload from '../../../common/images/Lazyload';

import './NoAccountPanel.scss';

export default class NoAccountsPanel extends Component {
    static propTypes = {};

    render() {
        return (
            <div className="account-no-account">
                <Panel withFullWidthContent>
                    <Mobile>
                        <Lazyload
                            className="lazyload"
                            aria-hidden="true"
                            alt=""
                            src="/v1/imgs/girl-in-town.jpg"
                            customTransform="/c_crop,g_face,t_base,w_1900,h_1400/w_{width}"
                            widths={[323, 646]}
                        />
                    </Mobile>
                    <TabletOrDesktop>
                        <Lazyload
                            className="lazyload"
                            aria-hidden="true"
                            alt=""
                            src="/v1/imgs/girl-in-town.jpg"
                            customTransform="/c_crop,g_face,t_base,w_3350,h_1200/w_{width}"
                            widths={[898, 1796]}
                        />
                    </TabletOrDesktop>

                    <div className="two-col-content">
                        <h2 className="h1 e-green centered-content extra-margin">
                            {i18n('account.no-account.panel1.header')}
                        </h2>
                        <FlexPanel separator={false} reverseMobile>
                            <div>
                                <p>{i18n('account.no-account.panel1.text')}</p>
                                <UnorderedList icon="icon-check" iconClass="e-purple">
                                    {i18n('account.no-account.panel1.bullets', {
                                        returnObjects: true,
                                        wrapper: { tag: 'span', dangerouslySetInnerHTML: true },
                                    })}
                                </UnorderedList>
                            </div>
                            <div className="ctr-2">
                                <div className="info-bubble">Ingen årsavgift</div>
                                <div className="ecster-card">
                                    <Lazyload
                                        className="lazyload"
                                        aria-hidden="true"
                                        alt=""
                                        src="/v1/cards/130.png"
                                        widths={[166, 312]}
                                    />
                                </div>
                            </div>
                        </FlexPanel>
                    </div>
                    <ButtonGroup align="center">
                        <LinkButton
                            id="apply-for-card-link"
                            href="https://www.ecster.se/ecster-kortet"
                            target="_blank"
                            round
                            outline
                            gaLabel="no-account-ecster-card"
                        >
                            {i18n('account.no-account.panel1.button-text')}
                        </LinkButton>
                    </ButtonGroup>
                </Panel>
                <Panel withFullWidthContent>
                    <Mobile>
                        <Lazyload
                            className="lazyload"
                            aria-hidden="true"
                            alt=""
                            src="/v1/imgs/guitar.jpg"
                            customTransform="/t_base,w_1400,h_1000,c_crop,g_auto/w_{width}"
                            widths={[323, 646]}
                        />
                    </Mobile>
                    <TabletOrDesktop>
                        <Lazyload
                            className="lazyload"
                            aria-hidden="true"
                            alt=""
                            src="/v1/imgs/guitar.jpg"
                            widths={[898, 1796]}
                        />
                    </TabletOrDesktop>
                    <div className="mixed-content">
                        <h2 className="h1 e-green centered-content">{i18n('account.no-account.panel2.header')}</h2>
                        <p>{i18n('account.no-account.panel2.text')}</p>
                    </div>
                    <ButtonGroup align="center">
                        <LinkButton
                            id="goto-loan-link"
                            to="/loan/overview"
                            round
                            outline
                            gaLabel="no-account-loan-overview"
                        >
                            {i18n('account.no-account.panel2.button-text')}
                        </LinkButton>
                    </ButtonGroup>
                </Panel>
            </div>
        );
    }
}
