// STORE ////////////////////
interface IAppState {
  data: string;
}

interface IInitDataState {
  message: string;
}

interface IIsoStyle {
  _getCss(): string;
  _insertCss(): void;
}

interface IStore {
  app?: IAppState;
  initData?: IInitDataState;
}

// MISC ////////////////////
interface Window {
  INIT_DATA: IStore;
}

// declare module '*.css';
// declare module '*.styl'
