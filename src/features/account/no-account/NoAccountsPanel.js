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

import tmpImage from '../../../common/images/girl+traffic.jpg';

import './NoAccountPanel.scss';

export default class NoAccountsPanel extends Component {
    static propTypes = {};

    render() {
        return (
            <div className="account-no-account">
                <Panel withFullWidthContent>
                    <Mobile>
                        <img
                            src="https://res.cloudinary.com/johanlinderoth/image/upload/c_scale,w_768/v1540300071/girl-in-traffic-cropped.jpg"
                            alt=""
                        />
                    </Mobile>
                    <TabletOrDesktop>
                        <img
                            src="https://res.cloudinary.com/johanlinderoth/image/upload/c_scale,w_960/v1540300076/girl-in-traffic-wide.jpg"
                            alt=""
                        />
                    </TabletOrDesktop>

                    <div className="two-col-content">
                        <h2 className="h1 e-green centered-content">{i18n('account.no-account.panel1.header')}</h2>
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
                                        alt="Ecster Pay Card"
                                        src="/v1/cards/130.png"
                                        widths={[166, 312]}
                                    />
                                </div>
                            </div>
                        </FlexPanel>
                    </div>
                    <ButtonGroup align="center">
                        <LinkButton href="https://www.ecster.se/ecster-kortet" target="_blank" round outline>
                            {i18n('account.no-account.panel1.button-text')}
                        </LinkButton>
                    </ButtonGroup>
                </Panel>
                <Panel withFullWidthContent>
                    <Mobile>
                        <img
                            src="https://res.cloudinary.com/johanlinderoth/image/upload/c_scale,w_768/v1540301508/guitar-guy-cropped.jpg"
                            alt=""
                        />
                    </Mobile>
                    <TabletOrDesktop>
                        <img
                            src="https://res.cloudinary.com/johanlinderoth/image/upload/c_scale,w_960/v1540300080/guitar-guy.jpg"
                            alt=""
                        />
                    </TabletOrDesktop>
                    <div className="mixed-content">
                        <h2 className="h1 e-green centered-content">{i18n('account.no-account.panel2.header')}</h2>
                        <p>{i18n('account.no-account.panel2.text')}</p>
                    </div>
                    <ButtonGroup align="center">
                        <LinkButton href="https://www.ecster.se/ecster-kortet" target="_blank" round outline>
                            {i18n('account.no-account.panel2.button-text')}
                        </LinkButton>
                    </ButtonGroup>
                </Panel>
            </div>
        );
    }
}
