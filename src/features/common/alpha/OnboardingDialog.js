import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Dialog, DialogBody, ButtonGroup, Button } from '@ecster/ecster-components';
import { Cookie } from '@ecster/ecster-net';
import { getText as i18n } from '@ecster/ecster-i18n/lib/Translate';
import handIcon from '../../../common/images/icon-hand-flower.svg';
import { hideAlphaOnboarding } from '../redux/actions';

const ALPHA_COOKIE = 'alpha-info';

class OnboardingDialog extends Component {
    static propTypes = {
        hideAlphaOnboarding: PropTypes.func.isRequired,
        showOnboarding: PropTypes.bool,
    };

    static defaultProps = {
        showOnboarding: false,
    };

    state = {
        showDialog: false,
    };

    componentDidMount() {
        const seenAlready = Cookie.read(ALPHA_COOKIE);
        if (!seenAlready) {
            this.setState({ showDialog: true });
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.showOnboarding) {
            this.setState({ showDialog: true });
        }
    }

    onClickGo = () => {
        this.setState({ showDialog: false });
        this.props.hideAlphaOnboarding();
        Cookie.create(ALPHA_COOKIE, true, { days: 3650 });
    };

    render() {
        const { showDialog } = this.state;

        return (
            <Dialog
                rounded3x
                maxWidth="500px"
                fullscreenMobile
                open={showDialog}
                className="common-onboarding-dialog e-bg-beige10"
            >
                <div className="dialog-ctr">
                    <DialogBody centeredContent className="dialog">
                        <img src={handIcon} className="hand-icon mb-6x" />
                        <h2 className="e-green120">{i18n('common.alpha.header')}</h2>
                        {i18n('common.alpha.info', {
                            returnObjects: true,
                            wrapper: { tag: 'p' },
                        })}
                    </DialogBody>
                    <ButtonGroup alignCenter>
                        <Button round onClick={this.onClickGo}>
                            {i18n('common.alpha.button-text')}
                        </Button>
                    </ButtonGroup>
                </div>
            </Dialog>
        );
    }
}

const mapStateToProps = ({ common }) => ({
    showOnboarding: common.alpha && common.alpha.showOnboarding,
});

const mapDispatchToProps = dispatch => ({
    hideAlphaOnboarding: () => dispatch(hideAlphaOnboarding()),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(OnboardingDialog);
