import { AnyAction, Dispatch, bindActionCreators } from 'redux';
import React from 'react';
import { connect } from 'react-redux';
import { GridComponent } from '@components';

function AppComponent(/* props: IProps */): JSX.Element {
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

export default connect(mapStateToProps, mapDispatchToProps)(AppComponent);

// ACTION CREATORS
function setData(): AnyAction {
  return { type: 'SET_DATA' };
}
