import { Action, Reducer } from 'redux';

const initState: IInitDataState = {
  message: ''
};

const reducer: Reducer<IInitDataState, Action> = (state: IInitDataState = initState, action: Action) => {
  switch (action.type) {

    case 'SET_MESSAGE':
      return state;

    default:
      return state;

  }
};

export default reducer;
