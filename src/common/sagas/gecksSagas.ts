import { call, put, takeLatest } from 'redux-saga/effects';
import { GECKO_COINS_LIST, GECKO_COINS_LIST_SUCCESS } from '@common/actions';

export function* geckoCoinsList(): Generator {
  yield takeLatest(GECKO_COINS_LIST, coinsList);
}

//

function* coinsList(): Generator {
  let response;
  try {
    response = yield call(fetchCoinsList);
    yield put({ type: GECKO_COINS_LIST_SUCCESS, data: response });
  } catch (e) {
    console.error('GECKO_COINS_LIST_FAIL', e);
  }
}

//

function* fetchCoinsList(): Generator {
  return yield fetch(`https://api.coingecko.com/api/v3/coins/list`)
    .then((res) => res.json())
    .catch((err) => console.error('officerAppointments catch', err));
}
