import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import SignIn from '../SignIn/SignIn';
import SignUp from '../SignUp/SignUp';
import './UserInfo.sass';

class UserInfo extends React.Component {
  constructor() {
    super();

    this.toggleTabHandler = this.toggleTabHandler.bind(this);
    this.state = { tab: 'SIGN_IN' };
  }

  toggleTabHandler(tab) {
    return (function toggleTab() {
      this.setState({ tab });
    }).bind(this);
  }

  userInfo() {
    // TODO: Add actual info
    const user = this.props.user; // eslint-disable-line no-unused-vars
    return (
      <div />
    );
  }

  signUpInBlock() {
    const tab = this.state.tab;
    let signUpIn;
    switch (tab) {
      case 'SIGN_IN':
        signUpIn = <SignIn />;
        break;
      case 'SIGN_UP':
        signUpIn = <SignUp />;
        break;
      default:
    }

    return (
      <div>
        <ul className="UserInfo__Tabs">
          <li className={`UserInfo__Tab${tab === 'SIGN_IN' ? '--Active' : ''}`}>
            <a tabIndex="0" onClick={this.toggleTabHandler('SIGN_IN')}>Sign In</a>
          </li>
          <li className={`UserInfo__Tab${tab === 'SIGN_UP' ? '--Active' : ''}`}>
            <a tabIndex="0" onClick={this.toggleTabHandler('SIGN_UP')}>Sign Up</a>
          </li>
        </ul>
        {signUpIn}
      </div>
    );
  }

  render() {
    return (
      <div className="UserInfo">
        {this.props.user ? this.userInfo() : this.signUpInBlock()}
      </div>
    );
  }
}

UserInfo.propTypes = { user: PropTypes.objectOf(PropTypes.string) };

function mapStateToProps({ auth }) {
  return { user: auth.get('user') };
}

export default connect(mapStateToProps)(UserInfo);
