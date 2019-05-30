import { user } from '../constants';

export default function orgs (state = {}, action) {
  switch(action.type) {
    case user.REGISTER_ORGANIZATION:
      return Object.assign(state, action.payload);
    case user.GET_ORGANISATION:
      return state;
    case user.DELETE_REQUEST:
      return delete state.orgs; 
    default :
      return state;
  }
}