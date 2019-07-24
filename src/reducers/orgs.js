import { org } from '../constants';

export default function orgs (state = {}, action) {
  switch(action.type) {
    case org.REGISTER_ORGANIZATION:
      return { registered: true };
    case org.REGISTER_SUCCESS:
      return {};
    case org.REGISTER_FAILURE:
      return {}; 
    default :
      return state;
  }
}