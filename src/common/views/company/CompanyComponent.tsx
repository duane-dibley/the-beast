import withStyles from 'isomorphic-style-loader/withStyles';
import React, { ChangeEvent, Component, ReactNode } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch, AnyAction } from 'redux';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
// import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import AccessibilityIcon from '@material-ui/icons/Accessibility';
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';
import PersonAddDisabledIcon from '@material-ui/icons/PersonAddDisabled';
import { AutocompleteRenderInputParams } from '@material-ui/lab';
import Autocomplete from '@material-ui/lab/Autocomplete';
//
import { appointments, profile, search } from '@common/actions/companyActions';
import { debounceAction } from '@common/tools';
import Styles from './company.styl';
import AppointmentsComponent from './components/AppointmentsComponent';
import ProfilesComponent from './components/ProfilesComponent';

// const useStyles = makeStyles((theme) => ({
//   formControl: {
//     margin: theme.spacing(1),
//     minWidth: 120,
//   },
//   selectEmpty: {
//     marginTop: theme.spacing(2),
//   },
// }));

class CompanyComponent extends Component<IProps> {
  private searchQuery: string;

  render(): ReactNode {
    const { actions, appointmentList, companyProfile, searchResults } = this.props;

    // const classes = useStyles();

    return (
      <>
        <div className={Styles['flex-row']}>
          <Autocomplete
            className={Styles['flex-grow-row']}
            debug
            filterOptions={(options: ICompanySearchResult[]): ICompanySearchResult[] => options}
            getOptionLabel={(option: ICompanySearchResult): string => option.title}
            getOptionSelected={(option: ICompanySearchResult, value: ICompanySearchResult): boolean =>
              value.title === option.title
            }
            onChange={(event, item: ICompanySearchResult): AnyAction => {
              const self = item.links.self.split('/');
              const type = self[1];
              const id = self[2];
              switch (type) {
                case 'company':
                  return actions.profile(id);
                case 'officer':
                  return actions.appointments(id);
                default:
                  return { type: 'ERROR' };
              }
            }}
            onInputChange={(event, value): void => debounceAction(actions.search, 500, value)}
            options={searchResults}
            // renderInput={(params: AutocompleteRenderInputParams): ReactNode => <TextField {...params} label="Search" variant="outlined" />}
            renderInput={(params: AutocompleteRenderInputParams): ReactNode => (
              <TextField {...params} label="Search" variant="outlined" />
            )}
            renderOption={(option: ICompanySearchResult): ReactNode => {
              let icon: ReactNode = '';
              switch (option.kind) {
                case 'searchresults#officer':
                  icon = <AccessibilityIcon />;
                  break;
                case 'searchresults#company':
                  icon = <BusinessCenterIcon />;
                  break;
                case 'searchresults#disqualified-officer':
                  icon = <PersonAddDisabledIcon />;
                  break;
                default:
                  icon = '';
              }
              return (
                <>
                  {icon}
                  {`${option.title} ${option.address_snippet}`}
                </>
              );
            }}
          />
          <FormControl /* className={classes.formControl} */ variant="outlined">
            <InputLabel>Type</InputLabel>
            <Select
              defaultValue="/search"
              onChange={(event: React.ChangeEvent<{ name?: string; value: string }>): string =>
                (this.searchQuery = event.target.value)
              }
              label="Type"
            >
              <MenuItem value="/search">All</MenuItem>
              <MenuItem value="/search/officers">Officer</MenuItem>
              <MenuItem value="/search/companies">Company</MenuItem>
              <MenuItem value="/search/disqualified-officers">Disqualified</MenuItem>
            </Select>
          </FormControl>
        </div>

        <AppointmentsComponent appointmentList={appointmentList} />

        <ProfilesComponent />
      </>
    );
  }
}

/* * * * * * * * * * Redux connect * * * * * * * * * */

function mapDispatchToProps(dispatch: Dispatch): IProps {
  return { actions: bindActionCreators({ appointments, profile, search }, dispatch) };
}

function mapStateToProps(store: IStore): IProps {
  const { company } = store;
  const { appointmentList, companyProfile, searchResults } = company;
  return {
    appointmentList,
    companyProfile,
    searchResults,
  };
}

/* * * * * * * * * * Props interface * * * * * * * * * */

interface IProps {
  actions?: {
    appointments: typeof appointments;
    profile: typeof profile;
    search: typeof search;
  };
  appointmentList?: any[];
  companyProfile?: ICompanyProfile;
  searchResults?: ICompanySearchResult[];
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(Styles)(CompanyComponent));
