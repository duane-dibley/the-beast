declare module '*.css';
declare module '*.scss';
declare module '*.styl';

declare module 'isomorphic-style-loader/StyleContext';
declare module 'isomorphic-style-loader/withStyles';

/* * * * * * * * * * STORE * * * * * * * * * */
interface IAppState {
  context: IContext;
  url?: string;
}

interface ICompanyState {
  searchResults: any[];
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
