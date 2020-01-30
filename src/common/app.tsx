import { AnyAction, Dispatch, bindActionCreators } from 'redux';
import React from 'react';
import { connect } from 'react-redux';
import GridComponent from './components/grid-component/GridComponent';

import '../../node_modules/react-grid-layout/css/styles.css';
import '../../node_modules/react-resizable/css/styles.css';

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

// ACTION CREATORS
function setData(): AnyAction {
  return { type: 'SET_DATA' };
}
