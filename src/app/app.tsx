import { Dispatch, bindActionCreators } from 'redux';
import React from 'react';
import { connect } from 'react-redux';
import { setData } from './action-creators';
import GridComponent from './components/GridComponent';

function App(/* props: IProps */): JSX.Element {
  return <GridComponent />;
}

function mapDispatchToProps(dispatch: Dispatch): IProps {
  return { actions: bindActionCreators({ setData }, dispatch) };
}

function mapStateToProps(store: IStore): IProps {
  return { store: { app: store.app } };
}

interface IConnectDispatch {
  setData: typeof setData;
}

interface IProps {
  actions?: IConnectDispatch;
  store?: IStore;
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
