import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { increment, decrement } from '../../modules/counter';
import './Counter.sass';

function Counter({ count, onPlusClick, onMinusClick }) {
  return (
    <div className="Counter">
      <p>
        <button className="Counter__DecrementButton" onClick={onMinusClick}>-</button>
        {count}
        <button className="Counter__IncrementButton" onClick={onPlusClick}>+</button>
      </p>
    </div>
  );
}

Counter.propTypes = {
  count: PropTypes.number.isRequired,
  onPlusClick: PropTypes.func.isRequired,
  onMinusClick: PropTypes.func.isRequired,
};

function mapStateToProps({ counter }) {
  return { count: counter.get('count') };
}

function mapDispatchToProps(dispatch) {
  return {
    onPlusClick: () => dispatch(increment()),
    onMinusClick: () => dispatch(decrement()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
