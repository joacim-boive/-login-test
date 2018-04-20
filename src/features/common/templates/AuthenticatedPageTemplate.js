import React from 'react';
import {
    Mobile,
    Button,
    //     MobileNavigation,
    //     MobileMenuItem,
    //     MobileSubNavigation,
    //     MobileSubNavigationItem,
} from '@ecster/ecster-components';
import { Translate } from '@ecster/ecster-i18n';

import {
    MobileNavigation,
    MobileMenuItem,
    MobileMenuItems,
    MobileSubNavigation,
    MobileSubNavigationItem,
} from './menu/index';

import iconOverview from '../../../common/images/icon-overview.svg';
import iconInvoices from '../../../common/images/icon-invoices.svg';
import iconLoan from '../../../common/images/icon-loan.svg';
import iconHamburger from '../../../common/images/icon-hamburger.svg';

const i18n = Translate.getText;

export default class AuthenticatedPageTemplate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showMoreMenu: false,
        };
    }

    componentDidUpdate(prevProps, prevState) {
        console.log('did update: ', this.state, prevProps, prevState);
    }

    showMoreMenu = e => {
        e.stopPropagation();
        e.preventDefault();
        this.setState({ showMoreMenu: true }, () => {
            console.log('I setted de state');
        });
    };

    closeMoreMenu = () => {
        this.setState({ showMoreMenu: false }, () => {
            console.log('I setted de state');
        });
    };

    render() {
        return (
            <div className="common-authenticated-page">
                <Mobile>
                    <MobileNavigation light>
                        <MobileMenuItems>
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
                        </MobileMenuItems>
                        <MobileSubNavigation show={this.state.showMoreMenu} requestClose={this.closeMoreMenu}>
                            <MobileSubNavigationItem>{i18n('navigation.customer-support')}</MobileSubNavigationItem>
                            <MobileSubNavigationItem>{i18n('navigation.settings')}</MobileSubNavigationItem>
                        </MobileSubNavigation>
                    </MobileNavigation>
                </Mobile>
            </div>
        );
    }
}
