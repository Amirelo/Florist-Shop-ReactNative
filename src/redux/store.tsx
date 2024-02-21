import {combineReducers, createStore} from 'redux';
import LoginReducer from './reducers/LoginReducer';
import PreferenceReducer from './reducers/PreferenceReducer';
import {persistReducer, persistStore} from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import AsyncStorage from '@react-native-async-storage/async-storage';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  stateReconciler: autoMergeLevel2,
};

const rootReducer: any = combineReducers({
  isLoggedIn: LoginReducer,
  preference: PreferenceReducer,
});

const persist = persistReducer(persistConfig, rootReducer);

export const store = createStore(persist);
export const persistore = persistStore(store);
