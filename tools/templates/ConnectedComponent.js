import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
// Ecster imports
import { getText as i18n } from '@ecster/ecster-i18n/lib/Translate';
import { Panel } from '@ecster/ecster-components';

export class ${_.pascalCase(component)} extends React.Component {
    static propTypes = {
        ${_.camelCase(feature)}: PropTypes.object.isRequired,
        actions: PropTypes.object.isRequired,
    };

    static defaultProps = {};

    state = {};

    render() {
        return (
            <Panel className="${_.kebabCase(feature)}-${_.kebabCase(component)}">
                Page Content: ${_.kebabCase(feature)}/${_.pascalCase(component)}
            </Panel>
        );
    }
}

/* istanbul ignore next */
function mapStateToProps(state) {
    return {
        ${_.camelCase(feature)}: state.${_.camelCase(feature)},
    };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({ ...actions }, dispatch)
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(${_.pascalCase(component)});
