/* * * * * * * * * * STORE * * * * * * * * * */
interface IAppState {
  context: IContext;
  url?: string;
}

interface IInitDataState {
  message: string;
}

interface IStore {
  app?: IAppState;
  initData?: IInitDataState;
}

/* * * * * * * * * * MISC * * * * * * * * * */
interface IContext {
  insertCss(): void;
}

interface IIsoStyle {
  _getContent?(): string;
  _getCss?(): string;
  _insertCss?(): void;
}

interface Window {
  INIT_DATA: IStore;
}
