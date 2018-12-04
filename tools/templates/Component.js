import React from 'react';
import PropTypes from 'prop-types';
// Ecster imports
import { getText as i18n } from '@ecster/ecster-i18n/lib/Translate';
import { Button } from '@ecster/ecster-components';

export default class ${_.pascalCase(component)} extends React.Component {
    static propTypes = {};

    static defaultProps = {};

    state = {};

    render() {
        return (
            <div className="${_.kebabCase(feature || 'component') + '-' + _.kebabCase(component)}">
              Component content: ${_.kebabCase(feature)}/${_.pascalCase(component)}
            </div>
        );
    }
}
