import React, { Component } from 'react';

import { Dialog, DialogBody, ButtonGroup, Button } from '@ecster/ecster-components';
import { Cookie } from '@ecster/ecster-net';
import { getText as i18n } from '@ecster/ecster-i18n/lib/Translate';

const ALPHA_COOKIE = 'alpha-info';

export default class OnboardingDialog extends Component {
    static propTypes = {};

    constructor(props) {
        super(props);
        this.state = {
            showDialog: false,
        };
    }

    componentDidMount() {
        const seenAlready = Cookie.read(ALPHA_COOKIE);
        if (!seenAlready) {
            this.setState({ showDialog: true });
        }
    }

    onClickGo = () => {
        this.setState({ showDialog: false });
        Cookie.create(ALPHA_COOKIE, true);
    };

    render() {
        const { showDialog } = this.state;

        return (
            <div className="common-onboarding-dialog">
                <Dialog borderRadius="15px" maxWidth="400px" open={showDialog}>
                    <DialogBody centeredContent>
                        <h1>{i18n('common.alpha.header')}</h1>
                        {i18n('common.alpha.info', {
                            returnObjects: true,
                            wrapper: { tag: 'p' },
                        })}
                    </DialogBody>
                    <ButtonGroup alignCenter>
                        <Button outline round onClick={this.onClickGo}>
                            {i18n('common.alpha.button-text')}
                        </Button>
                    </ButtonGroup>
                </Dialog>
            </div>
        );
    }
}
