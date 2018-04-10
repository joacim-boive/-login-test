import React, { Component } from 'react';

export default class Spinner extends Component {
  static propTypes = {

  };

  render() {
    return (
        <div className="spinner">
            <div className="spinner1" />
            <div className="spinner2" />
            <div className="spinner3" />
            <div className="spinner4" />
        </div>
    );
  }
}
