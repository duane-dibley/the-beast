import { AnyAction, Reducer } from 'redux';
import { COMPANY_SEARCH_SUCCESS } from '@store';

const companyState: ICompanyState = {
  searchResults: []
};

const reducer: Reducer<ICompanyState, AnyAction> = (state: ICompanyState = companyState, action: AnyAction) => {
  switch (action.type) {

    case COMPANY_SEARCH_SUCCESS:
      console.log('search results action', action);
      return state;

    default:
      return state;

  }
};

export default reducer;
