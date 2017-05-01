export const ADD_SUBSCRIPTION = 'poscaster/subscriptions/ADD_SUBSCRIPTION';

export function addSubscription(url) {
  return { type: ADD_SUBSCRIPTION, url };
}
