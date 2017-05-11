import PropTypes from 'prop-types';
import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import { fetchSubscriptions } from '../../modules/subscriptions';
// import './LeftMenuSubscrptionsList';

class LeftMenuSubscrptionsList extends React.Component {
  static propTypes = {
    subscriptions: ImmutablePropTypes.listOf(
      ImmutablePropTypes.contains({
        feed_id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
      }),
    ),
    fetchSubscriptions: PropTypes.func.isRequired,
  }

  static defaultProps = {
    subscriptions: null,
  }

  componentDidMount() {
    if (!this.props.subscriptions) {
      this.props.fetchSubscriptions();
    }
  }

  renderSubscriptions() {
    return [
      <h4>Subscriptions:</h4>,
      <ul className="LeftMenuSubscrptionsList__List">
        {this.props.subscriptions.map(s => <li key={s.feed_id}>{s.get('title')}</li>)}
      </ul>,
    ];
  }

  render() {
    return (
      <div className="LeftMenuSubscrptionsList">
        {this.props.subscriptions ?
         this.renderSubscriptions() :
         <div className="LeftMenuSubscrptionsList__FetchingMsg">Fetching...</div>}
      </div>
    );
  }
}

function mapStateToProps({ subscriptions }) {
  return { subscriptions };
}

function mapDispatchToProps(dispatch) {
  return { fetchSubscriptions: () => dispatch(fetchSubscriptions()) };
}

export default connect(mapStateToProps, mapDispatchToProps)(LeftMenuSubscrptionsList);
