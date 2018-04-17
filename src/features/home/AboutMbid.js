import React, { Component } from 'react';
import { Translate } from '@ecster/ecster-i18n';
import InfoPageTemplate from '../common/templates/InfoPageTemplate';

const i18n = Translate.getText;

export default class AboutMbid extends Component {
    static propTypes = {};

    render() {
        return (
            <InfoPageTemplate>
                <div className="home-about-mbid">
                    <h2>{i18n('home.login.about-mbid')}</h2>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In posuere sodales libero nec pharetra.
                        Praesent luctus ex tortor, id viverra erat tempor vel. Proin sit amet volutpat lectus.
                    </p>
                    <p>
                        Maecenas eu condimentum dolor, et vehicula augue. Donec et dui nec lacus tempus venenatis ut
                        vitae sapien. Vestibulum iaculis odio quis pellentesque eleifend. In iaculis urna nec massa
                        pharetra, vitae hendrerit velit consequat.
                    </p>
                    <p>
                        Vivamus bibendum tempor magna. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices
                        posuere cubilia Curae;
                    </p>
                    <a href="#/start">
                        <i className="icon-chevron-left e-green" /> {i18n('general.back')}
                    </a>
                </div>
            </InfoPageTemplate>
        );
    }
}
