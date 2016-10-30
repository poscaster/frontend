import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import SignIn from '../SignIn/SignIn';
import SignUp from '../SignUp/SignUp';
import './UserInfo.sass';

class UserInfo extends React.Component {
  constructor() {
    super(...arguments);

    this.state = { tab: 'SIGN_IN' };
  }

  toggleTab(tab) {
    this.setState({ tab });
  }

  render() {
    return (
      <div className="UserInfo">
        {this.props.user
          ? this.userInfo(this.props.user)
          : this.signUpInBlock()
        }
      </div>
    );
  }

  userInfo(user) {
    return (
      <div />
    );
  }

  signUpInBlock() {
    const tab = this.state.tab;

    return (
      <div>
        <ul className="UserInfo__Tabs">
          <li className={`UserInfo__Tab ${tab === 'SIGN_IN' ? 'UserInfo__Tab--Active' : ''}`}>
            <a onClick={this.toggleTab.bind(this, 'SIGN_IN')} href="javascript:;">Sign In</a>
          </li>
          <li className={`UserInfo__Tab ${tab === 'SIGN_UP' ? 'UserInfo__Tab--Active' : ''}`}>
            <a onClick={this.toggleTab.bind(this, 'SIGN_UP')} href="javascript:;">Sign Up</a>
          </li>
        </ul>
        {this.signUpIn(tab)}
      </div>
    );
  }

  signUpIn(tab) {
    switch (tab) {
    case 'SIGN_IN':
      return <SignIn />;
    case 'SIGN_UP':
      return <SignUp />;
    }
  }
}

UserInfo.propTypes = { user: PropTypes.object };

function mapStateToProps({ auth }) {
  return { user: auth.get('user') };
}

export default connect(mapStateToProps)(UserInfo);
