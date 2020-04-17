import { AnyAction, Reducer } from 'redux';
import { COMPANY_SEARCH_SUCCESS } from '@actions';

const companyState: ICompanyState = {
  searchResults: []
};

const reducer: Reducer<ICompanyState, AnyAction> = (state: ICompanyState = companyState, action: AnyAction) => {
  switch (action.type) {

    case COMPANY_SEARCH_SUCCESS:
      return { ...state, searchResults: action.data };

    default:
      return state;

  }
};

export default reducer;
