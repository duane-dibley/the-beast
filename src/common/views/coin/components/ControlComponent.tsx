import React, { ReactNode } from 'react';
import { AnyAction } from 'redux';
import Autocomplete, { AutocompleteRenderInputParams } from '@material-ui/lab/Autocomplete';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import { createStyles, StyleRules, Theme, withStyles, WithStyles } from '@material-ui/core/styles';

export default withStyles(styles)(function ControlComponent(props: IProps): JSX.Element {
  const { classes, coinsList, coinData } = props;
  return (
    <FormControl className={classes.formControl}>
      <Autocomplete
        getOptionLabel={(option: ICoin): string => option.name}
        options={coinsList}
        onChange={(event, item: ICoin): AnyAction => coinData(item.id)}
        renderInput={(params: AutocompleteRenderInputParams): ReactNode => (
          <TextField {...params} label="Coin" variant="outlined" />
        )}
        style={{ width: '100%' }}
      />
    </FormControl>
  );
});

function styles(theme: Theme): StyleRules {
  return createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: '300px',
      width: '100%',
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  });
}

interface IProps extends WithStyles<typeof styles> {
  coinsList: ICoin[];
  coinData: (id: string) => AnyAction;
}
