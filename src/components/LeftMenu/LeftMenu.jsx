import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { toggleLeftMenu } from '../../modules/layout';
import LeftMenuUserBlock from '../LeftMenuUserBlock/LeftMenuUserBlock';
import LeftMenuAddSubscriptionsBlock from '../LeftMenuAddSubscriptionsBlock/LeftMenuAddSubscriptionsBlock';
import LeftMenuSubscriptionsList from '../LeftMenuSubscriptionsList/LeftMenuSubscriptionsList';
import './LeftMenu.sass';

function LeftMenu(props) {
  return (
    <nav className={`LeftMenu--${props.expanded ? 'Expanded' : 'Collapsed'}`}>
      <button className="LeftMenu__ToggleBtn" onClick={props.toggle} >
        { props.expanded ? '<' : '\u2630' }
      </button>
      {props.expanded ?
        <div className="LeftMenu__Content">
          <LeftMenuUserBlock />
          <div className="LeftMenu__Clearfix" />
          {props.authorized && <LeftMenuAddSubscriptionsBlock />}
          {props.authorized && <LeftMenuSubscriptionsList />}
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
