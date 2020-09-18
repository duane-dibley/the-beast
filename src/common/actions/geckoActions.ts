import { AnyAction } from 'redux';
import { GECKO_COIN_DATA, GECKO_COINS_INIT } from '@common/actions';

export function geckoCoinData(id: string): AnyAction {
  return { type: GECKO_COIN_DATA, id };
}

export function geckoCoinsInit(): AnyAction {
  return { type: GECKO_COINS_INIT };
}
