import { AnyAction } from 'redux';
import { call, put, takeLatest } from 'redux-saga/effects';
import {
  COIN_DATA,
  COIN_DATA_SUCCESS,
  COIN_INIT,
  COIN_INIT_SUCCESS,
  COIN_ORDER_BOOK,
  COIN_ORDER_BOOK_SUCCESS,
} from '@common/actions';

//
function* fetchCoinData(id: string): Generator {
  // return yield fetch(`https://api.coingecko.com/api/v3/coins/${id}`)
  //   .then((res) => res.json())
  //   .catch((err) => console.error('fetchCoinsList catch', err));
  //
  return yield fetch(`http://localhost:5000/data?id=${id}`)
    .then((res) => res.json())
    .catch((err) => console.error('fetchCoinsList catch', err));
}

function* fetchCoinList(): Generator {
  return yield fetch(`https://api.coingecko.com/api/v3/coins/list`)
    .then((res) => res.json())
    .catch((err) => console.error('fetchCoinsList catch', err));
}

function* fetchCurrencyList(): Generator {
  return yield fetch(`https://api.coingecko.com/api/v3/simple/supported_vs_currencies`)
    .then((res) => res.json())
    .catch((err) => console.error('fetchCurrencyList catch', err));
}

function* fetchOrderBook(): Generator {
  return yield fetch(`https://futures.kraken.com/derivatives/api/v3/orderbook?symbol=fi_xbtusd_200928`)
    .then((res) => res.json())
    .catch((err) => console.error('fetchCurrencyList catch', err));
}

//
function* coinData(action: AnyAction): Generator {
  // let response: [Promise<ICoin[]>, Promise<string[]>];
  let response: any;
  try {
    response = yield call(fetchCoinData, action.id);
    yield put({ type: COIN_DATA_SUCCESS, data: response });
  } catch (e) {
    console.error('COIN_DATA_FAIL', e);
  }
}

function* coinInit(): Generator {
  // let response: [Promise<ICoin[]>, Promise<string[]>];
  let response: any;
  try {
    response = yield Promise.all([yield call(fetchCoinList), yield call(fetchCurrencyList)]);
    yield put({ type: COIN_INIT_SUCCESS, coinsList: response[0], currencyList: response[1] });
  } catch (e) {
    console.error('COIN_INIT_FAIL', e);
  }
}

function* coinOrderBook(): Generator {
  // let response: [Promise<ICoin[]>, Promise<string[]>];
  let response: any;
  try {
    response = yield call(fetchOrderBook);
    yield put({ type: COIN_ORDER_BOOK_SUCCESS, data: response });
  } catch (e) {
    console.error('COIN_ORDER_BOOK_FAIL', e);
  }
}

//
export function* coinDataSaga(): Generator {
  yield takeLatest(COIN_DATA, coinData);
}

export function* coinInitSaga(): Generator {
  yield takeLatest(COIN_INIT, coinInit);
}

export function* coinOrderBookSaga(): Generator {
  yield takeLatest(COIN_ORDER_BOOK, coinOrderBook);
}
