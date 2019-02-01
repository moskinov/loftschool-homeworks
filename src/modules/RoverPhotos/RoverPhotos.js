// Реализуйте редьюсер
// Файл с тестами RoverPhotos.test.js поможет вам в этом
import { handleActions } from 'redux-actions';
import { combineReducers } from 'redux';
import {
  fetchPhotosRequest,
  fetchPhotosSuccess,
  fetchPhotosFailure,
  changeSol
} from './actions';

export const roversNames = ['curiosity', 'opportunity', 'spirit'];

const photos = combineReducers(
    roversNames.reduce((item, type) => {
        item[type] = handleActions({
            [fetchPhotosRequest]: (_state, action) => {
            const { name, sol } = action.payload;
            return name === type ? { ..._state, [sol]: { photos: null, isLoaded: false } } : _state;
            },
            [fetchPhotosSuccess]: (_state, action) => {
            const { name, sol, photos } = action.payload;
            return name === type ? { ..._state, [sol]: { photos, isLoaded: true } } : _state;
            },
            [fetchPhotosFailure]: (_state, action) => {
            const { name, sol, error } = action.payload;
            return name === type ? { ..._state, [sol]: { error, isLoading: false } } : _state;
            }
        },
        {}
    );
    return item;
  },
  {})
);

const sol = handleActions(
  { [changeSol]: (_state, action) => ({ ..._state, current: action.payload }) },
  { current: 1, min: 1, max: 100 }
);

export default combineReducers({
  photos,
  sol
});

export const getSol = state => state.roverPhotos.sol;
export const getRoversPhotos = state => state.roverPhotos.photos;
export const getSavedPhotos = (state, name, id) => {
  const { roverPhotos: { photos } } = state;
  if (!photos[name][id]) {
    return null;
  }

  return photos[name][id].photos;
};
