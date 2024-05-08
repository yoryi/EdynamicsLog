import { createStore } from 'redux';
import { persistReducer } from 'redux-persist';
import rootReducer from '../feature/rootReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['photoQ'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(persistedReducer);
export default store
