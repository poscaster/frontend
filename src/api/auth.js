import { POST, apiCall } from './_base';

export default {
  signIn: apiCall('sessions', POST),
  signUp: apiCall('users', POST),
};
