import { CREATE_NEW_ORDER } from '../modules/clients';
import { MOVE_ORDER_NEXT, MOVE_ORDER_BACK } from '../actions/moveOrder';
import { ADD_INGREDIENT } from '../actions/ingredients';

export default (state = [], action) => {
	switch (action.type) {
		case CREATE_NEW_ORDER:
			const { id, recipe } = action.payload;
			return [
				...state,
				{
					id,
					recipe,
					ingredients: [],
					position: 'clients'
				}
			];
		case MOVE_ORDER_NEXT:
			const orderNext = { ...state.find((item) => item.id === action.payload) };

			if (orderNext.position === 'clients') {
				orderNext.position = 'conveyor_1';
			} else if (orderNext.position !== 'conveyor_4') {
				orderNext.position = `conveyor_${parseInt(orderNext.position.slice(-1)) + 1}`;
			} else if (orderNext.ingredients.length === orderNext.recipe.length) {
				orderNext.position = 'finish';
			}
			return state.map(
				(item) =>

						item.id === orderNext.id ? orderNext :
						item
			);
		case MOVE_ORDER_BACK:
			const orderBack = { ...state.find((item) => item.id === action.payload) };

			if (orderBack.position !== 'conveyor_1') {
				orderBack.position = `conveyor_${parseInt(orderBack.position.slice(-1)) - 1}`;
			}
			return state.map(
				(item) =>

						item.id === orderBack.id ? orderBack :
						item
			);
		case ADD_INGREDIENT:
			const orderAdd = { ...state.find((item) => item.position === action.payload.from) };
			orderAdd.ingredients = [ ...orderAdd.ingredients, action.payload.ingredient ];
			return state.map(
				(item) =>

						item.id === orderAdd.id ? orderAdd :
						item
			);
		default:
			return state;
	}
};

export const getOrdersFor = (state, position) => state.orders.filter((order) => order.position === position);
