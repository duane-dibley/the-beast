import React, { ChangeEvent, Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch, AnyAction } from 'redux';
//
// import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
//
import { coinData, coinInit, coinOrderBook } from '@common/actions/coinActions';
import ControlComponent from './components/ControlComponent';
import DataComponent from './components/DataComponent';
import OrderBookComponent from './components/OrderBookComponent';

class CoinComponent extends Component<IProps, { activeTab: number }> {
  constructor(props: IProps) {
    super(props);
    this.state = { activeTab: 0 };
  }

  render(): JSX.Element | string {
    // const [activeTab, setValue] = React.useState(0);

    const { coinList, coinData, coinOrderBook } = this.props;
    const { activeTab } = this.state;

    const handleChange = (event: ChangeEvent, newValue: number): void => {
      this.setState({ activeTab: newValue });
    };

    return coinList.length ? (
      <>
        {/* <AppBar position="static"> */}
        <Tabs value={activeTab} onChange={handleChange} aria-label="simple tabs example">
          <Tab aria-controls={`simple-tabpanel-${0}`} id={`simple-tab-${0}`} label="Data" />
          <Tab aria-controls={`simple-tabpanel-${0}`} id={`simple-tab-${0}`} label="Order" />
        </Tabs>
        {/* </AppBar> */}
        {/* <div value={value} index={0}>
          <CoinControl coinsList={coinsList} coinData={coinData} />
        </div> */}
        <div aria-labelledby={`simple-tab-${0}`} hidden={activeTab !== 0} id={`simple-tabpanel-${0}`} role="tabpanel">
          <ControlComponent coinsList={coinList} coinData={coinData} />
          <DataComponent />
        </div>
        <div aria-labelledby={`simple-tab-${1}`} hidden={activeTab !== 1} id={`simple-tabpanel-${1}`} role="tabpanel">
          <OrderBookComponent krakenOrderBook={coinOrderBook} />
        </div>
      </>
    ) : (
      '...loading'
    );
  }

  componentDidMount(): void {
    const { coinList, coinInit } = this.props;
    if (!coinList.length) {
      coinInit();
    }
  }
}

function mapDispatchToProps(dispatch: Dispatch): IActions {
  return bindActionCreators({ coinData, coinInit, coinOrderBook }, dispatch);
}

function mapStateToProps(store: IStore): ICoinState {
  const { coin } = store;
  const { coinData, coinList, currencyList } = coin;
  return { coinData, coinList, currencyList };
}

interface IActions {
  coinData: (id: string) => AnyAction;
  coinInit: () => AnyAction;
  coinOrderBook: () => AnyAction;
}

type IProps = IActions & ICoinState;

export default connect(mapStateToProps, mapDispatchToProps)(CoinComponent);
