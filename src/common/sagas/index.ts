import { AnyAction } from 'redux';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import { COMPANY_SEARCH, COMPANY_SEARCH_SUCCESS } from '@actions';
import headers from './headers';

function* search(): Generator {
  yield takeLatest(
    COMPANY_SEARCH,
    companiesSearch
  );
}

//

function* searchCompanies(val: string): Generator {
  return yield fetch(`https://api.companieshouse.gov.uk/search?q=${val}`, { headers })
    .then(res => res.json())
    .catch(err => console.error('companiesSearch catch', err));
}

//

function* companiesSearch(action: AnyAction): Generator {
  const { val } = action;
  let response: any;

  try {
    // GET https://api.companieshouse.gov.uk/search
    // GET https://api.companieshouse.gov.uk/search/companies
    // GET https://api.companieshouse.gov.uk/search/officers
    // GET https://api.companieshouse.gov.uk/search/disqualified-officers

    response = yield call(searchCompanies, val);

    yield put({ type: COMPANY_SEARCH_SUCCESS, data: response.items });
  } catch (e) {
    console.error('companies_fetch_failed');
  }
}

export default function* rootSaga(): Generator {
  yield all([
    search()
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
