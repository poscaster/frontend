import { GET, DELETE, POST, apiCall } from './_base';

export default {
  getSession: apiCall('sessions', GET),
  signIn: apiCall('sessions', POST),
  signOut: apiCall('sessions/1', DELETE),
  signUp: apiCall('users', POST),
};
