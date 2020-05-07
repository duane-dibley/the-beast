import { AnyAction } from 'redux';
import { COMPANY_PROFILE, COMPANY_SEARCH, OFFICER_APPOINTMENTS } from '@common/actions';

export function appointments(id: string): AnyAction {
  return { type: OFFICER_APPOINTMENTS, id };
}

export function profile(id: string): AnyAction {
  return { type: COMPANY_PROFILE, id };
}

export function search(val: string): AnyAction {
  return { type: COMPANY_SEARCH, val };
}
