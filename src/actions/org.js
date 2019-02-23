import { addOrganisation, deleteOrganisation, getOrganisation} from '../utils';
import { showLoading, hideLoading } from 'react-redux-loading';

export const ADD_ORGANISATION = 'ADD_ORGANISATION';
export const DELETE_ORGANISATION = 'DELETE_ORGANISATION';
export const GET_ORGANISATION = 'GET_ORGANISATION';

function addOrg(org) {
    return {
        type: ADD_ORGANISATION,
        org,
    }
}

export function handleAddOrg(org) {
    return (dispatch, getState) => {
        const { authedUser } = getState();

        dispatch(showLoading());
        return addOrganisation({
            ...org,
            author: authedUser
        }).then((org) => dispatch(addOrg(org)))
          .then(() => dispatch(hideLoading()));

    }
}