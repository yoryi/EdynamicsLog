import { combineReducers } from '@reduxjs/toolkit';
import photoQReducer from './photoQ';
const rootReducer = combineReducers({
  photoQ: photoQReducer,
});
export default rootReducer;
