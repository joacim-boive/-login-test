import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { InteractiveElement } from '@ecster/ecster-components';
import './AlphaLabel.scss';

import { showAlphaOnboarding } from '../redux/actions';

class AlphaLabel extends React.Component {
    static propTypes = {
        showAlphaOnboarding: PropTypes.func.isRequired,
    };

    onAlphaClick = () => {
        this.props.showAlphaOnboarding();
    };

    render() {
        return (
            <div className="alpha">
                <InteractiveElement onClick={this.onAlphaClick} className="label">
                    ALPHA
                </InteractiveElement>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    showAlphaOnboarding: () => dispatch(showAlphaOnboarding()),
});

export default connect(
    undefined,
    mapDispatchToProps
)(AlphaLabel);
