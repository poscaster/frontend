import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { signUp } from '../../modules/auth';
import './SignUp.sass';

class SignUp extends React.Component {
  render() {
    return (
      <div className="SignUp">
        <input className="SignUp__Input"
               placeholder="Invitation code"
               ref="invitation"
        />
        <input className="SignUp__Input"
               placeholder="Login"
               ref="login"
        />
        <input className="SignUp__Input"
               placeholder="Email"
               ref="email"
        />
        <input className="SignUp__Input"
               type="password"
               placeholder="Password"
               ref="password"
        />
        <div className="SignIn__InputGroup">
          <input className="SignUp__Input--WithBtn"
                 type="password"
                 placeholder="Password confirmation"
                 ref="passwordConfirmation"
          />
          <button onClick={this.signUp} className="SignIn__Btn">&gt;&gt;</button>
        </div>
      </div>
    );
  }
}

SignUp.propTypes = { signUp: PropTypes.func.isRequired };

function mapDispatchToProps(dispatch) {
  return {
    signUp: () => dispatch(signUp()),
  };
}

export default connect(null, mapDispatchToProps)(SignUp);
