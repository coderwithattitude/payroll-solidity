import { alert } from '../constants';

export const alerts = {
  success,
  error,
  clear
};

function success(message) {
  return { type: alert.SUCCESS, message };
}

function error(message) {
  return { type: alert.ERROR, message };
}

function clear() {
  return { type: alert.CLEAR };
}