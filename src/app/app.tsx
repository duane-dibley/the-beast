import { AnyAction, Dispatch, bindActionCreators } from 'redux';
import React from 'react';
import { connect } from 'react-redux';
import { setData } from './action-creators';

function App(props: IProps): JSX.Element {
  const { actions } = props;
  return <button type="button" onClick={(): AnyAction => actions.setData()}>Click</button>;
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

interface IConnectState {
  app: IAppState;
}

interface IProps {
  actions?: IConnectDispatch;
  store?: IConnectState;
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
