import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { signIn } from '../../modules/auth';
import './SignIn.sass';

class SignIn extends React.Component {
  constructor() {
    super();

    this.signIn = this.signIn.bind(this);
  }

  signIn() {
    this.props.signIn(this.refs.login.value, this.refs.password.value);
  }

  render() {
    return (
      <div className="SignIn">
        <input className="SignIn__Input"
               placeholder="Login"
               type="text"
               required
               ref="login"
        />
        <div className="SignIn__InputGroup">
          <input className="SignIn__Input--WithBtn"
                 placeholder="Password"
                 type="password"
                 required
                 ref="password"
          />
          <button onClick={this.signIn} className="SignIn__Btn">&gt;&gt;</button>
        </div>
      </div>
    );
  }
}

SignIn.propTypes = { signIn: PropTypes.func.isRequired };

function mapDispatchToProps(dispatch) {
  return {
    signIn: (login, password) => dispatch(signIn({login, password})),
  };
}

export default connect(null, mapDispatchToProps)(SignIn);
