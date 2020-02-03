import { combineReducers, Reducer, AnyAction } from 'redux';
import app from './AppReducer';
import initData from './InitDataReducer';

const reducer: Reducer<IStore, AnyAction> = combineReducers({ app, initData });

export default reducer;
