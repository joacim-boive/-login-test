import React from 'react';
import {
    Mobile,
    MobileNavigation,
    MobileMenuItem,
    MobileSubNavigation,
    MobileSubNavigationItem,
} from '@ecster/ecster-components';
import { Translate } from '@ecster/ecster-i18n';

import iconOverview from '../../../common/images/icon-overview.svg';
import iconInvoices from '../../../common/images/icon-invoices.svg';
import iconLoan from '../../../common/images/icon-loan.svg';
import iconHamburger from '../../../common/images/icon-hamburger.svg';

const i18n = Translate.getText;

export default class AuthenticatedPageTemplate extends React.Component {
    static propTypes = {};

    state = {
        showMoreMenu: false,
    };

    showMoreMenu = () => {
        console.log('showMoreMenu');
        this.setState({ showMoreMenu: true });
    };

    closeMoreMenu = () => {
        console.log('closeMoreMenu');
        this.setState({ showMoreMenu: false });
    };

    render() {
        return (
            <div className="common-authenticated-page">
                <Mobile>
                    <MobileNavigation>
                        <MobileMenuItem linkTo="/account/overview" icon={iconOverview}>
                            {i18n('navigation.account-overview')}
                        </MobileMenuItem>

                        <MobileMenuItem linkTo="/invoice" icon={iconInvoices}>
                            {i18n('navigation.invoices')}
                        </MobileMenuItem>

                        <MobileMenuItem linkTo="/loan" icon={iconLoan}>
                            {i18n('navigation.loan')}
                        </MobileMenuItem>

                        <MobileMenuItem onClick={this.showMoreMenu} icon={iconHamburger}>
                            {i18n('navigation.more')}
                        </MobileMenuItem>
                    </MobileNavigation>

                    <MobileSubNavigation show={this.state.showMoreMenu} requestClose={this.closeMoreMenu}>
                        <MobileSubNavigationItem>{i18n('navigation.customer-service')}</MobileSubNavigationItem>
                        <MobileSubNavigationItem>{i18n('navigation.settings')}</MobileSubNavigationItem>
                        <MobileSubNavigationItem>{i18n('navigation.logout')}</MobileSubNavigationItem>
                    </MobileSubNavigation>
                </Mobile>
            </div>
        );
    }
}
