import { alert } from '../constants';

export default function alerts(state = {}, action) {
  switch (action.type) {
    case alert.SUCCESS:
      return {
        type: 'alert-success',
        message: action.message
      };
    case alert.ERROR:
      return {
        type: 'alert-danger',
        message: action.message
      };
    case alert.CLEAR:
      return {};
    default:
      return state;
  }
}