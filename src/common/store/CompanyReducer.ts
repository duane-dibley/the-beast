import { AnyAction, Reducer } from 'redux';
import { COMPANY_PROFILE_SUCCESS, COMPANY_SEARCH_SUCCESS, OFFICER_APPOINTMENTS_SUCCESS } from '@common/actions';

const companyState: ICompanyState = {
  appointmentList: [],
  companyProfile: {
    accounts: {
      accounting_reference_date: {
        day: '',
        month: '',
      },
      last_accounts: {
        made_up_to: '',
        period_end_on: '',
        period_start_on: '',
      },
      next_accounts: {
        due_on: '',
        overdue: false,
        period_end_on: '',
        period_start_on: '',
      },
      next_due: '',
      next_made_up_to: '',
      overdue: false,
    },
    can_file: false,
    company_name: '',
    company_number: '',
    company_status: '',
    confirmation_statement: {
      last_made_up_to: '',
      next_due: '',
      next_made_up_to: '',
      overdue: false,
    },
    date_of_creation: '',
    etag: '',
    has_been_liquidated: false,
    has_charges: false,
    has_insolvency_history: false,
    jurisdiction: '',
    last_full_members_list_date: '',
    links: {
      charges: '',
      filing_history: '',
      officers: '',
      persons_with_significant_control: '',
      persons_with_significant_control_statements: '',
      self: '',
    },
    previous_company_names: [],
    registered_office_address: {
      address_line_1: '',
      address_line_2: '',
      country: '',
      locality: '',
      postal_code: '',
    },
    registered_office_is_in_dispute: false,
    sic_codes: [],
    status: '',
    type: '',
    undeliverable_registered_office_address: false,
  },
  searchResults: [],
};

const reducer: Reducer<ICompanyState, AnyAction> = (state: ICompanyState = companyState, action: AnyAction) => {
  switch (action.type) {
    case COMPANY_PROFILE_SUCCESS:
      return { ...state, companyProfile: action.data };

    case COMPANY_SEARCH_SUCCESS:
      return { ...state, searchResults: action.data };

    case OFFICER_APPOINTMENTS_SUCCESS:
      return { ...state, appointmentList: action.data };

    default:
      return state;
  }
};

export default reducer;
