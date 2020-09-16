import { AnyAction, Reducer } from 'redux';
import { GECKO_COINS_INIT_SUCCESS } from '@common/actions';

const initState: IGeckoState = {
  coinsList: [],
  currencyList: [],
};

const reducer: Reducer<IGeckoState, AnyAction> = (state: IGeckoState = initState, action: AnyAction) => {
  switch (action.type) {
    case GECKO_COINS_INIT_SUCCESS:
      return { ...state, coinsList: action.coinsList, currencyList: action.currencyList };
    default:
      return state;
  }
};

export default reducer;
