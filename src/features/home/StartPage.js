import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

export class StartPage extends Component {
    static propTypes = {
        home: PropTypes.object.isRequired,
        actions: PropTypes.object.isRequired,
    };

    render() {
        return (
          <div className="home-start-page">
            <a href="http://github.com/supnate/rekit"><img
              src={require('../../images/logo.png')}
              className="app-logo"
              alt="logo"
            />
            </a>
            <h1>Welcome to your Rekit application!</h1>
            <p>
                    Contratulations! You have created your Rekit app successfully! Seeing this page means everything
                    works well now.
            </p>
            <p>
                    By default <a href="https://github.com/supnate/rekit">Rekit Studio</a> is also started at <a
                      href="http://localhost:6076"
                    >http://localhost:6076
                    </a> to manage the project.
            </p>
            <p>
                    To learn more about how to get started, you can visit: <a
                      href="http://rekit.js.org/docs/get-started.html"
                    >Get started
                    </a>
            </p>
            <h3>No Demos</h3>
          </div>
        );
    }
}

/* istanbul ignore next */
function mapStateToProps(state) {
    return {
        home: state.home,
    };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
    return {};
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(StartPage);
