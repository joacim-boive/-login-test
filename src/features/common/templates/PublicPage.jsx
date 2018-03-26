import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getSession } from '../../authentication/redux/actions';

export class PublicPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false
        };
    }

    componentWillMount() {
        this.props.getSession();
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            loggedIn: nextProps.session.authentication.status === 'VERIFIED'
        });
    }

    spinner() {
        return <p>Ej inloggad</p>;
    }

    render() {
        return (
          <div>
            { this.state.loggedIn && this.props.children }
          </div>
        );
    }
}

PublicPage.propTypes = {
    session: PropTypes.shape().isRequired,
    getSession: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired
};

/* istanbul ignore next */
function mapStateToProps({ authentication }) {
    return {
        session: authentication.session
    };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
    return {
        getSession: () => { dispatch(getSession()); }
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PublicPage);
