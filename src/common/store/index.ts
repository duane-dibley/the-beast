import { combineReducers, Reducer, AnyAction } from 'redux';
import app from './AppReducer';
import company from './CompanyReducer';
import initData from './InitDataReducer';

const reducer: Reducer<IStore, AnyAction> = combineReducers({ app, company, initData });

export default reducer;

/* * * * * * * * * * Action creators * * * * * * * * * */
export const LOGIN_CLICK = 'LOGIN_CLICK';
export const COMPANY_SEARCH = 'COMPANY_SEARCH';
export const COMPANY_SEARCH_SUCCESS = 'COMPANY_SEARCH_SUCCESS';
