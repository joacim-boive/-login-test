import React from 'react';
import PropTypes from 'prop-types';

export default class InfoPageTemplate extends React.Component {
    static propTypes = {
        children: PropTypes.node.isRequired,
    };

    render() {
        return <div className="common-info-page">{this.props.children}</div>;
    }
}
