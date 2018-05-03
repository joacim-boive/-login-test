import React from 'react';
// import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Translate } from '@ecster/ecster-i18n';
import { Logo } from '@ecster/ecster-components';
import { TopNavigation, TopMenu, SubMenu, SubMenuItem } from '../menu/index';

import './DesktopTabletNavigation.scss';

const i18n = Translate.getText;

export default class DesktopTabletNavigation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showMoreSubMenu: false,
        };
    }

    showMoreSubMenu = e => {
        e.stopPropagation();
        e.preventDefault();
        this.setState({ showMoreSubMenu: true });
    };

    closeMoreSubMenu = () => {
        this.setState({ showMoreSubMenu: false });
    };

    render() {
        return (
            <TopNavigation>
                <TopMenu>
                    <div className="top-menu-container">
                        <Logo withName fill="#ffffff" width="120px" />
                        <div className="top-menu-links">
                            <Link to="/account/overview">{i18n('navigation.account-overview')}</Link>

                            <Link to="/invoice/overview">{i18n('navigation.invoices')}</Link>

                            <Link to="/loan/overview">{i18n('navigation.loan')}</Link>

                            <Link className="icon-link" to="" onClick={this.showMoreSubMenu}>
                                <i className="icon-menu" />
                            </Link>
                        </div>
                    </div>
                </TopMenu>
                <div className="submenu-container">
                    <SubMenu top show={this.state.showMoreSubMenu} requestClose={this.closeMoreSubMenu}>
                        <SubMenuItem linkTo="/customer/support">{i18n('navigation.customer-support')}</SubMenuItem>
                        <SubMenuItem linkTo="/customer/settings">{i18n('navigation.settings')}</SubMenuItem>
                        <SubMenuItem iconClass="icon-lock">{i18n('navigation.logout')}</SubMenuItem>
                    </SubMenu>
                </div>
            </TopNavigation>
        );
    }
}
