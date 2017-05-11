import { GET, POST, apiCall } from './_base';

export default {
  addSubscription: apiCall('subscriptions', POST),
  fetchSubscriptions: apiCall('subscriptions', GET),
};
