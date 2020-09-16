import { call, put, takeLatest } from 'redux-saga/effects';
import { GECKO_COINS_INIT, GECKO_COINS_INIT_SUCCESS } from '@common/actions';

export function* geckoCoinsInit(): Generator {
  yield takeLatest(GECKO_COINS_INIT, coinsInit);
}

//

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
