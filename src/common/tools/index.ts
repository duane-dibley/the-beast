import { AnyAction } from 'redux';

let debounceTimer: any;

export function debounceAction(func: (...params: any) => AnyAction, delay: number, args: any): void {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(func, delay, args);
}
