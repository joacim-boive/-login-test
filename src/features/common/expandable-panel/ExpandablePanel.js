/* eslint-disable react/no-did-update-set-state */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Panel, InteractiveElement } from '@ecster/ecster-components';
import './ExpandablePanel.scss';

class ExpandablePanel extends Component {
    state = {
        isCollapsed: this.props.collapse,
        maxHeight: null,
        thisStyle: {},
    };

    componentDidMount() {
        const { isCollapsed } = this.state;
        const maxHeight = this.getHeight();

        let setStyle;
        if (isCollapsed) {
            setStyle = { height: '0px' };
        }

        this.setState({
            thisStyle: setStyle,
            maxHeight,
        });
    }

    componentDidUpdate(prevProps) {
        // We need to keep track if the next-button is pressed
        // As well as maintain the current state of expand/collapse
        const { collapse: isCollapsed } = this.props;
        const { maxHeight } = this.state;

        if (isCollapsed !== prevProps.collapse) {
            const from = isCollapsed ? maxHeight : 0;
            const to = isCollapsed ? 0 : maxHeight;

            const promise = new Promise(resolve => {
                // We must set the height first so we have something for the transition
                this.setState({
                    thisStyle: { height: `${from}px` },
                    isCollapsed: false,
                });

                setTimeout(() => {
                    // Give the DOM a chance to update
                    // Maybe because React batches setState calls as well
                    resolve(true);
                }, 0);
            });

            promise.then(() => {
                // We're collapsing, must have a height set

                this.setState({
                    thisStyle: { height: `${to}px` },
                    isCollapsing: isCollapsed,
                    isCollapsed: from < to,
                });
            });
        }
    }

    getHeight = () => {
        return this.el.offsetHeight;
    };

    onTransitionEnd = () => {
        // We have to remove the height when done so the box can grow if needed
        const { isCollapsing } = this.state;
        const style = isCollapsing ? { height: '0px' } : null;

        this.setState({ isCollapsed: isCollapsing, isCollapsing: false, thisStyle: style });
    };

    toggleExpansion = () => {
        const { isCollapsed, maxHeight } = this.state;

        const height = isCollapsed ? 0 : maxHeight;

        if (isCollapsed) {
            const promise = new Promise(resolve => {
                // We must set the height first so we have something for the transition
                this.setState({
                    thisStyle: { height: `${maxHeight}px` },
                });

                setTimeout(() => {
                    // Give the DOM a chance to update
                    // Maybe because React batches setState calls as well
                    resolve(true);
                }, 0);
            });

            promise.then(() => {
                // We're collapsing, must have a height set

                this.setState({
                    thisStyle: { height: '0px' },
                    isCollapsed: true,
                });
            });
        } else {
            this.setState({
                thisStyle: { height: `${height}px` },
                isCollapsed: false,
            });
        }
    };

    render() {
        const {
            icon,
            style,
            children,
            noBorder,
            showMoreLabel,
            showLessLabel,
            className,
            collapse: isCollapsed,
            handleNextStep,
        } = this.props;
        const { thisStyle } = this.state;

        const rootClasses = classNames({
            'expandable-panel': true,
            'expandable-panel--bordered': !noBorder,
            'expandable-panel--no-bottom-padding': isCollapsed,
            [className]: className,
        });

        const arrowClasses = classNames({
            'expandable-panel__arrow': true,
            'expandable-panel__arrow--expanded': isCollapsed,
        });

        const contentClasses = classNames({
            'expandable-panel__content': true,
        });

        return (
            <Panel style={style} className={rootClasses}>

                <pre>state: {JSON.stringify(this.state, null, 2)}</pre>

                <InteractiveElement className="expandable-panel__expander" onClick={handleNextStep}>
                    <span className="expandable-panel__show-more-text">
                        {isCollapsed ? showMoreLabel : showLessLabel}
                    </span>
                    <div className="expandable-panel__arrow-wrapper">
                        <span className={arrowClasses}>
                            <i className={icon} />
                        </span>
                    </div>
                </InteractiveElement>
                <section
                    onTransitionEnd={event => {
                        // We're only interest for the transition for this element
                        // Otherwise we will get the transition event for the button as well
                        if (event.target.localName !== 'section') return;

                        this.onTransitionEnd();
                    }}
                    style={thisStyle}
                    className={contentClasses}
                    ref={el => {
                        this.el = el;
                    }}
                >
                    {children}
                </section>
            </Panel>
        );
    }
}
ExpandablePanel.propTypes = {
    children: PropTypes.node.isRequired,
    handleNextStep: PropTypes.func.isRequired,
    collapse: PropTypes.bool,
    noBorder: PropTypes.bool,
    style: PropTypes.shape(),
    icon: PropTypes.string,
    showMoreLabel: PropTypes.string,
    showLessLabel: PropTypes.string,
    className: PropTypes.string,
};

ExpandablePanel.defaultProps = {
    collapse: false,
    noBorder: false,
    style: {},
    icon: 'icon-chevron-down',
    showMoreLabel: 'Visa mer',
    showLessLabel: 'Visa mindre',
    className: '',
};

export default ExpandablePanel;
