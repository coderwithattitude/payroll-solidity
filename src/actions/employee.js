import { addEmployess, getEmployees, deleteEmployees } from '../utils';
import { showLoading, hideLoading } from 'react-redux-loading';

export const ADD_EMPLOYEE = 'ADD_EMPLOYEE';
export const GET_EMPLOYEES = 'GET_EMPLOYEES';
export const DELETE_EMPLOYEES = 'DELETE_EMPLOYEES';


function addEmployee (employee) {
    return {
        type: ADD_EMPLOYEE,
        employee,
    }
}

export function handleAddEmployee (employee) {
    return (dispatch, getState) => {
        const { authedUser } = getState();
        
        dispatch(showLoading());
        return addEmployess({
            ...employee,
            author: authedUser
        }).then((employee) => dispatch(addEmployee(employee)))
            .then(() => dispatch(hideLoading()));
    }
}
