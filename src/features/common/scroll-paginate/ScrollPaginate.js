import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './ScrollPaginate.scss';

export class ScrollPaginate extends Component {
    state = {
        bottom: false,
    }

    componentDidMount() {
        window.addEventListener('scroll', this.onScroll);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.onScroll);
    }

    onScroll = e => {
        const el = e.target.scrollingElement;
        const bottom = el.scrollHeight - el.scrollTop < el.clientHeight + this.props.offset;
        if (bottom && !this.state.bottom) {
            // Trigger once when entering trigger threshold
            this.props.onScrollBottom();
        }
        this.setState({ bottom });
    };

    render() {
        return (
            <div ref={ref => (this.container = ref)} className="scroll-paginate">
                {this.props.children}
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
