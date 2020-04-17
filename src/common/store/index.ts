import { combineReducers, Reducer, AnyAction } from 'redux';
import app from './AppReducer';
import company from './CompanyReducer';
import initData from './InitDataReducer';

const reducer: Reducer<IStore, AnyAction> = combineReducers({ app, company, initData });

export default reducer;
