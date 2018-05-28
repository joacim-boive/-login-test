import React from 'react';
// import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { Translate } from '@ecster/ecster-i18n';
import { Logo } from '@ecster/ecster-components';
import { TopNavigation, TopMenu, SubMenu, SubMenuItem } from '../menu/index';

import './TabletDesktopNavigation.scss';

const i18n = Translate.getText;

class TabletDesktopNavigation extends React.Component {
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
        const submenuIsActive = this.state.showMoreSubMenu;
        const overviewIsActive = !submenuIsActive && this.props.history.location.pathname.match(/.account.overview/);
        const invoiceIsActive = !submenuIsActive && this.props.history.location.pathname.match(/.invoice.overview/);
        const loanIsActive = !submenuIsActive && this.props.history.location.pathname.match(/.loan.overview/);

        return (
            <TopNavigation>
                <TopMenu>
                    <div className="top-menu-container">
                        <a href="#/account/overview">
                            <Logo withName fill="#fff" width="120px" />
                        </a>
                        <div className="top-menu-links">
                            <Link
                                className={classNames({
                                    active: overviewIsActive,
                                })}
                                to="/account/overview"
                            >
                                {i18n('navigation.account-overview')}
                            </Link>

                            <Link
                                className={classNames({
                                    active: invoiceIsActive,
                                })}
                                to="/invoice/overview"
                            >
                                {i18n('navigation.invoices')}
                            </Link>

                            <Link
                                className={classNames({
                                    active: loanIsActive,
                                })}
                                to="/loan/overview"
                            >
                                {i18n('navigation.loan')}
                            </Link>

                            <Link
                                className={classNames({
                                    'icon-link': true,
                                    active: submenuIsActive,
                                })}
                                to=""
                                onClick={this.showMoreSubMenu}
                            >
                                <i className="icon-menu" />
                            </Link>
                        </div>
                    </div>
                </TopMenu>
                <div className="submenu-container">
                    <SubMenu top show={this.state.showMoreSubMenu} requestClose={this.closeMoreSubMenu}>
                        <SubMenuItem linkTo="/customer/settings">{i18n('navigation.settings')}</SubMenuItem>
                        <SubMenuItem linkTo="/customer/support">{i18n('navigation.customer-support')}</SubMenuItem>
                        <SubMenuItem iconClass="icon-lock">{i18n('navigation.logout')}</SubMenuItem>
                    </SubMenu>
                </div>
            </TopNavigation>
        );
    }
}

export default withRouter(TabletDesktopNavigation);
