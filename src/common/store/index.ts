import { combineReducers, Reducer, AnyAction } from 'redux';
import app from './appReducer';
import company from './companyReducer';
import gecko from './geckoReducer';
import initData from './initDataReducer';

const reducer: Reducer<IStore, AnyAction> = combineReducers({ app, company, gecko, initData });

export default reducer;
