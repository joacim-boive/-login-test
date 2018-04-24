import React from 'react';
import PropTypes from 'prop-types';
import { Mobile } from '@ecster/ecster-components';
import { Translate } from '@ecster/ecster-i18n';

import { StickyNavigation, MainMenu, MenuItem, SubMenu, SubMenuItem } from './menu/index';

import iconOverview from '../../../common/images/icon-overview.svg';
import iconInvoices from '../../../common/images/icon-invoices.svg';
import iconLoan from '../../../common/images/icon-loan.svg';
import iconHamburger from '../../../common/images/icon-hamburger.svg';

const i18n = Translate.getText;

export default class AuthenticatedPageTemplate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showSubMenu: false,
        };
    }

    componentDidUpdate(prevProps, prevState) {
        console.log('did update: ', this.state, prevProps, prevState);
    }

    showSubMenu = e => {
        e.stopPropagation();
        e.preventDefault();
        this.setState({ showSubMenu: true }, () => {
            console.log('I setted de state');
        });
    };

    closeSubMenu = () => {
        this.setState({ showSubMenu: false }, () => {
            console.log('I setted de state');
        });
    };

    render() {
        return (
            <div className="common-authenticated-page">
                {this.props.children}
                <Mobile>
                    <StickyNavigation light showOverlay={this.state.showSubMenu}>
                        <MainMenu>
                            <MenuItem linkTo="/account/overview" icon={iconOverview}>
                                {i18n('navigation.account-overview')}
                            </MenuItem>

                            <MenuItem linkTo="/invoice" icon={iconInvoices}>
                                {i18n('navigation.invoices')}
                            </MenuItem>
                            <MenuItem linkTo="/loan" icon={iconLoan}>
                                {i18n('navigation.loan')}
                            </MenuItem>
                            <MenuItem onClick={this.showSubMenu} icon={iconHamburger}>
                                {i18n('navigation.more')}
                            </MenuItem>
                        </MainMenu>
                        <SubMenu show={this.state.showSubMenu} requestClose={this.closeSubMenu}>
                            <SubMenuItem>{i18n('navigation.customer-support')}</SubMenuItem>
                            <SubMenuItem>{i18n('navigation.settings')}</SubMenuItem>
                            <SubMenuItem iconClass="icon-lock">{i18n('navigation.logout')}</SubMenuItem>
                        </SubMenu>
                    </StickyNavigation>
                </Mobile>
            </div>
        );
    }
}

AuthenticatedPageTemplate.propTypes = {
    children: PropTypes.node.isRequired,
};
