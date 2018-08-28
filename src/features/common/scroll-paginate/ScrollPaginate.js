import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ButtonGroup, Button } from '@ecster/ecster-components';
import { getText as i18n } from '@ecster/ecster-i18n/lib/Translate';

import debounce from 'lodash/debounce';

import './ScrollPaginate.scss';

export class ScrollPaginate extends Component {
    state = {
        showMoreButton: false,
    };

    // Using class fields instead of state/props to not do unnecessary re-renders in react
    hasNewData = true;

    isInitialLoad = true;

    componentDidMount() {
        window.addEventListener('scroll', this.onScroll);

        this.setState({ showMoreButton: !document.scrollingElement });
    }

    componentDidUpdate(prevProps) {
        const { children } = this.props;

        this.hasNewData = prevProps.children.props.transactions.length < children.props.transactions.length;
        return null;
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.onScroll);
    }

    onScroll = debounce(e => {
        const { offset, onScrollBottom } = this.props;

        const el = e.target.scrollingElement;
        const bottom = el.scrollHeight - el.scrollTop < el.clientHeight + offset;

        if (bottom) {
            // Trigger once when entering trigger threshold
            if (!this.hasNewData && !this.isInitialLoad) {
                // No more data available, remove the listener.
                return window.removeEventListener('scroll', this.onScroll);
            }

            this.isInitialLoad = false;
            onScrollBottom();
        }

        return true;
    }, 300);

    render() {
        const { children, onScrollBottom } = this.props;
        const { showMoreButton } = this.state;

        return (
            <div ref={ref => (this.container = ref)} className="scroll-paginate">
                {children}
                {showMoreButton && (
                    <ButtonGroup align="center">
                        <Button round outline small onClick={onScrollBottom}>
                            {i18n('account.transactions.show-more')}
                        </Button>
                    </ButtonGroup>
                )}
            </div>
        );
    }
}

ScrollPaginate.propTypes = {
    children: PropTypes.node.isRequired,
    onScrollBottom: PropTypes.func,
    offset: PropTypes.number,
};

ScrollPaginate.defaultProps = {
    onScrollBottom: () => {},
    offset: 400,
};
