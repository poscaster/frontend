import { DELETE, POST, apiCall } from './_base';

export default {
  signIn: apiCall('sessions', POST),
  signOut: apiCall('sessions/1', DELETE),
  signUp: apiCall('users', POST),
};
