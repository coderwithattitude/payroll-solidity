import { addEmployess, getEmployees, deleteEmployee } from '../utils';
import { showLoading, hideLoading } from 'react-redux-loading';

export const ADD_EMPLOYEE = 'ADD_EMPLOYEE';
export const GET_EMPLOYEES = 'GET_EMPLOYEES';
export const DELETE_EMPLOYEE = 'DELETE_EMPLOYEE';


function addEmployee(employee) {
    return {
        type: ADD_EMPLOYEE,
        employee,
    }
}

export function handleAddEmployee(employee) {
    return (dispatch, getState) => {
        const { authedUser } = getState();
        
        dispatch(showLoading());
        return addEmployee({
            ...employee,
            author: authedUser
        }).then((employee) => dispatch(addEmployee(employee)))
            .then(() => dispatch(hideLoading()));
    }
}

function delEmployee(employee) {
    return {
        type: DELETE_EMPLOYEE,
        employee,
    }
}

export function handleDelEmployee(employee) {
    return (dispatch, getState) => {
        const { authedUser } = getState();
        dispatch(showLoading());
        return deleteEmployee({
            ...employee,
            author: authedUser
        }).then((employee) => dispatch(delEmployee(employee)))
            .then(() => dispatch(hideLoading()));
    }
}

function getEmployees(employees) {
    return {
        type: GET_EMPLOYEES,
        employees
    }
}

export function handleGetEmployees() {
  return (dispatch, getState) => {
      const { authedUser } = getState();
      dispatch(showLoading());
      return getEmployees({
          admin: authedUser
      }).then((employees) => dispatch(getEmployees(employees)))
        .then(() => dispatch(hideLoading()));
  }
}