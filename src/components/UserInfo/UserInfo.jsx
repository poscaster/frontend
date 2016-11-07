import React, { PropTypes } from 'react';
import './UserInfo.sass';

export default function UserInfo(props) {
  return (
    <div className="UserInfo">
      <p className="UserInfo__Line">Logged in as: {props.user.login}</p>
    </div>
  );
}

UserInfo.propTypes = { user: PropTypes.objectOf(PropTypes.string) };
