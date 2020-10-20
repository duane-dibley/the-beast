import { AnyAction /* , Reducer */ } from 'redux';
import { COIN_DATA_SUCCESS, COIN_INIT_SUCCESS, COIN_ORDER_BOOK_SUCCESS } from '@common/actions';

const initState: ICoinState = {
  coinData: null,
  coinList: [],
  currencyList: [],
};

function reducer(state: ICoinState = initState, action: AnyAction): ICoinState {
  switch (action.type) {
    case COIN_DATA_SUCCESS:
      return { ...state, coinData: action.data };
    case COIN_INIT_SUCCESS:
      return { ...state, coinList: action.coinsList, currencyList: action.currencyList };
    case COIN_ORDER_BOOK_SUCCESS:
      return state;
    default:
      return state;
  }
}

export default reducer;

// const reducer: Reducer<ICoinState, AnyAction> = (state: ICoinState = initState, action: AnyAction) => {
//   switch (action.type) {
//     case COIN_DATA_SUCCESS:
//       return { ...state, coinData: action.data };
//     case COIN_INIT_SUCCESS:
//       return { ...state, coinsList: action.coinsList, currencyList: action.currencyList };
//     case COIN_ORDER_BOOK_SUCCESS:
//       return state;
//     default:
//       return state;
//   }
// };
