import { 
    ADD_ORGANISATION, 
    GET_ORGANISATION, 
    DELETE_ORGANISATION} from '../actions/org';

export default function orgs (state, action) {
  switch(action.type) {
    case ADD_ORGANISATION:
      return Object.assign(state, action.payload);
    case GET_ORGANISATION:
      return state;
    case DELETE_ORGANISATION:
      return delete state.orgs; 
  }
}