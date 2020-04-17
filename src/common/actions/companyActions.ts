import { AnyAction } from 'redux';
import { COMPANY_SEARCH } from '@actions';

export function search(val: string): AnyAction {
  return { type: COMPANY_SEARCH, val };
}
