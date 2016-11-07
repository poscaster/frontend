import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { signUp } from '../../modules/auth';
import './SignUp.sass';

class SignUp extends React.Component {
  constructor() {
    super();

    this.state = {
      invitation_code: '',
      login: '',
      email: '',
      password: '',
      password_confirmation: '',
    };
    this.signUp = this.signUp.bind(this);
  }

  signUp() {
    this.props.signUp(this.state);
  }

  handleChange(field) {
    return (function doHandleChange(e) {
      this.setState({ [field]: e.target.value });
    }).bind(this);
  }

  renderInput(field, label, type = 'text', withBtn = false) {
    const errors = this.props.errors && this.props.errors[field];
    let className = 'SignUp__Input';
    if (withBtn) className += '--WithBtn';
    if (errors) className += '--Error';
    return [
      <input
        key="input"
        className={className}
        placeholder={label}
        required
        type={type}
        onChange={this.handleChange(field)}
      />,
      errors &&
        <p key="errors" className="SignUp__InputErrorMessages">
          {[].concat(...errors.map((error, i) =>
             [', ', <span key={i}>{error}</span>],
           )).slice(1)}
        </p>,
    ];
  }

  render() {
    return (
      <div className="SignUp">
        {this.renderInput('invitation_code', 'Invitation code')}
        {this.renderInput('login', 'Login')}
        {this.renderInput('email', 'Email', 'email')}
        {this.renderInput('password', 'Password', 'password')}
        <div className="SignUp__InputGroup">
          {this.renderInput('password_confirmation', 'Password confirmation', 'password', true)}
          <button onClick={this.signUp} className="SignUp__Btn">&gt;&gt;</button>
        </div>
      </div>
    );
  }
}

SignUp.propTypes = {
  signUp: PropTypes.func.isRequired,
  errors: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.string)),
};

function mapStateToProps({ auth }) {
  const errorsMap = auth.getIn(['signUpErrors', 'error', 'errors', 'user']);
  const errors = errorsMap ? errorsMap.toJS() : undefined;
  return { errors };
}

function mapDispatchToProps(dispatch) {
  return {
    signUp: user => dispatch(signUp(user)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
