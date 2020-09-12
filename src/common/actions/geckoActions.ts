import { AnyAction } from 'redux';
import { GECKO_COINS_LIST } from '@common/actions';

export function geckoCoinsList(): AnyAction {
  return { type: GECKO_COINS_LIST };
}
