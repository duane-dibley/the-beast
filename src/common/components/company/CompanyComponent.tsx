import withStyles from 'isomorphic-style-loader/withStyles';
import React, { Component, ReactNode } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch, AnyAction } from 'redux';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
//
import { search } from './companyActions';
import Styles from './company.styl';

function CompanyComponent(props: IProps): JSX.Element {
  return (
    // <TextField label-="Search" variant="outlined" />
    <Button onClick={(): AnyAction => props.actions.search()}>Click</Button>
  );
}

// class CompanyComponent extends Component<IProps> {

//   render(): ReactNode {
//     const { actions } = this.props;

//     return <Button title="Click" onClick={() => actions.search()} />
//   }

// }

/* * * * * * * * * * Redux connect * * * * * * * * * */

function mapDispatchToProps(dispatch: Dispatch): IProps {
  return { actions: bindActionCreators({ search }, dispatch) };
}

function mapStateToProps(store: IStore): IProps {
  return { store };
}

/* * * * * * * * * * Props interface * * * * * * * * * */

interface IProps {
  actions?: { search: typeof search };
  store?: IStore;
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(Styles)(CompanyComponent));
