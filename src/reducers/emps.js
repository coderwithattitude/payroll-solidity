import { 
    ADD_EMPLOYEE,
    GET_EMPLOYEES,
    DELETE_EMPLOYEES} from '../actions/employee';

export default function emps (state = {}, action) {
  switch(action.type) {
    case ADD_EMPLOYEE :
      return state.concat([action.emp]);
    case DELETE_EMPLOYEES :
      return state.filter((emp) => emp.id !== action.id);
    case GET_EMPLOYEES :
      return action.emps;  
  }
}
    
