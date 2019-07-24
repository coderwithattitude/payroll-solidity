import { alert } from '../constants';

function success(message) {
  return { type: alert.SUCCESS, message };
}

function error(message) {
  return { type: alert.ERROR, message };
}

function clear() {
  return { type: alert.CLEAR };
}

export const alerts = {
  success,
  error,
  clear
};