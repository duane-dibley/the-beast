import { AnyAction, Reducer } from 'redux';
import { GECKO_COINS_LIST_SUCCESS } from '@common/actions';

const initState: IGeckoState = {
  coinsList: [],
};

const reducer: Reducer<IGeckoState, AnyAction> = (state: IGeckoState = initState, action: AnyAction) => {
  switch (action.type) {
    case GECKO_COINS_LIST_SUCCESS:
      return { ...state, coinsList: action.data };
    default:
      return state;
  }
};

export default reducer;
