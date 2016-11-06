import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { signIn } from '../../modules/auth';
import './SignIn.sass';

class SignIn extends React.Component {
  constructor() {
    super();

    this.state = { login: '', password: '' };
    this.signIn = this.signIn.bind(this);
  }

  signIn() {
    this.props.signIn(this.state);
  }

  handleChange(field) {
    return (function doHandleChange(e) {
      this.setState({ [field]: e.target.value });
    }).bind(this);
  }

  render() {
    return (
      <div className="SignIn">
        <input
          className={`SignIn__Input${this.props.error ? '--Error' : ''}`}
          placeholder="Login"
          type="text"
          required
          onChange={this.handleChange('login')}
        />
        <div className="SignIn__InputGroup">
          <input
            className={`SignIn__Input--WithBtn${this.props.error ? '--Error' : ''}`}
            placeholder="Password"
            type="password"
            required
            onChange={this.handleChange('password')}
          />
          <button onClick={this.signIn} className="SignIn__Btn">&gt;&gt;</button>
        </div>
        {this.props.error &&
          <p className="SignIn__ErrorMessage">{this.props.error}</p>
        }
      </div>
    );
  }
}

SignIn.propTypes = {
  signIn: PropTypes.func.isRequired,
  error: PropTypes.string,
};

function mapStateToProps({ auth }) {
  return { error: auth.getIn(['signInErrors', 'error', 'error']) };
}

function mapDispatchToProps(dispatch) {
  return {
    signIn: user => dispatch(signIn(user)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
