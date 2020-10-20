import { combineReducers, Reducer, AnyAction } from 'redux';
import app from './appReducer';
import coin from './coinReducer';
import company from './companyReducer';
import initData from './initDataReducer';

const reducer: Reducer<IStore, AnyAction> = combineReducers({ app, company, coin, initData });

export default reducer;
