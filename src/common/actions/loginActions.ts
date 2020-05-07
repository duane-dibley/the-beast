import { AnyAction } from 'redux';
import { LOGIN_CLICK } from '@common/actions';

export function loginClick(email: string, password: string, remember: string): AnyAction {
  return { type: LOGIN_CLICK, data: { email, password, remember } };
}
