/* eslint-disable react/no-danger */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { getText as i18n } from '@ecster/ecster-i18n/lib/Translate';
import { Button } from '@ecster/ecster-components';

import './Overlay.scss';

export default class Overlay extends Component {
    /* Needs to be a class as we need access to the lifecycles */

    static propTypes = {
        header: PropTypes.string.isRequired,
        body: PropTypes.string.isRequired,
        toggleOverlay: PropTypes.func.isRequired,
        isCompact: PropTypes.bool,
        isNoClose: PropTypes.bool,
        children: PropTypes.array,
        buttonCloseLabel: PropTypes.string,
    };

    static defaultProps = {
        isCompact: false,
        isNoClose: false,
        children: undefined,
        buttonCloseLabel: i18n('general.buttons.close'),
    };

    componentDidMount() {
        // eslint-disable-next-line no-unused-expressions
        !this.props.isNoClose && document.addEventListener('keydown', this.onEscape, false);
        document.addEventListener('transitionend', this.removeComponent, false);

        this.showWindow();
    }

    componentWillUnmount() {
        // eslint-disable-next-line no-unused-expressions
        !this.props.isNoClose && document.removeEventListener('keydown', this.onEscape, false);
        document.removeEventListener('transitionend', this.removeComponent, false);
    }

    onEscape = event => {
        // Check for ESC keypress
        if (event.keyCode === 27) {
            this.hideWindow();
        }
    };

    showWindow = () => {
        setTimeout(() => {
            const overlay = document.querySelector('.overlay');

            if (overlay) {
                overlay.classList.add('show');
            } else {
                console.log('Retry');
                this.props.toggleOverlay(true);
                window.requestAnimationFrame(this.showWindow);
            }
        }, 100);
    };

    hideWindow = () => {
        document.querySelector('.overlay').classList.remove('show');
    };

    removeComponent = () => {
        if (!document.querySelector('.overlay').classList.contains('show')) {
            this.props.toggleOverlay();
        } else {
            // eslint-disable-next-line no-unused-expressions
            !this.props.isNoClose ? document.querySelector('.icon-close').classList.add('show') : '';
        }
    };

    render() {
        const { header, body, isCompact, children } = this.props;

        const i18nBody = i18n(body, { returnObjects: true });
        const thisBody = !Array.isArray(i18nBody)
            ? `<p>${i18nBody}</p>`
            : i18nBody.map(row => `<p>${row}</p>`).join('');

        const className = classNames('overlay', { 'overlay--compact': isCompact });

        return (
            <div className={className}>
                <article>
                    <h1>{i18n(header)}</h1>
                    <div dangerouslySetInnerHTML={{ __html: thisBody }} />
                    {children}
                </article>
                {!this.props.isNoClose && (
                    <aside className="close">
                        <Button id="closeOverlay" className="icon-close" onClick={this.hideWindow} transparent>
                            <span className="visually-hidden">
                                {this.props.buttonCloseLabel || i18n('general.buttons.help')}
                            </span>
                        </Button>
                    </aside>
                )}
            </div>
        );
    }
}
