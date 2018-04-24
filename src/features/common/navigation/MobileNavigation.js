import React from 'react';
// import PropTypes from 'prop-types';
import { Translate } from '@ecster/ecster-i18n';

import { StickyNavigation, MainMenu, MenuItem, SubMenu, SubMenuItem } from '../menu/index';

import iconOverview from '../../../common/images/icon-overview.svg';
import iconInvoices from '../../../common/images/icon-invoices.svg';
import iconLoan from '../../../common/images/icon-loan.svg';
import iconHamburger from '../../../common/images/icon-hamburger.svg';

const i18n = Translate.getText;

export default class MobileNavigation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showMoreSubMenu: false,
        };
    }

    showMoreSubMenu = e => {
        e.stopPropagation();
        e.preventDefault();
        this.setState({ showMoreSubMenu: true }, () => {
            console.log('I setted de state');
        });
    };

    closeMoreSubMenu = () => {
        this.setState({ showMoreSubMenu: false }, () => {
            console.log('I setted de state');
        });
    };

    render() {
        return (
            <StickyNavigation light showOverlay={this.state.showMoreSubMenu}>
                <MainMenu>
                    <MenuItem linkTo="/account/overview" icon={iconOverview}>
                        {i18n('navigation.account-overview')}
                    </MenuItem>

                    <MenuItem linkTo="/invoice/overview" icon={iconInvoices}>
                        {i18n('navigation.invoices')}
                    </MenuItem>
                    <MenuItem linkTo="/loan/overview" icon={iconLoan}>
                        {i18n('navigation.loan')}
                    </MenuItem>
                    <MenuItem onClick={this.showMoreSubMenu} icon={iconHamburger}>
                        {i18n('navigation.more')}
                    </MenuItem>
                </MainMenu>
                <SubMenu show={this.state.showMoreSubMenu} requestClose={this.closeMoreSubMenu}>
                    <SubMenuItem linkTo="/customer/support">{i18n('navigation.customer-support')}</SubMenuItem>
                    <SubMenuItem linkTo="/customer/settings">{i18n('navigation.settings')}</SubMenuItem>
                    <SubMenuItem iconClass="icon-lock">{i18n('navigation.logout')}</SubMenuItem>
                </SubMenu>
            </StickyNavigation>
        );
    }
}
