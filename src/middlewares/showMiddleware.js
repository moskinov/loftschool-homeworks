// Реализуйте showMiddleware

// Вам необходимо обработать showRequest
// После получения данных с сервера - диспачте showSuccess
// В случае ошибки showSuccess

// На забудьте вызвать метод next.
import { showRequest, showSuccess, showFailure } from '../actions/show';
import { show } from '../api';

export const showMiddleware = (store) => (next) => (action) => {
	if (action.type === showRequest.toString()) {
		show(action.payload)
			.then((response) => {
				store.dispatch(showSuccess(response));
			})
			.catch((error) => {
				store.dispatch(showFailure(error));
			});
	}
	return next(action);
};
