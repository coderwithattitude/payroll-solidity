/* eslint-disable brace-style */
import { db } from '../utils';
import { showLoading, hideLoading } from 'react-redux-loading-bar';
import { Redirect } from 'react-router-dom';
import { alerts } from './alerts';
import { user as userConstants } from '../constants';


function addOrg(org) {
  console.log('addOrg',org);
  return {
    type: ADD_ORGANISATION,
    org,
  };
}

function handleAddOrg(org) {
  console.log(org)
  return dispatch => {
    dispatch(request(org));

    const addAction =  db.addOrganization(org);
    console.log(addAction)
        addAction.then(
            org => {
              dispatch(success());
              <Redirect to='/app/list/members'/>;
              dispatch(alerts.success('Registration successful'));
            },
            error => {
              console.log(error)
              dispatch(failure(error));
              dispatch(alerts.error(error));
            }
        );
  };
  function request(user) { return { type: userConstants.REGISTER_REQUEST, user }; }
  function success(user) { return { type: userConstants.REGISTER_SUCCESS, user }; }
  function failure(error) { return { type: userConstants.REGISTER_FAILURE, error }; }
}

function delOrg(org) {
  return {
    type: DELETE_ORGANISATION,
    org,
  };
}

function handleDelOrg(org) {
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

export const orgActions = {
  handleAddOrg,
  handleDelOrg,
  handleGetOrg
};

export {
  handleAddOrg,
  handleDelOrg,
  handleGetOrg
};