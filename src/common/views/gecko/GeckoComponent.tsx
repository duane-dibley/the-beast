import React, { Component, ReactNode } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch, AnyAction } from 'redux';
//
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import { createStyles, StyleRules, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import Autocomplete, { AutocompleteRenderInputParams } from '@material-ui/lab/Autocomplete';
//
import { geckoCoinsList } from '@common/actions/geckoActions';

class GeckoComponent extends Component<IProps> {
  render(): JSX.Element | string {
    return this.props.coinsList.length ? (
      <>
        <FormControl className={this.props.classes.formControl}>
          <Autocomplete
            options={this.props.coinsList}
            getOptionLabel={(option: ICoin): string => option.symbol}
            style={{ width: '100%' }}
            renderInput={(params: AutocompleteRenderInputParams): ReactNode => (
              <TextField {...params} label="Sym 1" variant="outlined" />
            )}
          />
        </FormControl>
        <FormControl className={this.props.classes.formControl}>
          <Autocomplete
            options={this.props.coinsList}
            getOptionLabel={(option: ICoin): string => option.symbol}
            style={{ width: '100%' }}
            renderInput={(params: AutocompleteRenderInputParams): ReactNode => (
              <TextField {...params} label="Sym 2" variant="outlined" />
            )}
          />
        </FormControl>
      </>
    ) : (
      '...loading'
    );
  }

  componentDidMount(): void {
    if (!this.props.coinsList.length) {
      this.props.geckoCoinsList();
    }
  }
}

function mapDispatchToProps(dispatch: Dispatch): IActions {
  return bindActionCreators({ geckoCoinsList }, dispatch);
}

function mapStateToProps(store: IStore): IState {
  const { gecko } = store;
  const { coinsList } = gecko;
  return { coinsList };
}

function styles(theme: Theme): StyleRules {
  return createStyles({
    formControl: {
      // margin: theme.spacing(1),
      padding: '10px',
      width: '50%',
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  });
}

interface IActions {
  geckoCoinsList: () => AnyAction;
}

interface ICoin {
  id: string;
  name: string;
  symbol: string;
}

interface IState {
  coinsList: ICoin[];
}

// TODO -add type check to css modules
// interface IStyles {
//   formControl: string;
//   selectEmpty: string;
// }

type IProps = IActions & IState & WithStyles<typeof styles>;

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(GeckoComponent));
