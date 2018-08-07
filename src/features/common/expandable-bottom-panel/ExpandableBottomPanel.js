/* eslint-disable no-undef */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './ExpandableBottomPanel.scss';
import { InteractiveElement } from './../interactive-element/InteractiveElement';

const MIN_COLLAPSABLE_HEIGHT = 5;
const COLLAPSED_HEIGHT = 0;

class ExpandableBottomPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = { collapsed: true };
    }

    componentDidMount() {
        this.checkHeight();
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
        const {
            icon,
            style,
            children,
            noPadding,
            compact,
            noBorder,
            showMoreLabel,
            showLessLabel,
            className,
        } = this.props;
        const { collapsed } = this.state;

        const rootClasses = classNames({
            'expandable-bottom-panel': true,
            'expandable-bottom-panel--padded': !noPadding,
            'expandable-bottom-panel--compact': compact,
            'expandable-bottom-panel--bordered': !noBorder,
            'expandable-bottom-panel--no-bottom-padding': collapsed,
            [className]: className,
        });

        const arrowClasses = classNames({
            'expandable-bottom-panel__arrow': true,
            'expandable-bottom-panel__arrow--expanded': !collapsed,
        });

        return (
            <div style={style} className={rootClasses}>
                <InteractiveElement tabIndex="0" className="expandable-bottom-panel__expander" onClick={this.toggleExpansion}>
                    <span className="bottom-panel-expander__show-more-text">{collapsed ? showMoreLabel : showLessLabel}</span>
                    <div>
                        <span className={arrowClasses}>
                            <i className={icon} alt="expand" />
                        </span>
                    </div>
                </InteractiveElement>
                <div
                    className="expandable-bottom-panel__content"
                    ref={el => {
                        this.el = el;
                    }}
                >
                    {children}
                </div>
            </div>
        );
    }
}
ExpandableBottomPanel.propTypes = {
    children: PropTypes.node.isRequired,
    compact: PropTypes.bool,
    noPadding: PropTypes.bool,
    noBorder: PropTypes.bool,
    style: PropTypes.shape(),
    icon: PropTypes.string,
    showMoreLabel: PropTypes.string,
    showLessLabel: PropTypes.string,
    className: PropTypes.string,
};

ExpandableBottomPanel.defaultProps = {
    noPadding: false,
    compact: false,
    noBorder: false,
    style: {},
    icon: 'icon-chevron-down',
    showMoreLabel: 'Visa mer',
    showLessLabel: 'Visa mindre',
    className: '',
};

export default ExpandableBottomPanel;
