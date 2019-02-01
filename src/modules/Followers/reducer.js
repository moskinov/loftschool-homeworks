import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import { fetchRequest, fetchSuccess, fetchFailure } from './actions';

// Обратите внимание на тесты reducer.test.js
// Они помогут вам написать редьюсер
const isLoading = handleActions(
	{
		[fetchRequest]: () => true,
		[fetchSuccess]: () => false,
		[fetchFailure]: () => false
	},
	false
);

const data = handleActions(
	{
		[fetchSuccess]: (_state, action) => action.payload
	},
	null
);

export default combineReducers({
	isLoading,
	data
});
