// STORE ////////////////////
interface IAppState {
  data: string;
}

interface IInitDataState {
  message: string;
}

interface IStore {
  app: IAppState;
  initData: IInitDataState;
}

// MISC ////////////////////
interface Window {
  INIT_DATA: IStore;
}
