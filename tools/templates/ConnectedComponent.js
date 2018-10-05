import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
// Ecster imports
import { getText as i18n } from '@ecster/ecster-i18n/lib/Translate';
import { Panel } from '@ecster/ecster-components';

export class ${_.pascalCase(component)} extends React.Component {
    render() {
        return (
            <Panel className="${_.kebabCase(feature)}-${_.kebabCase(component)}">
                Page Content: ${_.kebabCase(feature)}/${_.pascalCase(component)}
            </Panel>
        );
    }
}

${_.pascalCase(component)}.propTypes = {
    ${_.camelCase(feature)}: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
};

${_.pascalCase(component)}.defaultProps = {};

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
