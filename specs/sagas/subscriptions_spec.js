import { expect } from 'chai';
import { describe, it } from 'mocha';
import { call, put, select } from 'redux-saga/effects';
import API from '../../src/api';
import { getJWT } from '../../src/modules/auth';
import { addSubscriptionAsync, fetchSubscriptionsAsync } from '../../src/sagas/subscriptions';
import { fetchSubscriptions, setSubscriptions } from '../../src/modules/subscriptions';

// istanbul ignore next
const noop = () => {};

describe('subscriptionsSagas', () => {
  const jwt = 'jwtstring';

  describe('addSubscriptionAsync', () => {
    const url = 'http://example.com/feed';

    it('calls API addSubscription successfully', () => {
      const generator = addSubscriptionAsync({ url });
      let next = generator.next();
      expect(next.value).to.deep.equal(select(getJWT));
      next = generator.next(jwt);
      expect(next.value).to.deep.equal(call(API.addSubscription, { url }, { jwt }));
      next = generator.next({ status: 200 });
      expect(next.value).to.deep.equal(put(fetchSubscriptions()));
      expect(generator.next().done).to.be.true();
    });

    // TODO(NH): calls API addSubscription with error
  });

  describe('fetchSubscriptions', () => {
    it('calls API.fetchSubscriptions successfully', () => {
      const generator = fetchSubscriptionsAsync();
      let next = generator.next();
      expect(next.value).to.deep.equal(select(getJWT));
      next = generator.next(jwt);
      expect(next.value).to.deep.equal(call(API.fetchSubscriptions, null, { jwt }));
      next = generator.next({ status: 200, json: noop });
      next = generator.next({ subscriptions: [{ id: 'test' }] });
      expect(next.value).to.deep.equal(put(setSubscriptions([{ id: 'test' }])));
    });
  });
});
