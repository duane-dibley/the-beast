import { AnyAction, Reducer } from 'redux';

const initState: IInitDataState = {
  message: ''
};

const reducer: Reducer<IInitDataState, AnyAction> = (state: IInitDataState = initState, action: AnyAction) => {
  switch (action.type) {

    case 'SET_MESSAGE':
      console.log('InitDataReducer SET_MESSAGE', { state, action });
      return Object.assign(state, { message: action.payload });

    default:
      return state;

  }
};

export default reducer;
