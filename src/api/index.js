import auth from './auth';
import subscriptions from './subscriptions';

const API = {
  ...auth,
  ...subscriptions,
};

export default API;
