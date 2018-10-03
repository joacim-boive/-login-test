import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Panel, InteractiveElement } from '@ecster/ecster-components';
import './ExpandablePanel.scss';

class ExpandablePanel extends Component {
    state = {
        initializing: true,
        isCollapsed: this.props.collapse,
        maxHeight: null,
        thisStyle: {},
    };

    componentDidMount() {
        const { isCollapsed } = this.state;
        const height = isCollapsed ? 0 : this.el.offsetHeight;

        this.setState({
            initializing: false,
            thisStyle: { height: `${height}px` },
            maxHeight: height,
        });
    }

    componentWillReceiveProps(prevProps) {
        // We need to keep track if the next-button is pressed
        // As well as maintain the current state of expand/collapse
        const { collapse } = this.props;

        if (collapse !== prevProps.collapse) {
            this.toggleExpansion(null, collapse);
        }
    }

    onTransitionEnd = () => {
        // We have to remove the height when done so the box can grow if needed
        this.setState({ thisStyle: {} });
    };

    toggleExpansion = (component, collapse = null) => {
        const { isCollapsed, maxHeight } = this.state;
        const height = !isCollapsed ? 0 : maxHeight;

        if (!isCollapsed) {
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
                isCollapsed: collapse || !isCollapsed,
            });
        }
    };

    render() {
        const { icon, style, children, noBorder, showMoreLabel, showLessLabel, className } = this.props;
        const { isCollapsed, initializing, thisStyle } = this.state;

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
            initializing,
            'expandable-panel__content': true,
            'is-collapsed': isCollapsed,
        });

        return (
            <Panel style={style} className={rootClasses}>
                <InteractiveElement className="expandable-panel__expander" onClick={this.toggleExpansion}>
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
                    onTransitionEnd={() => {
                        this.onTransitionEnd(this);
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
