import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { RedditList } from './';
import { fetchRedditReactjsList } from './redux/actions';

export class DefaultPage extends Component {
  static propTypes = {
    home: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  render() {
    const { fetchRedditReactjsListPending, redditReactjsList, fetchRedditReactjsListError } = this.props.home;
    const { fetchRedditReactjsList } = this.props.actions;
    return (
      <div className="home-default-page">
        <a href="http://github.com/supnate/rekit"><img src={require('../../images/logo.png')} className="app-logo" alt="logo" /></a>
        <h1>Welcome to your Rekit application!</h1>
        <p>
          Contratulations! You have created your Rekit app successfully! Seeing this page means everything works well now.
        </p>
        <p>
          By default <a href="https://github.com/supnate/rekit">Rekit Studio</a> is also started at <a href="http://localhost:6076">http://localhost:6076</a> to manage the project.
        </p>
        <p>
          The app has been initialized with two features named &quot;common&quot; and &quot;home&quot; and two samples: counter and Reddit list viewer as shown below.
        </p>
        <p>
          To learn more about how to get started, you can visit: <a href="http://rekit.js.org/docs/get-started.html">Get started</a>
        </p>
        <h3>Demos</h3>

        <p className="section-title">To see how async flow works, here is an example of fetching reddit reactjs topics:</p>
        <div className="demo-reddit">
          <button className="btn-fetch-reddit" disabled={fetchRedditReactjsListPending} onClick={fetchRedditReactjsList}>
            {fetchRedditReactjsListPending ? 'Fetching...' : 'Fetch reactjs topics'}
          </button>
          {
            fetchRedditReactjsListError &&
              <div className="fetch-list-error">
                Failed to load: {fetchRedditReactjsListError.toString()}
              </div>
          }
          <RedditList list={redditReactjsList} />
        </div>
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
  return {
    actions: bindActionCreators({ fetchRedditReactjsList }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DefaultPage);
