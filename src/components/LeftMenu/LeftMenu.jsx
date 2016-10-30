import React, { PropTypes, renderToString } from 'react';
import { connect } from 'react-redux';
import { toggleLeftMenu } from '../../modules/layout';
import UserInfo from '../UserInfo/UserInfo';
import './LeftMenu.sass';

class LeftMenu extends React.Component {
  render() {
    return (
      <nav className={`LeftMenu LeftMenu--${this.props.expanded ? 'Expanded' : 'Collapsed'}`}>
        <button className={`LeftMenu__ToggleBtn LeftMenu__${this.props.expanded ? 'Collapse' : 'Expand'}Btn`}
                onClick={this.props.toggle}
                dangerouslySetInnerHTML={{__html: this.props.expanded ? '<' : '&#9776;'}}>
        </button>
        {this.props.expanded &&
          <div className="LeftMenu__Content">
            <UserInfo />
          </div>
        }
      </nav>
    );
  }
};

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
