import { AnyAction } from 'redux';
import { GECKO_COINS_INIT } from '@common/actions';

export function geckoCoinsInit(): AnyAction {
  return { type: GECKO_COINS_INIT };
}
