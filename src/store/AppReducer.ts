import { AnyAction, Reducer } from 'redux';

const initState: IAppState = {
  data: ''
};

const reducer: Reducer<IAppState, AnyAction> = (state: IAppState = initState, action: AnyAction) => {
  switch (action.type) {

    case 'SET_DATA':
      console.log('AppReducer SET_DATA', { state, action });
      return state;

    default:
      return state;

  }
};

export default reducer;
