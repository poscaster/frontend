import { POST, apiCall } from './_base';

export default {
  addSubscription: apiCall('subscriptions', POST),
};
