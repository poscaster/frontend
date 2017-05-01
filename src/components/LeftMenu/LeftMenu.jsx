import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { toggleLeftMenu } from '../../modules/layout';
import LeftMenuUserBlock from '../LeftMenuUserBlock/LeftMenuUserBlock';
import LeftMenuSubscriptionsBlock from '../LeftMenuSubscriptionsBlock/LeftMenuSubscriptionsBlock';
import './LeftMenu.sass';

function LeftMenu(props) {
  return (
    <nav className={`LeftMenu--${props.expanded ? 'Expanded' : 'Collapsed'}`}>
      <button
        className="LeftMenu__ToggleBtn"
        onClick={props.toggle}
        dangerouslySetInnerHTML={{ __html: props.expanded ? '&lt;' : '&#9776;' }}
      />
      {props.expanded ?
        <div className="LeftMenu__Content">
          <LeftMenuUserBlock />
          {props.authorized && <LeftMenuSubscriptionsBlock />}
        </div>
       : []
      }
    </nav>
  );
}

LeftMenu.propTypes = {
  expanded: PropTypes.bool,
  toggle: PropTypes.func.isRequired,
  authorized: PropTypes.bool,
};

LeftMenu.defaultProps = {
  expanded: false,
  authorized: false,
};

function mapStateToProps({ auth, layout }) {
  return {
    expanded: layout.get('leftMenuExpanded'),
    authorized: !!auth.get('user'),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    toggle: () => dispatch(toggleLeftMenu()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LeftMenu);
