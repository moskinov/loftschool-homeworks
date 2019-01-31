import { showRequest, showSuccess, showFailure } from '../actions/show';

const initialState = {
	isFetching: false,
	entities: [],
	error: null
};

export default (state = initialState, action) => {
	switch (action.type) {
		case showRequest.toString():
			return {
				...state,
				entities: [],
				isFetching: true
			};

		case showSuccess.toString():
			return {
				...state,
				entities: action.payload,
				isFetching: false
			};

		case showFailure.toString():
			return {
				...state,
				error: action.payload,
				isFetching: false
			};

		default:
			return state;
	}
};
