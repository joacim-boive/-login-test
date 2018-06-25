import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ButtonGroup, Button } from '@ecster/ecster-components';
import { getText as i18n } from '@ecster/ecster-i18n/lib/Translate';
import './ScrollPaginate.scss';

export class ScrollPaginate extends Component {
    state = {
        bottom: false,
        showMoreButton: false,
    };

    componentDidMount() {
        window.addEventListener('scroll', this.onScroll);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.onScroll);
    }

    onScroll = e => {
        if (e.target.scrollingElement) {
            // normal browsers
            const el = e.target.scrollingElement;
            const bottom = el.scrollHeight - el.scrollTop < el.clientHeight + this.props.offset;
            if (bottom && !this.state.bottom) {
                // Trigger once when entering trigger threshold
                this.props.onScrollBottom();
            }
            this.setState({ bottom });
        } else {
            // IE
            this.setState({ showMoreButton: true });
        }
    };

    render() {
        return (
            <div ref={ref => (this.container = ref)} className="scroll-paginate">
                {this.props.children}
                {this.state.showMoreButton && (
                    <ButtonGroup align="center">
                        <Button round outline small onClick={this.props.onScrollBottom}>
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
