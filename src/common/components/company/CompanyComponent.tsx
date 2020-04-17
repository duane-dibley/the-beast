import withStyles from 'isomorphic-style-loader/withStyles';
import React, { ChangeEvent, ReactNode } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { /* FilterOptionsState, */ RenderInputParams } from '@material-ui/lab';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
//
import { search } from '../../actions/companyActions';
import Styles from './company.styl';

import { debounceAction } from '../../tools';

// class CompanyComponent extends Component<IProps> {

//   render(): ReactNode {
//     const { actions, searchResults } = this.props;

//     return (
//       <div>
//         <Autocomplete
//           getOptionLabel={(option: ICompanySearchResult): string => option.title + option.address_snippet}
//           getOptionSelected={(option: ICompanySearchResult, value: ICompanySearchResult): boolean => value.title === option.title}
//           onInputChange={(evt: ChangeEvent, val: string): (args: object) => void => debounceAction(actions.search, 500, val)}
//           options={searchResults}
//           renderInput={(params: RenderInputParams): ReactNode => <TextField {...params} label="Combo box" variant="outlined" />}
//         />
//       </div>
//     );
//   }

// }

function CompanyComponent(props: IProps): ReactNode {
  const { actions, searchResults } = props;

  return (
    <div>
      <Autocomplete
        filterOptions={(options: ICompanySearchResult[]): ICompanySearchResult[] => options}
        getOptionLabel={(option: ICompanySearchResult): string => option.title}
        getOptionSelected={(option: ICompanySearchResult, value: ICompanySearchResult): boolean => value.title === option.title}
        onInputChange={(evt: ChangeEvent, val: string): void => debounceAction(actions.search, 500, val)}
        options={searchResults}
        renderInput={(params: RenderInputParams): ReactNode => <TextField {...params} label="Search" variant="outlined" />}
      />
    </div>
  );

}

/* * * * * * * * * * Redux connect * * * * * * * * * */

function mapDispatchToProps(dispatch: Dispatch): IProps {
  return { actions: bindActionCreators({ search }, dispatch) };
}

function mapStateToProps(store: IStore): IProps {
  const { company } = store;
  return { searchResults: company.searchResults };
}

/* * * * * * * * * * Props interface * * * * * * * * * */

interface IProps {
  actions?: { search: typeof search };
  searchResults?: ICompanySearchResult[];
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(Styles)(CompanyComponent));
