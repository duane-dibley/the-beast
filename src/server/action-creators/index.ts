import { AnyAction } from 'redux';

export function setMessage(): AnyAction {
  return { type: 'SET_MESSAGE' };
}
