import { addOrganization, deleteOrganisation, getOrganisation} from '../utils';
import { showLoading, hideLoading } from 'react-redux-loading-bar';

export const ADD_ORGANISATION = 'ADD_ORGANISATION';
export const DELETE_ORGANISATION = 'DELETE_ORGANISATION';
export const GET_ORGANISATION = 'GET_ORGANISATION';

function addOrg(org) {
    console.log('addOrg',org)
  return {
    type: ADD_ORGANISATION,
    org,
  };
}

export function handleAddOrg(org) {
  return (dispatch, getState) => {
    const { authedUser } = getState();
    
    dispatch(showLoading());
    addOrganization(
        org.orgName,
        org.admin,
        org.email
    );
      dispatch(addOrg(org));
      dispatch(hideLoading());

  };
}

function delOrg(org) {
  return {
    type: DELETE_ORGANISATION,
    org,
  };
}

export function handleDelOrg(org) {
  return (dispatch, getState) => {
    const { authedUser } = getState();

    dispatch(showLoading());
    return deleteOrganisation({
        ...org
      }).then((org) => dispatch(delOrg(org)))
          .then(() => dispatch(hideLoading()));
  };
}

function getOrg(org) {
  return {
    type: GET_ORGANISATION,
    org,
  };
}

function handleGetOrg(org) {
  return (dispatch, getState) => {
    const { authedUser } = getState();

    dispatch(showLoading());
    return getOrganisation({
        ...org,
        author: authedUser
      }).then((org) => dispatch(getOrg(org)))
          .then(() => dispatch(hideLoading()));
  };
}