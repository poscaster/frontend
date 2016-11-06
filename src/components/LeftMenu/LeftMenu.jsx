import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { toggleLeftMenu } from '../../modules/layout';
import UserInfo from '../UserInfo/UserInfo';
import './LeftMenu.sass';

function LeftMenu(props) {
  return (
    <nav className={`LeftMenu--${props.expanded ? 'Expanded' : 'Collapsed'}`}>
      <button
        className="LeftMenu__ToggleBtn"
        onClick={props.toggle}
        dangerouslySetInnerHTML={{ __html: props.expanded ? '<' : '&#9776;' }}
      />
      {props.expanded &&
        <div className="LeftMenu__Content">
          <UserInfo />
        </div>
      }
    </nav>
  );
}

LeftMenu.propTypes = {
  expanded: PropTypes.bool,
  toggle: PropTypes.func.isRequired,
};

function mapStateToProps({ layout }) {
  return { expanded: layout.get('leftMenuExpanded') };
}

function mapDispatchToProps(dispatch) {
  return {
    toggle: () => dispatch(toggleLeftMenu()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LeftMenu);
