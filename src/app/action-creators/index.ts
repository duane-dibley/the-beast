import { AnyAction } from 'redux';

export function setData(): AnyAction {
  return { type: 'SET_DATA' };
}
