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
  searchResults: ICompanySearchResult[];
}

interface IInitDataState {
  message: string;
}

interface IStore {
  app?: IAppState;
  company?: ICompanyState;
  initData?: IInitDataState;
}

/* * * * * * * * * * MISC * * * * * * * * * */
interface ICompanySearchResult {
  address: {
    address_line_1: string;
    country: string;
    locality: string;
    premises: string;
  };
  address_snippet: string;
  appointment_count: number;
  description: string;
  description_identifiers: string[];
  kind: string;
  links: { self: string };
  matches: {
    snippet: string[];
    title: number[];
  };
  snippet: string;
  title: string;
}

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
