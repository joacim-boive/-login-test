/* eslint-disable no-undef */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Panel, InteractiveElement } from '@ecster/ecster-components';
import './ExpandablePanel.scss';

const MIN_COLLAPSABLE_HEIGHT = 5;
const COLLAPSED_HEIGHT = 0;

class ExpandablePanel extends React.Component {
    constructor(props) {
        super(props);

        this.state = { collapsed: true };
    }

    componentDidMount() {
        this.checkHeight();
        if (!this.props.collapse) {
            this.toggleExpansion();
        }
    }

    checkHeight = () => {
        const actualHeight = this.el.offsetHeight;
        this.setState({ collapsed: actualHeight > MIN_COLLAPSABLE_HEIGHT });
        this.el.style.height = `${COLLAPSED_HEIGHT}px`;
    };

    toggleExpansion = () => {
        if (this.state.collapsed) {
            this.el.style.height = null;
            const actualHeight = this.el.offsetHeight;
            this.el.style.height = `${COLLAPSED_HEIGHT}px`;
            requestAnimationFrame(() => {
                this.el.style.height = `${actualHeight}px`;
                setTimeout(() => {
                    this.el.style.height = null;
                }, 600);
            });
        } else {
            const actualHeight = this.el.offsetHeight;
            this.el.style.height = `${actualHeight}px`;
            requestAnimationFrame(() => {
                this.el.style.height = `${COLLAPSED_HEIGHT}px`;
            });
        }
        this.setState({ collapsed: !this.state.collapsed });
    };

    render() {
        const { icon, style, children, noBorder, showMoreLabel, showLessLabel, className } = this.props;
        const { collapsed } = this.state;

        const rootClasses = classNames({
            'expandable-panel': true,
            'expandable-panel--bordered': !noBorder,
            'expandable-panel--no-bottom-padding': collapsed,
            [className]: className,
        });

        const arrowClasses = classNames({
            'expandable-panel__arrow': true,
            'expandable-panel__arrow--expanded': !collapsed,
        });

        return (
            <Panel style={style} className={rootClasses}>
                <InteractiveElement tabIndex="0" className="expandable-panel__expander" onClick={this.toggleExpansion}>
                    <span className="expandable-panel__show-more-text">
                        {collapsed ? showMoreLabel : showLessLabel}
                    </span>
                    <div className="expandable-panel__arrow-wrapper">
                        <span className={arrowClasses}>
                            <i className={icon} alt="expand" />
                        </span>
                    </div>
                </InteractiveElement>
                <div
                    className="expandable-panel__content"
                    ref={el => {
                        this.el = el;
                    }}
                >
                    {children}
                </div>
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
    collapse: true,
    noBorder: false,
    style: {},
    icon: 'icon-chevron-down',
    showMoreLabel: 'Visa mer',
    showLessLabel: 'Visa mindre',
    className: '',
};

export default ExpandablePanel;
