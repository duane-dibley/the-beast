import { Action, Reducer } from 'redux';

const initState: IAppState = {
  data: 'Initial data App'
};

const reducer: Reducer<IAppState, Action> = (state: IAppState = initState, action: Action) => {
  switch (action.type) {

    case 'SET_DATA':
      return state;

    default:
      return state;

  }
};

export default reducer;
