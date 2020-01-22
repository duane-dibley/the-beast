import { Action, Reducer } from 'redux';

interface initDataState {
    initData: string;
}

const initState: initDataState = {
    initData: ''
};

const reducer: Reducer<initDataState, Action> = (state: initDataState = initState, action: Action): initDataState => state;

export default reducer;
