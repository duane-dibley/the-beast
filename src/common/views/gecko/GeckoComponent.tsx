import React, { Component, ReactNode } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch, AnyAction } from 'redux';
//
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import { createStyles, StyleRules, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import Autocomplete, { AutocompleteRenderInputParams } from '@material-ui/lab/Autocomplete';
//
import { geckoCoinData, geckoCoinsInit } from '@common/actions/geckoActions';
import DataComponent from './components/DataComponent';

class GeckoComponent extends Component<IProps> {
  render(): JSX.Element | string {
    const { geckoCoinData, classes, coinsList } = this.props;
    return coinsList.length ? (
      <>
        <FormControl className={classes.formControl}>
          <Autocomplete
            getOptionLabel={(option: ICoin): string => option.name}
            options={coinsList}
            onChange={(event, item: ICoin): AnyAction => geckoCoinData(item.id)}
            renderInput={(params: AutocompleteRenderInputParams): ReactNode => (
              <TextField {...params} label="Coin" variant="outlined" />
            )}
            style={{ width: '100%' }}
          />
        </FormControl>
        <DataComponent />
        {/*  */}
        {/* <FormControl className={this.props.classes.formControl}>
          <Autocomplete
            options={this.props.currencyList}
            getOptionLabel={(option: string): string => option}
            style={{ width: '100%' }}
            renderInput={(params: AutocompleteRenderInputParams): ReactNode => (
              <TextField {...params} label="Currency " variant="outlined" />
            )}
          />
        </FormControl> */}
      </>
    ) : (
      '...loading'
    );
  }

  componentDidMount(): void {
    const { coinsList, geckoCoinsInit } = this.props;
    if (!coinsList.length) {
      geckoCoinsInit();
    }
  }
}

function mapDispatchToProps(dispatch: Dispatch): IActions {
  return bindActionCreators({ geckoCoinData, geckoCoinsInit }, dispatch);
}

function mapStateToProps(store: IStore): IGeckoState {
  const { gecko } = store;
  const { coinData, coinsList, currencyList } = gecko;
  return { coinData, coinsList, currencyList };
}

function styles(theme: Theme): StyleRules {
  return createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: '300px',
      // padding: '10px',
      width: '100%',
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  });
}

interface IActions {
  geckoCoinData: (id: string) => AnyAction;
  geckoCoinsInit: () => AnyAction;
}

// TODO -add type check to css modules
// interface IStyles {
//   formControl: string;
//   selectEmpty: string;
// }

type IProps = IActions & IGeckoState & WithStyles<typeof styles>;

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(GeckoComponent));
