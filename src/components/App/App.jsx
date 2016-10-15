import React from 'react';
import Layout from '../Layout/Layout';

export default function App(props) {
  return (
    <Layout>
      {props.children}
    </Layout>
  );
}

App.propTypes = {
  children: React.PropTypes.node.isRequired,
};
