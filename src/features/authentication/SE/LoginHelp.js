import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Overlay from '../../common/Overlay';

export default class LoginHelp extends Component {
    render() {
        return (
            <Overlay
                header="home.login.help.header"
                body="home.login.help.body"
                toggleOverlay={() => this.props.toggleState('isHelpVisible')}
            />
        );
    }
}

LoginHelp.propTypes = {
    toggleState: PropTypes.func.isRequired,
};
