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
  appointmentList: any[];
  companyProfile: ICompanyProfile;
  searchResults: ICompanySearchResult[];
}

interface IGeckoState {
  coinsList: {
    id: string;
    name: string;
    symbol: string;
  }[];
}

interface IInitDataState {
  message: string;
}

interface IStore {
  app?: IAppState;
  company?: ICompanyState;
  gecko?: IGeckoState;
  initData?: IInitDataState;
}

/* * * * * * * * * * MISC * * * * * * * * * */
interface ICompanyProfile {
  accounts: {
    accounting_reference_date: {
      day: string;
      month: string;
    };
    last_accounts: {
      made_up_to: string;
      period_end_on: string;
      period_start_on: string;
    };
    next_accounts: {
      due_on: string;
      overdue: boolean;
      period_end_on: string;
      period_start_on: string;
    };
    next_due: string;
    next_made_up_to: string;
    overdue: boolean;
  };
  can_file: boolean;
  company_name: string;
  company_number: string;
  company_status: string;
  confirmation_statement: {
    last_made_up_to: string;
    next_due: string;
    next_made_up_to: string;
    overdue: boolean;
  };
  date_of_creation: string;
  etag: string;
  has_been_liquidated: boolean;
  has_charges: boolean;
  has_insolvency_history: boolean;
  jurisdiction: string;
  last_full_members_list_date: string;
  links: {
    charges: string;
    filing_history: string;
    officers: string;
    persons_with_significant_control: string;
    persons_with_significant_control_statements: string;
    self: string;
  };
  previous_company_names: {
    ceased_on: string;
    effective_from: string;
    name: string;
  }[];
  registered_office_address: {
    address_line_1: string;
    address_line_2: string;
    country: string;
    locality: string;
    postal_code: string;
  };
  registered_office_is_in_dispute: boolean;
  sic_codes: string[];
  status: string;
  type: string;
  undeliverable_registered_office_address: boolean;
}

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
