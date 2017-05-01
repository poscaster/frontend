import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { toggleLeftMenuAddSubscription } from '../../modules/layout';
import { addSubscription } from '../../modules/subscriptions';

class LeftMenuSubscriptionsBlock extends React.Component {
  static propTypes = {
    addSubscrption: PropTypes.func.isRequired,
    expanded: PropTypes.bool,
  };

  static defaultProps = { expanded: false };

  state = { url: '' }

  updateUrl = (event) => {
    this.setState({ url: event.target.value });
  }

  addSubscription = () => {
    this.props.addSubscrption(this.state.url);
  }

  render() {
    return (
      <div className="LeftMenuSubscriptionsBlock">
        <input
          type="text"
          className={`LeftMenuSubscriptionsBlock__Input-${this.props.expanded ? 'Expanded' : 'Collapsed'}`}
          value={this.state.url}
          onChange={this.updateUrl}
        />
        <button className="LeftMenuSubscriptionsBlock__SubscribeBtn" onClick={this.addSubscription}>
          + Subscribe
        </button>
      </div>
    );
  }
}

function mapStateToProps({ layout }) {
  return {
    expanded: layout.get('leftMenuAddSubscriptionExpanded'),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addSubscrption: url => dispatch(addSubscription(url)),
    expand: () => dispatch(toggleLeftMenuAddSubscription()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LeftMenuSubscriptionsBlock);
