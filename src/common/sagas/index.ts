import { all } from 'redux-saga/effects';
import { appointments, profile, search } from './companySagas';
import { coinDataSaga, coinInitSaga, coinOrderBookSaga } from './coinSagas';

export default function* rootSaga(): Generator {
  yield all([
    // coin
    coinDataSaga(),
    coinInitSaga(),
    coinOrderBookSaga(),
    // company
    appointments(),
    profile(),
    search(),
  ]);
}

// https://hackernoon.com/moving-api-requests-to-redux-saga-21780f49cbc8 - BASIC
// https://medium.com/@lavitr01051977/make-your-first-call-to-api-using-redux-saga-15aa995df5b6

// NEWS

// import { all, put, takeLatest } from "redux-saga/effects";
// import { FETCH_WEATHER, WEATHER_RECEIVED } from "../actions/actionTypes";

// function* fetchWeather(): Generator<any, void, unknown> {
//   const json = yield fetch("https://newsapi.org/v1/articles?source=cnn&apiKey=c39a26d9c12f48dba2a5c00e35684ecc")
//     .then(response => response.json());

//   yield put({ type: WEATHER_RECEIVED, json: json.articles, });
// }

// function* actionWatcher() {
//   yield takeLatest(FETCH_WEATHER, fetchWeather);
// }

// export default function* rootSaga() {
//   yield all([
//     actionWatcher(),
//   ]);
// }
