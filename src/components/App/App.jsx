import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signInFromCookie } from '../../modules/auth';
import Layout from '../Layout/Layout';

class App extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    signInFromCookie: PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.props.signInFromCookie();
  }

  render() {
    return (
      <Layout>
        {this.props.children}
      </Layout>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return { signInFromCookie: () => dispatch(signInFromCookie()) };
}

export default connect(null, mapDispatchToProps)(App);
