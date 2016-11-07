import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { signOut } from '../../modules/auth';
import './SignOut.sass';

function SignOut(props) {
  return (
    <div className="SignOut">
      <a tabIndex="0" className="SignOut__Link" href="javascript:;" onClick={props.signOut}>Sign Out</a>
    </div>
  );
}

SignOut.propTypes = { signOut: PropTypes.func.isRequired };

function mapDispatchToProps(dispatch) {
  return {
    signOut: () => dispatch(signOut()),
  };
}

export default connect(null, mapDispatchToProps)(SignOut);
