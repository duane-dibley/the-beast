import React, { ChangeEvent, Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch, AnyAction } from 'redux';
//
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
//
import { geckoCoinData, geckoCoinsInit } from '@common/actions/geckoActions';
import CoinControlComponent from './components/CoinControlComponent';
import DataComponent from './components/DataComponent';
import OrderBookComponent from './components/OrderBookComponent';

class GeckoComponent extends Component<IProps, { activeTab: number }> {
  constructor(props: IProps) {
    super(props);
    this.state = { activeTab: 0 };
  }

  render(): JSX.Element | string {
    // const [activeTab, setValue] = React.useState(0);

    const { geckoCoinData, coinsList } = this.props;
    const { activeTab } = this.state;

    const handleChange = (event: ChangeEvent<{}>, newValue: number): void => {
      this.setState({ activeTab: newValue });
    };

    return coinsList.length ? (
      <>
        <AppBar position="static">
          <Tabs value={activeTab} onChange={handleChange} aria-label="simple tabs example">
            <Tab aria-controls={`simple-tabpanel-${0}`} id={`simple-tab-${0}`} label="Data" />
            <Tab aria-controls={`simple-tabpanel-${0}`} id={`simple-tab-${0}`} label="Order" />
          </Tabs>
        </AppBar>
        {/*  */}
        {/* <div value={value} index={0}>
          <CoinControl coinsList={coinsList} geckoCoinData={geckoCoinData} />
        </div> */}
        {/*  */}
        <div aria-labelledby={`simple-tab-${0}`} hidden={activeTab !== 0} id={`simple-tabpanel-${0}`} role="tabpanel">
          <DataComponent />
        </div>
        <div aria-labelledby={`simple-tab-${1}`} hidden={activeTab !== 1} id={`simple-tabpanel-${1}`} role="tabpanel">
          <OrderBookComponent />
        </div>
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
