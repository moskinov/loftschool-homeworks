import { createAction } from 'redux-actions';

// Реализуйте недостающие экшены
export const fetchRequest = createAction('USER_REQUEST');
export const fetchSuccess = createAction('USER_SUCCESS');
export const fetchFailure = createAction('USER_FAILURE');
