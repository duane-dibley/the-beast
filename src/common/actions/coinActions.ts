import { AnyAction } from 'redux';
import { COIN_DATA, COIN_INIT, COIN_ORDER_BOOK } from '@common/actions';

export function coinData(id: string): AnyAction {
  return { type: COIN_DATA, id };
}

export function coinInit(): AnyAction {
  return { type: COIN_INIT };
}

export function coinOrderBook(): AnyAction {
  return { type: COIN_ORDER_BOOK };
}
