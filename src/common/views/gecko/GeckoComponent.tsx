import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch, AnyAction } from 'redux';
//
import { geckoCoinData, geckoCoinsInit } from '@common/actions/geckoActions';
import CoinControl from './components/CoinControl';
import DataComponent from './components/DataComponent';

class GeckoComponent extends Component<IProps> {
  render(): JSX.Element | string {
    const { geckoCoinData, coinsList } = this.props;
    return coinsList.length ? (
      <>
        <CoinControl coinsList={coinsList} geckoCoinData={geckoCoinData} />
        <DataComponent />
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

interface IActions {
  geckoCoinData: (id: string) => AnyAction;
  geckoCoinsInit: () => AnyAction;
}

type IProps = IActions & IGeckoState;

export default connect(mapStateToProps, mapDispatchToProps)(GeckoComponent);
