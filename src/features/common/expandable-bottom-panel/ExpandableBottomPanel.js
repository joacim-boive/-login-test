import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { InteractiveElement } from '@ecster/ecster-components';
import './ExpandableBottomPanel.scss';

class ExpandableBottomPanel extends Component {
    state = { isCollapsed: true };

    toggleExpansion = () => {
        const { isCollapsed } = this.state;

        // if (isCollapsed) {
        //
        // }
        this.setState({ isCollapsed: !isCollapsed });
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
        const { isCollapsed } = this.state;

        const rootClasses = classNames({
            'expandable-bottom-panel': true,
            'expandable-bottom-panel--padded': !noPadding,
            'expandable-bottom-panel--compact': compact,
            'expandable-bottom-panel--bordered': !noBorder,
            [className]: className,
        });

        const arrowClasses = classNames({
            'expandable-bottom-panel__arrow': true,
            'expandable-bottom-panel__arrow--expanded': !isCollapsed,
        });

        return (
            <div style={style} className={rootClasses}>
                <InteractiveElement className="expandable-bottom-panel__expander" onClick={this.toggleExpansion}>
                    <span className="bottom-panel-expander__show-more-text">
                        {isCollapsed ? showMoreLabel : showLessLabel}
                    </span>
                    <div>
                        <span className={arrowClasses}>
                            <i className={icon} />
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
