import { AnyAction } from 'redux';
import { COMPANY_SEARCH } from '@store';

export function search(): AnyAction {
  return { type: COMPANY_SEARCH };
}
