import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import SignIn from '../SignIn/SignIn';
import SignOut from '../SignOut/SignOut';
import SignUp from '../SignUp/SignUp';
import UserInfo from '../UserInfo/UserInfo';
import './LeftMenuUserBlock.sass';

class LeftMenuUserBlock extends React.Component {
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
    return (
      <div>
        <SignOut />
        <UserInfo user={this.props.user} />
      </div>
    );
  }

  signInUpBlock() {
    const tab = this.state.tab;
    let signInUp;
    switch (tab) {
      case 'SIGN_IN':
        signInUp = <SignIn />;
        break;
      case 'SIGN_UP':
        signInUp = <SignUp />;
        break;
      default:
    }

    return (
      <div>
        <ul className="LeftMenuUserBlock__Tabs">
          <li className={`LeftMenuUserBlock__Tab${tab === 'SIGN_IN' ? '--Active' : ''}`}>
            <a tabIndex="0" href="javascript:;" onClick={this.toggleTabHandler('SIGN_IN')}>Sign In</a>
          </li>
          <li className={`LeftMenuUserBlock__Tab${tab === 'SIGN_UP' ? '--Active' : ''}`}>
            <a tabIndex="0" href="javascript:;" onClick={this.toggleTabHandler('SIGN_UP')}>Sign Up</a>
          </li>
        </ul>
        {signInUp}
      </div>
    );
  }

  render() {
    return (
      <div className="LeftMenuUserBlock">
        {this.props.user ? this.userInfo() : this.signInUpBlock()}
      </div>
    );
  }
}

LeftMenuUserBlock.propTypes = { user: PropTypes.objectOf(PropTypes.string) };

function mapStateToProps({ auth }) {
  let user = auth.get('user');
  if (user) user = user.toJS();
  return { user };
}

export default connect(mapStateToProps)(LeftMenuUserBlock);
