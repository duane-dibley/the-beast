import { AnyAction } from 'redux';
import { call, put, takeLatest } from 'redux-saga/effects';
import { GECKO_COIN_DATA, GECKO_COIN_DATA_SUCCESS, GECKO_COINS_INIT, GECKO_COINS_INIT_SUCCESS } from '@common/actions';

//
function* fetchCoinData(id: string): Generator {
  return yield fetch(`https://api.coingecko.com/api/v3/coins/${id}`)
    .then((res) => res.json())
    .catch((err) => console.error('fetchCoinsList catch', err));
}

function* fetchCoinsList(): Generator {
  return yield fetch(`https://api.coingecko.com/api/v3/coins/list`)
    .then((res) => res.json())
    .catch((err) => console.error('fetchCoinsList catch', err));
}

function* fetchCurrencyList(): Generator {
  return yield fetch(`https://api.coingecko.com/api/v3/simple/supported_vs_currencies`)
    .then((res) => res.json())
    .catch((err) => console.error('fetchCurrencyList catch', err));
}

//
function* coinData(action: AnyAction): Generator {
  // let response: [Promise<ICoin[]>, Promise<string[]>];
  let response: any;
  try {
    response = yield call(fetchCoinData, action.id);
    yield put({ type: GECKO_COIN_DATA_SUCCESS, datat: response });
  } catch (e) {
    console.error('GECKO_COINS_INIT_FAIL', e);
  }
}

function* coinsInit(): Generator {
  // let response: [Promise<ICoin[]>, Promise<string[]>];
  let response: any;
  try {
    response = yield Promise.all([yield call(fetchCoinsList), yield call(fetchCurrencyList)]);
    yield put({ type: GECKO_COINS_INIT_SUCCESS, coinsList: response[0], currencyList: response[1] });
  } catch (e) {
    console.error('GECKO_COINS_INIT_FAIL', e);
  }
}

//
export function* geckoCoinData(): Generator {
  yield takeLatest(GECKO_COIN_DATA, coinData);
}

export function* geckoCoinsInit(): Generator {
  yield takeLatest(GECKO_COINS_INIT, coinsInit);
}
