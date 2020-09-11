import { AnyAction } from 'redux';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import {
  COMPANY_PROFILE,
  COMPANY_PROFILE_SUCCESS,
  COMPANY_SEARCH,
  COMPANY_SEARCH_SUCCESS,
  OFFICER_APPOINTMENTS,
  OFFICER_APPOINTMENTS_SUCCESS,
  SAGA_FETCH_ERROR_HANDLER,
} from '@common/actions';
import headers from './headers';

function* appointments(): Generator {
  yield takeLatest(OFFICER_APPOINTMENTS, officerAppointments);
}

function* profile(): Generator {
  yield takeLatest(COMPANY_PROFILE, companyProfile);
}

function* search(): Generator {
  yield takeLatest(COMPANY_SEARCH, companiesSearch);
}

//

function* fetchAppointments(id: string): Generator {
  return yield fetch(`https://api.companieshouse.gov.uk/officers/${id}/appointments`, { headers })
    .then((res) => res.json())
    .catch((err) => console.error('officerAppointments catch', err));
}

function* searchCompanies(val: string): Generator {
  return yield fetch(`https://api.companieshouse.gov.uk/search?q=${val}`, { headers })
    .then((res) => res.json())
    .catch((err) => console.error('companiesSearch catch', err));
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

function* companyProfile(action: AnyAction): Generator {
  const { id } = action;
  let response: any;

  try {
    response = yield fetch(`https://api.companieshouse.gov.uk/company/${id}`, { headers }).then((res) => res.json());
    // TODO - sort saga catch handler
    // .catch(error => console.error('SAGA_CATCH_ERROR_HANDLER', error));
    // .catch(error => yield put({ type: SAGA_CATCH_ERROR_HANDLER, error }));

    yield put({ type: COMPANY_PROFILE_SUCCESS, data: response });
  } catch (e) {
    yield put({ type: SAGA_FETCH_ERROR_HANDLER, action, response });
  }
}

function* officerAppointments(action: AnyAction): Generator {
  const { id } = action;
  let response: any;

  try {
    response = yield call(fetchAppointments, id);

    yield put({ type: OFFICER_APPOINTMENTS_SUCCESS, data: response.items });
  } catch (e) {
    console.error('companies_fetch_failed');
  }
}

export default function* rootSaga(): Generator {
  yield all([appointments(), profile(), search()]);
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
