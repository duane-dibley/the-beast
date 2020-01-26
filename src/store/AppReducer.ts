import { AnyAction, Reducer } from 'redux';

const initState: IAppState = {
  data: ''
};

const reducer: Reducer<IAppState, AnyAction> = (state: IAppState = initState, action: AnyAction) => {
  switch (action.type) {

    default:
      return state;

  }
};

export default reducer;
